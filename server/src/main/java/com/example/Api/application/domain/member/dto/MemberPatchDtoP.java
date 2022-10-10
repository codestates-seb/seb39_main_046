package com.example.Api.application.domain.member.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class MemberPatchDtoP {

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    @Size(min = 8, max = 16, message = "비밀번호는 8 ~ 16자로 설정해주세요.")
    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=]).*$",message = "비밀번호는 숫자, 영문자, 특수문자가 포함된 8~16자리로 설정해주세요.")
    private String password;
}
