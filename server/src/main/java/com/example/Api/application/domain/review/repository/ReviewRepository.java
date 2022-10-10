package com.example.Api.application.domain.review.repository;

import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

    List<Review> findAllByMember(Member member);
}
