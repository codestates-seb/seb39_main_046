package com.example.Api.infra.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Api.application.entity.member.Member;
import com.example.Api.infra.oauth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.Api.infra.filter.JwtProperties.HEADER_PREFIX;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            ObjectMapper om = new ObjectMapper();
            Member member = om.readValue(request.getInputStream(), Member.class);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getUsername(), member.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();;
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject("cos jwt token")
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))  // 60000 -> 60초 / 10 -> 분 //현재 24시간
                .withClaim(JwtProperties.ID, principalDetails.getMember().getMemberId())
                .withClaim(JwtProperties.USERNAME, principalDetails.getMember().getUsername())
                .sign(Algorithm.HMAC512("cos_jwt_token"));
   //   response.addHeader(JwtProperties.HEADER_PREFIX, JwtProperties.TOKEN_PREFIX + jwtToken);

        // String jwtToken2 = JWT.create()
        //         .withSubject("cos jwt token")
        //         .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60*24*7)))
        //         .sign(Algorithm.HMAC512("cos_jwt_token"));


        Map<String,Object> map = new HashMap<>();
        long a = principalDetails.getMember().getMemberId();
        long memberId = principalDetails.getMember().getMemberId();
        map.put(HEADER_PREFIX,JwtProperties.TOKEN_PREFIX + jwtToken);
        // map.put("RefreshToken","Bearer " + jwtToken2);
        map.put("memberId",memberId);
        Gson gson = new Gson();
        String jsonString = gson.toJson(map);
        response.getWriter().println(jsonString);


    }
}