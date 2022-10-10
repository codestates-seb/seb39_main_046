package com.example.Api.application.domain.review.dto;

import com.example.Api.application.entity.review.Review;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReviewHeartResponseDto {
    private long reviewHeartId;
    private long memberId;
    private Review review;

}
