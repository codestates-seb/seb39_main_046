package com.example.Api.main;


import com.example.Api.product.Product;
import com.example.Api.review.Review;
import lombok.Data;

import java.util.List;

@Data
public class MainResponseDto<T> {

    private List<Product> allTop5; // 전체 상품 중 top5
    /*private List<Product> recommendProducts;  //추천 상품 리스트*/
    private List<Review> bestReviews;  // 베스트 리뷰 top5

    public MainResponseDto(List<Product> allTop5, List<Review> bestReviews) {
        this.allTop5 = allTop5;
        this.bestReviews = bestReviews;
    }
}
