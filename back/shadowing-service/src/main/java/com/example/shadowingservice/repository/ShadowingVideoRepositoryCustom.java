package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;

public interface ShadowingVideoRepositoryCustom {
	Optional<LoginShadowingDetailDto> getLoginShadowingDetailDto(Long videoId, Long memberId);

	List<RoadMapResponseDto> getMainRoadMapResponseDtoList();

	List<ShadowingCategoryDto> getCategoryDotoList(List<Long> videoIdList, Pageable pageable);

}
