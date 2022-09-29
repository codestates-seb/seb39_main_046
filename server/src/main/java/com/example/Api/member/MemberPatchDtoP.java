package com.example.Api.member;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class MemberPatchDtoP {

    @NotBlank
    private String password;
}
