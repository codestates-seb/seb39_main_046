package com.example.Api.application.domain.category.mapper;

import com.example.Api.application.domain.category.dto.CategoryPatchDto;
import com.example.Api.application.domain.category.dto.CategoryPostDto;
import com.example.Api.application.entity.category.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto);
    Category categoryPatchDtoToCategory(CategoryPatchDto categoryPatchDto);

}
