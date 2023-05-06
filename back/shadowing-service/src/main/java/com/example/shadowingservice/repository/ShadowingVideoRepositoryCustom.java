package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;

public interface ShadowingVideoRepositoryCustom {
	Optional<LoginShadowingDetailDto> getLoginShadowingDetailDto(Long videoId, Long memberId);

	Optional<List<RoadMapResponseDto>> getRoadMapResponseDtoList();


}
