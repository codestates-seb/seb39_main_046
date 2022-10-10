package com.example.Api.application.domain.member.dto;


import com.example.Api.application.global.response.MultiResponseDto;
import com.example.Api.application.entity.member.Member;
import lombok.Data;

@Data
public class MyPageResponseDto<T> {

    private Member member;

    private MultiResponseDto<T> jjimProducts;   // 찜꽁 상품
    private MultiResponseDto<T> myReviews; // 내가 남긴 리뷰
    private MultiResponseDto<T> jjimReviews;  // 찜꽁 리뷰


    public MyPageResponseDto(Member member, MultiResponseDto<T> jjimProducts, MultiResponseDto<T> myReviews,
                             MultiResponseDto<T> jjimReviews) {
        this.member = member;
        this.jjimProducts = jjimProducts;
        this.myReviews = myReviews;
        this.jjimReviews = jjimReviews;
    }
}
