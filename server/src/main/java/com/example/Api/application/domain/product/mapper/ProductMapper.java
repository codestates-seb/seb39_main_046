package com.example.Api.application.domain.product.mapper;

import com.example.Api.application.entity.product.ProductHeart;
import com.example.Api.application.domain.product.dto.ExcelData;
import com.example.Api.application.domain.product.dto.ProductHeartResponseDto;
import com.example.Api.application.domain.product.dto.ProductPatchDto;
import com.example.Api.application.entity.category.Category;
import com.example.Api.application.entity.product.Product;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product excelDataToProduct(ExcelData excelData);


   /*<Page<Product>> productHeartPageToProductPage(Page<ProductHeart> productHeartPage);*/
   /* Wrapper<Page<Product>> map(Integer dummy, Page<ProductHeart> productHeartPage);*/
    /* public class Wrapper<T> {
        private T value;
        //getters and setters
    }*/


    default Product productPatchDtoToProduct(Product product, ProductPatchDto productPatchDto, Category category){

        Product patchProduct = product;
        patchProduct.setProductName(productPatchDto.getProductName());
        patchProduct.setPrice(productPatchDto.getPrice());
        patchProduct.setCategory(category);
        patchProduct.setCompany(productPatchDto.getCompany());

        return patchProduct;
    }

    default List<ProductHeartResponseDto> productHeartsToProductHeartResponseDto(
            List<ProductHeart> productHearts){

        return productHearts
                .stream()
                .map(productHeart -> ProductHeartResponseDto
                        .builder()
                        .productHeartId(productHeart.getProductHeartId())
                        .memberId(productHeart.getMember().getMemberId())
                        .product(productHeart.getProduct())
                        .build())
                .collect(Collectors.toList());
    }

}
