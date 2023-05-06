package com.example.memberservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.memberservice.client.dto.response.InterestResponseDto;
import com.example.memberservice.dto.BaseResponseDto;

@FeignClient(name = "shadowing-service")
public interface ShadowingServiceClient {
	/**
	 * TODO: Feign Client API 생성
	 */
	@GetMapping("")
	BaseResponseDto<InterestResponseDto> getInterest();
}
