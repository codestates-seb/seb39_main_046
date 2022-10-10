package com.example.Api.application.domain.product.dto;

import com.example.Api.application.entity.product.Product;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProductHeartResponseDto {
    private long productHeartId;
    private long memberId;
    private Product product;

}
