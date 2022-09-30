package com.example.Api.exception;

import lombok.Getter;

public enum ExceptionCode {
    EXCELDATA_NOT_VALID(400, "ExcelData not valid"),
    CATEGORY_NOT_FOUND(404, "Category not found"),
    CANNOT_DELETE_CATEGORY(403,"Category can not delete"),
    CATEGORY_NAME_EXISTS(409, "Category Code exists"),
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    MEMBER_EXISTS(409, "Member exists"),
    PRODUCT_NOT_FOUND(404,"Product not found"),
    PRODUCT_EXISTS(409, "Product exists"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    REVIEW_EXISTS(409, "Review exists");
    /*
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");;
    */
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
