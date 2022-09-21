package com.example.Api.product;

import com.example.Api.response.MultiResponseDto;
import lombok.Data;


@Data
public class ProductDetailResponseDto<T> {

    private Product product;

    private MultiResponseDto<T> multiResponseDto;

    public ProductDetailResponseDto(Product product, MultiResponseDto<T> multiResponseDto) {
        this.product = product;
        this.multiResponseDto = multiResponseDto;
    }
}
