package com.example.memberservice.client;

import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.memberservice.client.dto.response.InterestResponseDto;
import com.example.memberservice.dto.BaseResponseDto;

@FeignClient(name = "shadowing-service")
public interface ShadowingServiceClient {

	@GetMapping("/interests/{interest-id}")
	Optional<BaseResponseDto<InterestResponseDto>> getInterest(@PathVariable(value = "interest-id") Long interestId);
}
