package com.example.Api.review;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ReviewPatchDto {

    @Size(min = 0, max = 50, message = "리뷰 내용은 50자 이하만 가능합니다.")
    private String content;
}
