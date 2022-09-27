package com.example.Api.member;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Data
public class MemberPatchDtoN {

    @Column
    @NotBlank
    private String nickName;
}
