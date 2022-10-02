package com.example.Api.review;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ReviewPatchDto {

    @NotNull
    @Size(min = 1, max = 50, message = "리뷰 내용은 1 ~ 50자 이여야 합니다.")
    private String content;
}
