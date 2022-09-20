package com.example.Api.specification;

import com.example.Api.member.Member;
import com.example.Api.review.Review;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ReviewSpecification {

    public static Specification<Review> equalMember(Member member){

        return new Specification<Review>() {
            @Override
            public Predicate toPredicate(Root<Review> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("member"),member);
            }
        };
    }
}
