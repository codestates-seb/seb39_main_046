package com.example.Api.product;

import com.example.Api.response.MultiResponseDto;
import lombok.Data;


@Data
public class ProductDetailResponseDto<T> {

    private Product product;

    private MultiResponseDto<T> reviews;

    public ProductDetailResponseDto(Product product, MultiResponseDto<T> reviews) {
        this.product = product;
        this.reviews = reviews;
    }
}
