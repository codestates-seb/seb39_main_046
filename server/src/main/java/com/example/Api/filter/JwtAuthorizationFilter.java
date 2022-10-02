package com.example.Api.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.example.Api.member.Member;
import com.example.Api.member.MemberRepository;
import com.example.Api.member.MemberService;
import com.example.Api.oauth.PrincipalDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository,MemberService memberService) {
        super(authenticationManager);
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소 요청 됨.");

        String jwtHeader = request.getHeader(JwtProperties.HEADER_PREFIX);

        if(jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String jwtToken = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");

        String username = JWT.require(Algorithm.HMAC512("cos_jwt_token")).build().verify(jwtToken).getClaim(JwtProperties.USERNAME).asString();

        if (username != null) {

            Member member = memberService.findVerifiedUsername(username);

            // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
            // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
            PrincipalDetails principalDetails = new PrincipalDetails(member);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 접근하여 값 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        chain.doFilter(request, response);
    }
}