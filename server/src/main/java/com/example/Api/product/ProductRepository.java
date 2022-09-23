package com.example.Api.product;

import com.example.Api.category.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findByProductName(String productName);

    List<Product> findAllByCompany(String company, Sort hearts);
    List<Product> findAllByCategory(Category category);

    Page<Product> findAllByCompany(String company, Pageable pageable);


}
