package com.example.Api.application.domain.review.repository;

import com.example.Api.application.entity.review.ReviewHeart;
import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.review.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewHeartRepository extends JpaRepository<ReviewHeart, Long> {

    Optional<ReviewHeart> findByMemberAndAndReview(Member member, Review review);

    Page<ReviewHeart> findAllByMember(Member member, Pageable pageable);
    List<ReviewHeart> findAllByMember(Member member);
}
