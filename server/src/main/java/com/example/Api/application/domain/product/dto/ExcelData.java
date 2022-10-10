package com.example.Api.application.domain.product.dto;

import com.example.Api.application.entity.category.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ExcelData {

    private String imageURL; // 이미지 URL
    private String productName;
    private BigDecimal price;
    private Category category;
    private  String company;

}
