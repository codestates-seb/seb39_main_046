package com.example.Api.product;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product excelDataToProduct(ExcelData excelData);
    /*List<Product> excelDatasToProducsts(List<ExcelData> excelDataList);*/
}
