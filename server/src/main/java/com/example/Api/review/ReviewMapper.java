package com.example.Api.review;

import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewMapper {


    default Review reviewPatchDtoToReview(Review review, ReviewPatchDto reviewPatchDto){
        Review patchReview = review;
        patchReview.setContent(reviewPatchDto.getContent());

        return patchReview;
    }
    default List<ReviewHeartResponseDto> reviewHeartsToReviewHeartsResponseDto(List<ReviewHeart> reviewHearts){

        return reviewHearts
                .stream()
                .map(reviewHeart -> ReviewHeartResponseDto
                        .builder()
                        .reviewHeartId(reviewHeart.getReviewHeartId())
                        .memberId(reviewHeart.getMember().getMemberId())
                        .review(reviewHeart.getReview())
                        .build())
                .collect(Collectors.toList());
    }
}
