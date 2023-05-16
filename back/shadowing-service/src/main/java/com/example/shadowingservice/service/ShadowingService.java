package com.example.shadowingservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.dto.request.CaptionDto;
import com.example.shadowingservice.dto.response.AuthMainThemeRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.DictionaryResponseDto;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.entity.member.Roadmap;

public interface ShadowingService {
	/** 비로그인 쉐도잉 로드맵 전체 목록 조회 **/
	List<NoRoadMapResponseDto> getRoadMapList();

	/** 로그인 쉐도잉 로드맵 전체 목록 조회 **/
	List<AuthNoRoadMapResponseDto> getAuthRoadMapList(Long memberId);

	/** 비로그인 카테고리 별 쉐도잉 영상 목록 조회 **/
	List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable);

	/** 로그인 카테고리 별 쉐도잉 영상 목록 개수 조회 **/
	List<AuthShadowingCategoryDto> getAuthShadowingCategoryList(Long memberId, String category, Pageable pageable);

	/** 비로그인 카테고리 별 쉐도잉 영상 목록 개수 조회 **/
	int getShadowingCategoryListCount(Long interestId);

	/** 쉐도잉 학습 반복횟수 **/
	void updateRepeatCount(Long videoId, Long memberId);

	/** 비로그인 쉐도잉 영상 조회 **/
	ShadowingDetailDto getShadowingDetailDto(CaptionDto captionDto, Long videoId);

	/** 로그인 쉐도잉 영상 조회 **/
	LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId);

	/** 비로그인 메인 페이지 로드맵 **/
	List<RoadMapResponseDto> getMainRoadMapList();

	/** 로그인 메인 페이지 로드맵 **/
	AuthMainThemeRoadMapResponseDto getAuthMainRoadMapList(Long memberId, int stepNo, int stepTheme);

	/** 비로그인 메인 페이지 추천 문장 **/
	List<RecommendationDto> getRecommendationList(Pageable pageable);

	/** 관심사Id 조회 **/
	InterestResponseDto getInterest(Long interestId);

	/** 관심사 이름으로 조회 **/
	InterestResponseDto getInterestByName(String interestName);

	/** 북마크 등록 **/
	void createBookmark(Long memberId, Long videoId);

	/** 북마크 등록/해제 **/
	void patchBookmark(Long memberId, Long videoId);

	/** 단어 조회 **/
	DictionaryResponseDto getWord(String word);

	/** 사용자 로드맵 정보 조회 **/
	Roadmap getMemberRoadmap(Long memberId);

}
