package com.example.Api.category;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CategoryPostDto {
    @ApiModelProperty(value = "카테고리명", required = true)
    private String categoryName;
}
