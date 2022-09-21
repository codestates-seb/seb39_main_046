package com.example.Api.product;

import com.example.Api.response.MultiResponseDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductRankingResponseDto<T> {

    List<Product> top5 = new ArrayList<>();
    private MultiResponseDto<T> multiResponseDto;

    public ProductRankingResponseDto(List<Product> top5, MultiResponseDto<T> multiResponseDto) {
        this.top5 = top5;
        this.multiResponseDto = multiResponseDto;
    }
}
