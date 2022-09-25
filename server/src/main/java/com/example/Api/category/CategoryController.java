package com.example.Api.category;


import com.example.Api.response.MultiResponseDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/category")
@Tag(name = "Category", description = "Category API")
@Api(tags = "Category")
public class CategoryController {

    private final CategoryMapper mapper;
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final int size = 10;

    public CategoryController(CategoryMapper mapper, CategoryService categoryService, CategoryRepository categoryRepository) {
        this.mapper = mapper;
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/default")
    @ApiOperation(value = "기본 카테고리 등록")
    public ResponseEntity postDefaultCategory(){
        categoryService.registerDefaultCategory();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }




    @PostMapping //카테고리 등록
    @ApiOperation(value = "카테고리 등록")
    public ResponseEntity postCategory(@Validated @RequestBody List<CategoryPostDto> categoryPosts){

        List<Category> savedCategories = new ArrayList<>();

        for(int i = 0;i<categoryPosts.size();i++){
            Category category = mapper.categoryPostDtoToCategory(categoryPosts.get(i));
            if(categoryService.checkDuplicatedCategory(category.getCategoryName())){
                continue;
            }
            else{
                categoryService.createCategory(category);
                savedCategories.add(category);
            }
        }
        return new ResponseEntity<>(savedCategories, HttpStatus.CREATED);
    }


    @PatchMapping("/{category-id}")//카테고리 수정
    @ApiOperation(value = "카테고리 수정")
    public ResponseEntity patchCategory(@ApiParam(value = "수정하려는 카테고리 ID ", required = true, example = "1")
                                        @PathVariable("category-id") @Positive long categoryId,
                                        @Validated @RequestBody CategoryPatchDto categoryPatchDto) {

        categoryPatchDto.setCategoryId(categoryId);
        Category selectedCategory = categoryService.findVerifiedCategoryId(categoryId);

        selectedCategory.setCategoryName(categoryPatchDto.getCategoryName());
        categoryService.updateCategory(selectedCategory);
        return new ResponseEntity<>(selectedCategory, HttpStatus.CREATED);
    }

    @GetMapping ("/{category-id}")  // 카테고리 조회
    @ApiOperation(value = "카테고리 조회")
    public ResponseEntity findCategory(@PathVariable("category-id") @Positive long categoryId)
    {

        return new ResponseEntity<>(categoryService.findVerifiedCategoryId(categoryId), HttpStatus.OK);
    }

    @GetMapping   // 카테고리 조회
    @ApiOperation(value = "전체 카테고리 조회")
    public ResponseEntity getCategories(@Positive @RequestParam int page)
    {
        Page<Category> pageCategories = categoryService.findCategories(page-1,size);
        List<Category> categories = pageCategories.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(categories, pageCategories),
                HttpStatus.OK);
    }

    @DeleteMapping("/{category-id}") //카테고리 삭제
    @ApiOperation(value = "카테고리 삭제")
    public ResponseEntity categoryDelete(@PathVariable("category-id") @Positive long categoryId){

        Category category = categoryService.findVerifiedCategoryId(categoryId);
        categoryService.cancelCategory(categoryId);

        return new ResponseEntity<>("카테고리 삭제 완료",HttpStatus.OK);
    }
}
