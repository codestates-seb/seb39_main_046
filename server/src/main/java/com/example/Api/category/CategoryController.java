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

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/category")
@Validated
@Tag(name = "Category", description = "Category API")
@Api(tags = "Category")
public class CategoryController {

    private final CategoryMapper mapper;
    private final CategoryService categoryService;

    public CategoryController(CategoryMapper mapper, CategoryService categoryService) {
        this.mapper = mapper;
        this.categoryService = categoryService;
    }

    @PostMapping
    @ApiOperation(value = "카테고리 등록")
    public ResponseEntity postCategory(@Valid @RequestBody List<CategoryPostDto> categoryPosts){

        HashMap<String, Object> result = new HashMap<>();
        List<Category> savedCategories = new ArrayList<>();
        for (CategoryPostDto categoryPost : categoryPosts) {
            Category category = mapper.categoryPostDtoToCategory(categoryPost);
            savedCategories.add(categoryService.createCategory(category));
        }
        result.put("카테고리 등록 성공!",savedCategories);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }


    @PatchMapping("/{category-id}")
    @ApiOperation(value = "카테고리 수정")
    public ResponseEntity patchCategory(@ApiParam(value = "수정하려는 카테고리 ID ", required = true, example = "1")
                                        @PathVariable("category-id") @Positive long categoryId,
                                        @Valid @RequestBody CategoryPatchDto categoryPatchDto) {

        HashMap<String, Object> result = new HashMap<>();
        categoryPatchDto.setCategoryId(categoryId);
        Category category = categoryService.updateCategory(mapper.categoryPatchDtoToCategory(categoryPatchDto));
        result.put("카테고리 수정 완료!",category);

        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping ("/{category-id}")  // 카테고리 조회
    @ApiOperation(value = "카테고리 조회")
    public ResponseEntity findCategory(@PathVariable("category-id") @Positive long categoryId)
    {
        HashMap<String, Object> result = new HashMap<>();
        result.put("등록된 카테고리",categoryService.findVerifiedCategoryId(categoryId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping   // 카테고리 조회
    @ApiOperation(value = "전체 카테고리 조회")
    public ResponseEntity getCategories(@Positive @RequestParam int page)
    {
        HashMap<String, Object> result = new HashMap<>();
        int size = 10;
        Page<Category> pageCategories = categoryService.findCategories(page-1, size);
        List<Category> categories = pageCategories.getContent();
        result.put("등록된 전체 카테고리",new MultiResponseDto<>(categories, pageCategories));

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{category-id}") //카테고리 삭제
    @ApiOperation(value = "카테고리 삭제")
    public ResponseEntity categoryDelete(@PathVariable("category-id") @Positive long categoryId){

        HashMap<String, Object> result = new HashMap<>();
        categoryService.cancelCategory(categoryId);
        result.put("카테고리 삭제 완료 ",categoryId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
