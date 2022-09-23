package com.example.Api.member;


import com.example.Api.product.Product;
import com.example.Api.product.ProductHeartResponseDto;
import com.example.Api.response.MultiResponseDto;
import com.example.Api.review.Review;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MyPageResponseDto<T> {

    private Member member;

    private MultiResponseDto<T> multiResponseDto;   // 찜꽁 상품
   // private MultiResponseDto<T> multiResponseDto2;  // 찜꽁 리뷰
    private MultiResponseDto<T> multiResponseDto3;  // 내가 남긴 리뷰


    public MyPageResponseDto(Member member, MultiResponseDto<T> multiResponseDto, MultiResponseDto<T> multiResponseDto3) {
        this.member = member;
        this.multiResponseDto = multiResponseDto;
        this.multiResponseDto3 = multiResponseDto3;
    }


}
