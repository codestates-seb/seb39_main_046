package com.example.Api.application.domain.product.dto;

import com.example.Api.application.global.response.MultiResponseDto;
import com.example.Api.application.entity.product.Product;
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
