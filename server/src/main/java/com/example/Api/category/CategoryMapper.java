package com.example.Api.category;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto);
    Category categoryPatchDtoToCategory(CategoryPatchDto categoryPatchDto);

}
