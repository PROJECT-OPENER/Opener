package com.example.shadowingservice.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.dto.request.IndexDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;

public interface ShadowingService {
	/** 비로그인 카테고리 별 쉐도잉 영상 목록 조회 **/
	List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable);

	/** 비로그인 쉐도잉 영상 조회 **/
	ShadowingDetailDto getShadowingDetailDto(Long videoId);

	/** 로그인 쉐도잉 영상 조회 **/
	LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId);

	/** 비로그인 메인 페이지 추천 문장 **/
	List<RecommendationDto> getRecommendationDtos(Pageable pageable);

}
