package com.example.Api.application.domain.category.repository;

import com.example.Api.application.entity.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);
    Category findByCategoryId(long categoryId);
    List<Category> findAll();

}
