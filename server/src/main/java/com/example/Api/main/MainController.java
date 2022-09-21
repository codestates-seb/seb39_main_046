package com.example.Api.main;


import com.example.Api.category.Category;
import com.example.Api.category.CategoryService;
import com.example.Api.member.Member;
import com.example.Api.member.MemberService;
import com.example.Api.product.Product;
import com.example.Api.product.ProductService;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.Review;
import com.example.Api.review.ReviewService;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/main")
@Validated
public class MainController {

    private final ProductService productService;
    private final ReviewService reviewService;
    private final MemberService memberService;

    private final CategoryService categoryService;

    public MainController(ProductService productService, ReviewService reviewService,
                          MemberService memberService, CategoryService categoryService) {
        this.productService = productService;
        this.reviewService = reviewService;
        this.memberService = memberService;
        this.categoryService = categoryService;
    }

    @ApiOperation(value = "메인 페이지 조회",
            notes = "✅ 전체 상품 중 top5, 추천 상품, 베스트 리뷰 \n - \n " )
    @GetMapping
    public ResponseEntity getMain(){

        //top5 데이터 세팅
        List<Product> top5 = new ArrayList<>();
        List<Product> products = productService.findAllProduct(Sort.by(Sort.Direction.DESC, "hearts"));

        long minReviews = 10;

        for(int i =0 ;i<products.size();i++){
            if(products.get(i).getReviews()<minReviews){
                products.remove(i);
            }
        }
        int maxCount = 0;
        if(products.size()>=5){
            maxCount = 5;
        }
        else{
            maxCount = products.size();
        }
        for(int i = 0 ; i<maxCount; i++){
            Product product = products.get(i);
            top5.add(product);
        }

        // 베스트리뷰 데이터 세팅

        List<Review> bestReviews = new ArrayList<>();
        List<Review> reviewList = reviewService.findAllReviews(Sort.by(Sort.Direction.DESC, "hearts"));

        //최소 좋아요수 (10) 이하인 상품들은 제거
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

        // 추천 상품 세팅
        int status = 0;

        Member member = memberService.getLoginMember();
        Category memberCategory = member.getCategory();
        List<Product> recommends = new ArrayList<>();
        if((member == null) || (memberCategory == null) || (memberCategory.getProducts().size()<10)){
            status = 1;
            List<Category> allCategories = categoryService.findAllCategoryAsList();

            //연결된 상품이 최소 1개라도 있는 카테고리들
            List<Category> atLeastOne = new ArrayList<>();
            for(Category category: allCategories){
                if(category.getProducts().isEmpty()){
                    continue;
                }
                atLeastOne.add(category);
            }

            recommends = productService.setRecommendProductsAtLeastOne(atLeastOne);
        }
        else{
            status = 2;
            recommends = productService.setRecommendProducts(memberCategory);
        }


        return new ResponseEntity<>(
                new MainResponseDto<>(top5,recommends, bestReviews),
                HttpStatus.OK);
    }

}
