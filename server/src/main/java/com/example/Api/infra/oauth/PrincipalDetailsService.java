package com.example.Api.infra.oauth;


import com.example.Api.application.entity.member.Member;
import com.example.Api.application.domain.member.repository.MemberRepository;
import com.example.Api.application.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member memberEntity = memberService.findVerifiedUsername(username);
        return new PrincipalDetails(memberEntity);
    }
}