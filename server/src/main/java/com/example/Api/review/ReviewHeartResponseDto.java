package com.example.Api.review;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReviewHeartResponseDto {
    private long reviewHeartId;
    private long memberId;
    private Review review;

}
