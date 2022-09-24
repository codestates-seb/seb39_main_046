package com.example.Api.product;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Builder
@Getter
public class ProductHeartResponseDto {
    private long productHeartId;
    private long memberId;
    private Product product;

}
