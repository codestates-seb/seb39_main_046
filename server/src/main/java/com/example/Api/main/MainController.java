package com.example.Api.main;

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

    public MainController(ProductService productService, ReviewService reviewService) {
        this.productService = productService;
        this.reviewService = reviewService;
    }

    @ApiOperation(value = "메인 페이지 조회",
            notes = "✅ 전체 상품 중 top5, 추천 상품, 베스트 리뷰 \n - \n " )
    @GetMapping
    public ResponseEntity getMain(){
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

        return new ResponseEntity<>(
                new MainResponseDto<>(top5,bestReviews),
                HttpStatus.OK);
    }
}
