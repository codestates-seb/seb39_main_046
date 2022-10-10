package com.example.Api.application.domain.product.specification;

import com.example.Api.application.entity.category.Category;
import com.example.Api.application.entity.product.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ProductSpecification {

    public static Specification<Product> equalCategory(Category category){
        return new Specification<Product>() {
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("category"),category);
            }
        };
    }

    public static Specification<Product> equalCompanyAndCategory(String company, Category category){
        return new Specification<Product>() {
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return  criteriaBuilder.and(criteriaBuilder.equal(root.get("company"),company),criteriaBuilder.equal(root.get("category"),category));
            }
        };
    }
}
