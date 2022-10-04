package com.example.Api.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.Api.member.Member;
import com.example.Api.oauth.PrincipalDetails;
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


        Map<String,Object> map = new HashMap<>();
        long a = principalDetails.getMember().getMemberId();
        String userRole = principalDetails.getMember().getRoles();
        map.put(JwtProperties.HEADER_PREFIX,JwtProperties.TOKEN_PREFIX + jwtToken);
        map.put("role",userRole);
        map.put("msg" , "success");
        Gson gson = new Gson();
        String jsonString = gson.toJson(map);
        response.getWriter().println(JwtProperties.TOKEN_PREFIX + jwtToken);


    }
}