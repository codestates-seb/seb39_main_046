package com.example.Api.review;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ReviewPatchDto {

    private String content;
    private String imageURL;
}
