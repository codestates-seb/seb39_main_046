package com.example.Api.category;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class CategoryPatchDto {
    @JsonIgnore
    private long categoryId;
    private String categoryName;
}
