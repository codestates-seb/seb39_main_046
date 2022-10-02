package com.example.Api.member;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class MemberPatchDtoN {


    @NotBlank(message = "nickName은 공백일 수 없습니다.")
    @Size(min = 2, max = 10, message = "nickName은 2 ~ 10자로 설정해주세요.")
    private String nickName;
}
