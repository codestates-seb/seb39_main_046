package com.example.Api.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {
    private long id;
    private String username;
    private String nickName;
    private long categoryId;
}
