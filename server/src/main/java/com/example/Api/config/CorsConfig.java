package com.example.Api.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); //서버가 응답할 때 json을 자바스크립트에서 처리할 수 있도록 설정합니다 -> 무슨 의미?
        config.addAllowedOriginPattern("*"); //모든 ip 응답허용
        config.addAllowedHeader("*"); //모든 Header 응답허용
        config.addAllowedMethod("*"); //모든 Http Request Method 응답허용
        config.addExposedHeader("Authorization");

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
