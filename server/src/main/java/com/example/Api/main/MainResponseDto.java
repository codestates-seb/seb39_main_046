package com.example.Api.main;


import com.example.Api.product.Product;
import com.example.Api.review.Review;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Objects;


@Data
public class MainResponseDto<T> {


    private Object allTop5; // 전체 상품 중 top5

    private Object recommendProducts;  //추천 상품 리스트

    private Object bestReviews;  // 베스트 리뷰 top5

    public MainResponseDto(Object allTop5, Object recommendProducts, Object bestReviews) {

        this.allTop5 = allTop5;
        this.recommendProducts = recommendProducts;
        this.bestReviews = bestReviews;
    }
}


