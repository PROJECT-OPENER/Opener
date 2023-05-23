package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.dto.response.AuthRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.entity.member.Member;

public interface ShadowingVideoRepositoryCustom {
	Optional<LoginShadowingDetailDto> getLoginShadowingDetailDto(Long videoId, Member memberId);

	List<RoadMapResponseDto> getMainRoadMapResponseDtoList();

	List<AuthRoadMapResponseDto> getAuthMainRoadMapResponseDtoList(Member member, List<Long> videoList, int stepNo, int stepTheme);

	List<ShadowingCategoryDto> getCategoryDotoList(List<Long> videoIdList, Pageable pageable);

	List<AuthShadowingCategoryDto> getAuthCategoryDtoList(Member member, List<Long> videoIdList, Pageable pageable);

	List<RoadMapResponseDto> getThemeRoadMapResponseDtoList(List<Long> stepIdList);

	List<AuthRoadMapResponseDto> getAuthThemeRoadMapResponseDtoList(Member member, List<Long> stepIdList);

}
