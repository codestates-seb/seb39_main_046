package com.example.Api.product;

import com.example.Api.category.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product excelDataToProduct(ExcelData excelData);
    /*List<Product> excelDatasToProducsts(List<ExcelData> excelDataList);*/

    default Product productPatchDtoToProduct(Product product, ProductPatchDto productPatchDto, Category category){

        Product patchProduct = product;
        patchProduct.setImageURL(productPatchDto.getImageURL());
        patchProduct.setProductName(productPatchDto.getProductName());
        patchProduct.setPrice(productPatchDto.getPrice());
        patchProduct.setCategory(category);
        patchProduct.setCompany(productPatchDto.getCompany());

        return patchProduct;
    }
}
