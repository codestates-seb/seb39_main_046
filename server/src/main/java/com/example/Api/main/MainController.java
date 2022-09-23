package com.example.Api.main;


import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.member.Member;
import com.example.Api.member.MemberService;
import com.example.Api.product.Product;
import com.example.Api.product.ProductHeartService;
import com.example.Api.product.ProductService;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/main")
@Validated
public class MainController {

    private final ProductService productService;
    private final ReviewService reviewService;
    private final MemberService memberService;

    private final ProductHeartService productHeartService;
    private final CategoryService categoryService;

    public MainController(ProductService productService, ReviewService reviewService,
                          MemberService memberService, CategoryService categoryService,
                          ProductHeartService productHeartService) {
        this.productService = productService;
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.categoryService = categoryService;
        this.productHeartService = productHeartService;
    }

    @ApiOperation(value = "메인 페이지 조회",
            notes = "✅ 전체 상품 중 top5, 추천 상품, 베스트 리뷰 \n - \n " )
    @GetMapping
    public ResponseEntity getMain(HttpServletRequest request){

        //전체 top5 데이터 세팅
        String company = "all";
        List<Product> top5 = top5 = productService.getTop5Products(company);



        // 베스트리뷰 세팅
        List<Review> bestReviews = new ArrayList<>();
        List<Review> reviewList = reviewService.findAllReviews(Sort.by(Sort.Direction.DESC, "hearts"));

        //최소 좋아요수 (10) 이하인 리뷰들은 제거
        long minHearts = 10;
        for(int i =0 ;i<reviewList.size();i++){
            if(reviewList.get(i).getHearts()<minHearts){
                reviewList.remove(i);
            }
        }
        int maxCount2 = 0;
        if(reviewList.size()>=5){
            maxCount2 = 5;
        }
        else{
            maxCount2 = reviewList.size();
        }

        for(int i = 0 ; i<maxCount2; i++){
            Review review = reviewList.get(i);
            bestReviews.add(review);
        }


        boolean loginStatus = memberService.memberCheck(request);
        //현재 상태 비회원이면 true,  회원일시 false  반환

        // 추천 상품 세팅
        int status = 0;
        List<Product> recommends = new ArrayList<>();

        if (loginStatus) {   //비회원일 때 추천 상품 세팅
            status = 1;
            List<Category> allCategories = categoryService.findAllCategoryAsList();
            //연결된 상품이 최소 1개라도 있는 카테고리들로 리스트 만들기
            List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);
            recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne);
            checkHeartFlagsNotLongin(top5);
            checkHeartFlagsNotLongin(recommends);
        }
        else {  // 회원일 때 추천상품 세팅

            Member member = memberService.getLoginMember();
            Category memberCategory = member.getCategory();
            if((memberCategory == null) || (memberCategory.getProducts().size()<10)){
                status = 1;
                List<Category> allCategories = categoryService.findAllCategoryAsList();
                //연결된 상품이 최소 1개라도 있는 카테고리들로 리스트 만들기
                List<Category> atLeastOne = categoryService.checkAtLeastOneProduct(allCategories);
                recommends = productService.setRecommendedProductsAtLeastOne(atLeastOne);
            }
            else {
                status = 2;
                recommends = productService.setRecommendedProducts(memberCategory);
            }
            checkHeartFlagsLogin(member,top5);
            checkHeartFlagsLogin(member,recommends);
        }


        return new ResponseEntity<>(
                new MainResponseDto<>(top5,recommends, bestReviews),
                HttpStatus.OK);
    }

    public void checkHeartFlagsNotLongin(List<Product> products){
        for(Product product : products){
            product.setHeartFlag(false); // 좋아요 상태 OFF
        }
    }
    public void checkHeartFlagsLogin(Member member, List<Product> products){

        for(Product product : products){
            if(productHeartService.checkAlreadyHeart(member,product)){
                //이미 눌렀으면 false, 누르지 않았다면 true
                product.setHeartFlag(false);
            }
            else{
                product.setHeartFlag(true);
            }
        }
    }
}
