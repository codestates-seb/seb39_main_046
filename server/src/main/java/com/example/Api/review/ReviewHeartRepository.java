package com.example.Api.review;

import com.example.Api.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewHeartRepository extends JpaRepository<ReviewHeart, Long> {

    Optional<ReviewHeart> findByMemberAndAndReview(Member member, Review review);

    Page<ReviewHeart> findAllByMember(Member member, Pageable pageable);
}
