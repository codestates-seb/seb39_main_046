package com.example.Api.member;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class MemberPatchDtoP {

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    @Size(min = 1, max = 50, message = "상품명은 1 ~ 50자 이여야 합니다.")
    @Pattern(regexp = "^.*(?=^.{8,15}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$",message = "비밀번호는 숫자, 영문자, 특수문자가 포함된 8~15자리로 설정해주세요.")
    private String password;
}
