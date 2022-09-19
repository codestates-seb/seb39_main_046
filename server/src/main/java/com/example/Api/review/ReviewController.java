package com.example.Api.review;

public class ReviewController {

    /*
    # POST("/{member-id}"), Request Parmeters : long productId
:  리뷰 댓글 작성

# POST("/{member-id}"), Request Parmeters : long reviewId
: 일반 사용자가 리뷰 댓글 좋아요 등록 / 취소

- 현재 회원이 해당 댓글에 좋아요를 누르지 않았다면 -> 새로운 commentHeart 등록, comment 테이블의 hearts +1
- 현재 회원이 해당 댓글에 이미 좋아요를 눌렀다면 -> 해당하는 commentHeartId의 값 DB에서 삭제, comment 테이블의 hearts -1

# PATCH("/{member-id}"), Request Parmeters : long reviewId
: 리뷰 댓글 수정

# DELETE("/{member-id}"), Request Parmeters : long reviewId
: 리뷰 댓글 삭제
     */
}
