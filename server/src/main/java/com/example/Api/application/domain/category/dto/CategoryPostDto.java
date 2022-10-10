package com.example.Api.application.domain.category.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class CategoryPostDto {

    @NotBlank(message = "카테고리명은 공백일 수 없습니다.")
    @Size(min = 1, max = 50, message = "카테고리명은 1 ~ 50자 이여야 합니다.")
    private String categoryName;
}
