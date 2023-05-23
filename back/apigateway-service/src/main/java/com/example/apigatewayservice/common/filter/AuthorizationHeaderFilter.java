package com.example.apigatewayservice.common.filter;

import java.util.Base64;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.example.apigatewayservice.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

	private final RedisService redisService;
	private final ObjectMapper mapper;

	public AuthorizationHeaderFilter(RedisService redisService, ObjectMapper mapper) {
		super(AuthorizationHeaderFilter.Config.class);
		this.redisService = redisService;
		this.mapper = mapper;
	}

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	@Value("${spring.jwt.secretKey}")
	private String secretKey;

	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();

			if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
				return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
			}

			String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
			String jwt = authorizationHeader.replace("Bearer", "");

			if (!isJwtValid(jwt)) {
				return onError(exchange, "JWT token is not valid", HttpStatus.UNAUTHORIZED);
			}

			jwt = jwt.trim();
			String memberId = redisService.getMemberId(jwt);
			if (memberId == null) {
				return onError(exchange, "사용자 정보가 없습니다.", HttpStatus.NOT_FOUND);
			}
			exchange.getRequest().mutate()
				.headers(httpHeaders -> httpHeaders.add("memberId", memberId)).build();

			return chain.filter(exchange);
		});
	}

	private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
		ServerHttpResponse response = exchange.getResponse();
		response.setStatusCode(httpStatus);

		log.error(err);
		return response.setComplete();
	}

	private boolean isJwtValid(String jwt) {
		boolean returnValue = true;
		String subject = null;
		try {
			subject = Jwts.parser().setSigningKey(secretKey)
				.parseClaimsJws(jwt).getBody()
				.getSubject();
		} catch (Exception ex) {
			returnValue = false;
		}

		if (subject == null || subject.isEmpty()) {
			returnValue = false;
		}

		return returnValue;
	}

	public static class Config {
		// Put the configuration properties
	}
}
