package com.example.Api.member;


import com.example.Api.product.Product;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.Review;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MyPageResponseDto<T> {

    private Member member;

    /*private List<Product> jjimkkong = new ArrayList<>();*/
    private MultiResponseDto<T> multiResponseDto;  // 베스트 리뷰 top5
    //찜꽁상품
    //찜꽁리뷰


    public MyPageResponseDto(Member member, MultiResponseDto<T> multiResponseDto) {
        this.member = member;

        this.multiResponseDto = multiResponseDto;
       /* this.jjimkkong = jjimkkong;*/
    }
}
