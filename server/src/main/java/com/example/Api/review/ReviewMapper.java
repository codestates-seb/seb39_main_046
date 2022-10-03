package com.example.Api.review;

import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewMapper {


    default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto,String file){
        Review review = new Review();
        if (file == null)
        {review.setContent(reviewPostDto.getContent());
            review.setImageURL(null);
        }
        if (reviewPostDto.getContent()==null)
        { review.setContent(null);

            review.setImageURL(file);}
        if(reviewPostDto.getContent() != null && file !=null) {
            review.setContent(reviewPostDto.getContent());
            review.setImageURL(file);
        }
        return review;
    }
    default Review reviewPatchDtoToReview(Review review, ReviewPatchDto reviewPatchDto,String file){
        Review patchReview = review;
        if (file == null)
        {
            patchReview.setContent(reviewPatchDto.getContent());
        }
        if (reviewPatchDto.getContent()==null)
        {
            patchReview.setImageURL(file);}
        if(reviewPatchDto.getContent() != null && file !=null) {
            patchReview.setContent(reviewPatchDto.getContent());
            patchReview.setImageURL(file);
        }

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
