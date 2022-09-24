package com.example.Api.category;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class CategoryPatchDto {
    @JsonIgnore
    private long categoryId;
    @ApiModelProperty(value = "수정할 카테고리명", required = true)
    private String categoryName;
}
