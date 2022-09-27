package com.example.Api.member;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class MemberPatchDtoP {

    @Column
    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,}$")
    private String password;
}
