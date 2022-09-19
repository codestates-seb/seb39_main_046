package com.example.Api.category;


import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryMapper mapper;
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryMapper mapper, CategoryService categoryService, CategoryRepository categoryRepository) {
        this.mapper = mapper;
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping //카테고리 등록
    @ApiOperation(value = "카테고리 등록")
    public ResponseEntity postCategory(@Validated@RequestBody CategoryPostDto categoryPostDto){
        Category category = mapper.categoryPostDtoToCategory(categoryPostDto);

        Category response = categoryService.createCategory(category);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{category-id}")//카테고리 수정
    @ApiOperation(value = "카테고리 수정")
    public ResponseEntity patchCategory(@PathVariable("category-id") @Positive long categoryId ,@RequestBody String categoryName){

        Category category = new Category(categoryId,categoryName);

        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @GetMapping   // 카테고리 조회
    @ApiOperation(value = "카테고리 조회")
    public ResponseEntity findCategory(@PathVariable("category-id") @Positive long categoryId)
    {
        Category category = categoryService.findCategory(categoryId);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping("/{category-id}") //카테고리 삭제
    @ApiOperation(value = "카테고리 삭제")
    public ResponseEntity categoryDelete(@PathVariable("category-id") @Positive long categoryId){

        return new ResponseEntity<>(HttpStatus.OK);

    }
}
