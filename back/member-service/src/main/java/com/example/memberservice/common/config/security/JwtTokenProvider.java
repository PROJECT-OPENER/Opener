package com.example.memberservice.common.config.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.PostConstruct;

import java.util.Base64;

@Component
@Slf4j
public class JwtTokenProvider {

	@Value("${spring.jwt.secretKey}")
	private String secretKey;

	public static Long ACCESS_TOKEN_VALID_TIME = 60 * 60 * 1000L;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	/**
	 * 김윤미
	 * explain : Jwt Token 생성
	 * @param email : 이메일(subject)
	 * @return : Token
	 */
	public String createToken(String email) {
		Date now = new Date();

		return Jwts.builder()
			.setSubject(email)
			.setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME))
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
	}
}


