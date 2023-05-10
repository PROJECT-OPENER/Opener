package com.example.shadowingservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;

public interface ShadowingService {
	/** 비로그인 쉐도잉 로드맵 전체 목록 조회 **/
	List<NoRoadMapResponseDto> getRoadMapList();

	/** 로그인 쉐도잉 로드맵 전체 목록 조회 **/
	List<AuthNoRoadMapResponseDto> getAuthRoadMapList(Long memberId);

	/** 비로그인 카테고리 별 쉐도잉 영상 목록 조회 **/
	List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable);

	/** 로그인 카테고리 별 쉐도잉 영상 목록 개수 조회 **/
	List<AuthShadowingCategoryDto> getAuthShadowingCategoryList(Long memberId, String category, Pageable pageable);

	/** 카테고리 별 쉐도잉 영상 목록 개수 조회 **/
	int getShadowingCategoryListCount(Long interestId);

	/** 비로그인 쉐도잉 영상 조회 **/
	ShadowingDetailDto getShadowingDetailDto(Long videoId);

	/** 로그인 쉐도잉 영상 조회 **/
	LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId);

	/** 비로그인 메인 페이지 로드맵 **/
	List<RoadMapResponseDto> getMainRoadMapList();

	/** 비로그인 메인 페이지 추천 문장 **/
	List<RecommendationDto> getRecommendationList(Pageable pageable);

	/** 관심사Id 조회 **/
	InterestResponseDto getInterest(Long interestId);

	/** 관심사 이름으로 조회 **/
	InterestResponseDto getInterestByName(String interestName);

}
