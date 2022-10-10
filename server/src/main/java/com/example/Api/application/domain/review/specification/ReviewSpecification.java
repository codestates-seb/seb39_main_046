package com.example.Api.application.domain.review.specification;

import com.example.Api.application.entity.member.Member;
import com.example.Api.application.entity.product.Product;
import com.example.Api.application.entity.review.Review;
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

    public static Specification<Review> equalProduct(Product product){

        return new Specification<Review>() {
            @Override
            public Predicate toPredicate(Root<Review> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("product"),product);
            }
        };
    }
}
