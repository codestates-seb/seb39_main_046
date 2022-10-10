package com.example.Api.application.domain.main;


import lombok.Data;


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


