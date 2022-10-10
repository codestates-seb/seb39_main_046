package com.example.Api.application.domain.member.mapper;

import com.example.Api.application.domain.member.dto.MemberPostDto;
import com.example.Api.application.domain.member.dto.MemberResponseDto;
import com.example.Api.application.entity.member.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
}
