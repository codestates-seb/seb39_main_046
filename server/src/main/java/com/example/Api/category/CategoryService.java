package com.example.Api.category;


import com.example.Api.exception.BusinessLogicException;
import com.example.Api.exception.ExceptionCode;
import com.example.Api.product.Product;
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

    public Category createCategory(Category category){
        String categoryName = category.getCategoryName();

        // 이미 등록된 카테고리명인지 확인
        verifyExistCategory(categoryName);

        return categoryRepository.save(category);
    }

    public void verifyExistCategory(String categoryName){
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        if(category.isPresent()){
            throw new BusinessLogicException(ExceptionCode.CATEGORY_NAME_EXISTS);
        }
    }
    /*public boolean checkDuplicatedCategory(String categoryName){
        boolean result = false;
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        if(optionalCategory.isPresent()){
            result = true;
        }
        return result;
    }*/


    public Category updateCategory(Category category){
        verifyExistCategory(category.getCategoryName());
        Category findCategory = findVerifiedCategoryId(category.getCategoryId());

        //카테고리명 변경
        Optional.ofNullable(category.getCategoryName())
                .ifPresent(categoryName -> findCategory.setCategoryName(categoryName));

        return saveCategory(findCategory);
    }
    private Category saveCategory(Category category){
        return categoryRepository.save(category);
    }


    public Category findCategoryByCategoryName(String categoryName){
        Optional<Category> optionalCategory = categoryRepository.findByCategoryName(categoryName);
        Category findCategory =
                optionalCategory.orElseThrow(()->
                        new RuntimeException("Category not found"));
        return findCategory;
    }

    public Category findVerifiedCategoryId(long categoryId){
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Category findCategory =
                optionalCategory.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        return findCategory;
    }

    public Category findCategory(long categoryId){
        Category category = categoryRepository.findByCategoryId(categoryId);
        return category;
    }

    public Page<Category> findCategories(int page, int size) {
        Page<Category> result = categoryRepository.findAll(PageRequest.of(page, size,
                Sort.by("categoryId").descending()));
        if(result.isEmpty()){
            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND);
        }
        return result;
    }

    public void cancelCategory(Category category, List<Product> relatedProducts){
        if(!relatedProducts.isEmpty()){
            throw new BusinessLogicException(ExceptionCode.CANNOT_DELETE_CATEGORY);
        }
        categoryRepository.delete(category);
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

}
