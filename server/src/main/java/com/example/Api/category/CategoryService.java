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

    public Category findCategory(long categoryId){
        Category category = categoryRepository.findByCategoryId(categoryId);
        return category;
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

    public void registerDefaultCategory(){
        Category dummy1 = new Category();
        dummy1.setCategoryName("음료");
        createCategory(dummy1);

        Category dummy2 = new Category();
        dummy2.setCategoryName("커피");
        createCategory(dummy2);

        Category dummy3 = new Category();
        dummy3.setCategoryName("아이스크림");
        createCategory(dummy3);

        Category dummy4 = new Category();
        dummy4.setCategoryName("과자");
        createCategory(dummy4);

        Category dummy5 = new Category();
        dummy5.setCategoryName("도시락/컵밥");
        createCategory(dummy5);

        Category dummy6 = new Category();
        dummy6.setCategoryName("라면");
        createCategory(dummy6);

        Category dummy7 = new Category();
        dummy7.setCategoryName("김밥");
        createCategory(dummy7);


        Category dummy8 = new Category();
        dummy8.setCategoryName("샐러드");
        createCategory(dummy8);


        Category dummy9 = new Category();
        dummy9.setCategoryName("디저트류");
        createCategory(dummy9);


        Category dummy10 = new Category();
        dummy10.setCategoryName("샌드위치");
        createCategory(dummy10);

        Category dummy11 = new Category();
        dummy11.setCategoryName("버거");
        createCategory(dummy11);

        Category dummy12 = new Category();
        dummy12.setCategoryName("안주");
        createCategory(dummy12);
    }


}
