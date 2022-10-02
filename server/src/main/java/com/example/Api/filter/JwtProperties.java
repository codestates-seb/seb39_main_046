package com.example.Api.filter;

public interface JwtProperties {
    String ID = "id";
    String USERNAME = "username";
    String TOKEN_PREFIX = "Bearer ";

    long EXPIRATION_TIME = (60 * 1000 * 60)*24; // 30min
    String HEADER_PREFIX = "Authorization";

}