package com.example.Api.category;


import com.example.Api.response.MultiResponseDto;
import io.swagger.annotations.ApiOperation;
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
public class CategoryController {

    private final CategoryMapper mapper;
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final int size = 10;

    public CategoryController(CategoryMapper mapper, CategoryService categoryService, CategoryRepository categoryRepository) {
        this.mapper = mapper;
        this.categoryService = categoryService;
        this.categoryRepository = categoryRepository;

        Category dummy1 = new Category();
        dummy1.setCategoryName("음료");
        categoryService.createCategory(dummy1);

        Category dummy2 = new Category();
        dummy2.setCategoryName("커피");
        categoryService.createCategory(dummy2);

        Category dummy3 = new Category();
        dummy3.setCategoryName("아이스크림");
        categoryService.createCategory(dummy3);

        Category dummy4 = new Category();
        dummy4.setCategoryName("과자");
        categoryService.createCategory(dummy4);

        Category dummy5 = new Category();
        dummy5.setCategoryName("도시락/컵밥");
        categoryService.createCategory(dummy5);

        Category dummy6 = new Category();
        dummy6.setCategoryName("라면");
        categoryService.createCategory(dummy6);

        Category dummy7 = new Category();
        dummy7.setCategoryName("김밥");
        categoryService.createCategory(dummy7);


        Category dummy8 = new Category();
        dummy8.setCategoryName("샐러드");
        categoryService.createCategory(dummy8);


        Category dummy9 = new Category();
        dummy9.setCategoryName("디저트류");
        categoryService.createCategory(dummy9);


        Category dummy10 = new Category();
        dummy10.setCategoryName("샌드위치");
        categoryService.createCategory(dummy10);

        Category dummy11 = new Category();
        dummy11.setCategoryName("버거");
        categoryService.createCategory(dummy11);

        Category dummy12 = new Category();
        dummy12.setCategoryName("안주");
        categoryService.createCategory(dummy12);

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

    //123
    @PatchMapping("/{category-id}")//카테고리 수정
    @ApiOperation(value = "카테고리 수정")
    public ResponseEntity patchCategory(@PathVariable("category-id") @Positive long categoryId,
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
