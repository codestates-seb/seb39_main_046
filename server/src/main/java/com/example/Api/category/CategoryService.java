package com.example.Api.category;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public boolean checkDuplicatedCategory(String categoryName){
        boolean result = false;
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        if(optionalCategory.isPresent()){
            result = true;
        }
        return result;
    }

    public Category findCategoryByCategoryName(String categoryName){
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        Category findCategory =
                optionalCategory.orElseThrow(()->
                        new RuntimeException("Category not found"));
        return findCategory;

    }

    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category){
        Category findCategory = findVerifiedCategoryId(category.getCategoryId());

        //답변 내용 변경
        Optional.ofNullable(findCategory.getCategoryName())
                .ifPresent(categoryName -> findCategory.setCategoryName(categoryName));

        return saveCategory(findCategory);
    }
    private Category saveCategory(Category category){
        return categoryRepository.save(category);
    }


    public Category findVerifiedCategoryId(long categoryId){
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Category findCategory =
                optionalCategory.orElseThrow(()->
                        new RuntimeException("Category not found"));
        return findCategory;
    }

    public Page<Category> findCategories(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size,
                Sort.by("categoryId").descending()));
    }

    public List<Category> findAllCategoryAsList() {
        return categoryRepository.findAll();
    }

    public List<Category> checkAtLeastOneProduct(List<Category> allCategories){
        List<Category> atLeastOne = new ArrayList<>();
        for(Category category: allCategories){
            if(category.getProducts().isEmpty()){
                continue;
            }
            atLeastOne.add(category);
        }
        return atLeastOne;

    }


    public void cancelCategory(long categoryId){
        Category findCategory = findVerifiedCategoryId(categoryId);
        categoryRepository.delete(findCategory);
    }


}
