package com.example.Api.member;

import com.example.Api.category.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

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
