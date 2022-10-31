package com.example.Api.infra.filter;

public interface JwtProperties {
    String ID = "id";
    String USERNAME = "username";
    String TOKEN_PREFIX = "Bearer ";

    long EXPIRATION_TIME = (60 * 1000); // 30min
    String HEADER_PREFIX = "Authorization";

}