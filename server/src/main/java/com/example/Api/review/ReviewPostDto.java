package com.example.Api.review;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class ReviewPostDto {



    private String content;
}
