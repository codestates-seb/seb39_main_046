package com.example.Api.product;

import com.example.Api.category.Category;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ExcelData {

    private String imageURL; // 이미지 URL
    private String productName;
    private BigDecimal price;
    private Category category;
    private  String company;

}
