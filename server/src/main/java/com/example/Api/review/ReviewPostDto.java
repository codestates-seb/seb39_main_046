package com.example.Api.review;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.Size;

@Data
public class ReviewPostDto {


    @Size(min = 0, max = 50, message = "리뷰 내용은 50자 이하만 가능합니다.")
    private String content;
    private MultipartFile file;
}
