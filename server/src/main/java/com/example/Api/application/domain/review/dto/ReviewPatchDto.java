package com.example.Api.application.domain.review.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Size;

@Data
public class ReviewPatchDto {

    @Size(min = 0, max = 50, message = "리뷰 내용은 50자 이하만 가능합니다.")
    private String content;
    private MultipartFile file;
}
