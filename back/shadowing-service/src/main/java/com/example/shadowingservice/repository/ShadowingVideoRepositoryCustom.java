package com.example.shadowingservice.repository;

import java.util.List;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;

public interface ShadowingVideoRepositoryCustom {
	LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId);

	List<RoadMapResponseDto> getRoadMapResponseDtoList();

}
