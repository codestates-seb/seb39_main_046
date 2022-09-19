package com.example.Api.product;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ExcelData {

    private long id;
    private String imageURL; // 이미지 URL
    private String productName;
    private BigDecimal price;

    private long categoryId;
    private  String company;

    private LocalDateTime createdAt;

}
