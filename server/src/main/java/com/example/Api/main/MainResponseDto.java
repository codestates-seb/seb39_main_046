package com.example.Api.main;


import com.example.Api.product.Product;
import com.example.Api.review.Review;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;


@Data
public class MainResponseDto<T> {

    @ApiModelProperty(value = "top5 상품(전체)")
    private List<Product> allTop5; // 전체 상품 중 top5

    @ApiModelProperty(value = "추천 상품")
    private List<Product> recommendProducts;  //추천 상품 리스트

    @ApiModelProperty(value = "베스트 리뷰")
    private List<Review> bestReviews;  // 베스트 리뷰 top5

    public MainResponseDto(List<Product> allTop5, List<Product> recommendProducts,List<Review> bestReviews) {
        this.allTop5 = allTop5;
        this.recommendProducts = recommendProducts;
        this.bestReviews = bestReviews;
    }
}
