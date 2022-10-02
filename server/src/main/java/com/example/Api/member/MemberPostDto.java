package com.example.Api.member;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class MemberPostDto {

    @NotBlank(message = "username은 공백일 수 없습니다.")
    @Size(min = 8, max = 20, message = "username은 8 ~ 20자로 설정해주세요.")
    @Email(message = "username은 Email 형식입니다.")
    private String username;

    @NotBlank(message = "nickName은 공백일 수 없습니다.")
    @Size(min = 2, max = 10, message = "nickName은 2 ~ 10자로 설정해주세요.")
    private String nickName;

    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    @Size(min = 8, max = 16, message = "비밀번호는 8 ~ 16자로 설정해주세요.")
    @Pattern(regexp = "^.*(?=^.{8,16}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$",message = "비밀번호는 숫자, 영문자, 특수문자가 포함된 8~16자리로 설정해주세요.")
    private String password;
}
