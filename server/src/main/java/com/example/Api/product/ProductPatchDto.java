package com.example.Api.product;

import com.example.Api.category.Category;
import com.example.Api.review.Review;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ProductPatchDto {


    private String imageURL; // 이미지 URL

    private String productName;

    private BigDecimal price;

    private String categoryName;

    private  String company;

/*    private long views = 0;

    private long hearts = 0;

    private long reviews = 0;*/

   /* private Category category;*/

    //product(1) : review (N) // 상품에 대한 리뷰 작성 기능
    /*private List<Review> reviewList = new ArrayList<>();*/

    //member (1)  : productHeart ( N ) : product(1)  //상품 좋아요 기능
    // 회원 기준으로 좋아요한 상품 출력만 구현할 예정
    // 상품 기준으로 좋아요한 회원 출력 기능은 미구현



}
