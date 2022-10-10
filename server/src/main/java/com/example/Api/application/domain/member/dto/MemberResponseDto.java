package com.example.Api.application.domain.member.dto;

import com.example.Api.application.entity.category.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {

    private long id;
    private String username;
    @JsonIgnore
    private String password;
    private String nickName;
    private Category category;

    private String profile;


    private String roles;
}
