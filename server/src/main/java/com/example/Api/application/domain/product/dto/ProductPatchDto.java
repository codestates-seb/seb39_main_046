package com.example.Api.application.domain.product.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Data
public class ProductPatchDto {

    @NotNull(message = "상품명은 공백일 수 없습니다.")
    @Size(min = 1, max = 50, message = "상품명은 1 ~ 50자 이여야 합니다.")
    private String productName;

    @NotNull(message = "가격은 공백일 수 없습니다.")
    @DecimalMin(value = "1", message = "가격은 0보다 커야 합니다.")
    private BigDecimal price;

    @NotNull(message = "카테고리명은 공백일 수 없습니다.")
    @Size(min = 1, max = 50, message = "카테고리명은 1 ~ 50자 이여야 합니다.")
    private String categoryName;

    @NotNull(message = "회사명은 공백일 수 없습니다.")
    @Pattern(regexp = "(CU|GS25|7-ELVEN)",message = "회사명에는 CU, GS25,7-ELEVEN만 입력 가능합니다")
    @Size(min = 1, max = 10, message = "회사명은 1 ~ 10자 이여야 합니다.")
    private  String company;


}
