package com.example.shadowingservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.entity.Interest;
import com.example.shadowingservice.entity.ShadowingVideo;
import com.example.shadowingservice.repository.BookmarkRepository;
import com.example.shadowingservice.repository.InterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShadowingServiceImpl implements ShadowingService {
	private final ShadowingVideoRepository shadowingVideoRepository;
	private final InterestRepository interestRepository;
	private final BookmarkRepository bookmarkRepository;

	// ============================ 쉐도잉 카테고리 ====================================

	@Override
	public List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable) {
		Interest interest = interestRepository.getByInterest(category);
		// Page<ShadowingCategoryDto> shadowingCategoryDtoPage = shadowingVideoRepository

		// return (List<ShadowingCategoryDto>)shadowingCategoryDtoPage;
		return null;
	}

	// ======================== 쉐도잉 영상 조회 ====================================

	@Override
	public ShadowingDetailDto getShadowingDetailDto(Long videoId) {
		// ModelMapper mapper = new ModelMapper();
		ShadowingVideo shadowingVideo = shadowingVideoRepository.findByVideoId(videoId);
		ShadowingDetailDto shadowingDetailDto = new ShadowingDetailDto(
			shadowingVideo.getStartTime(), shadowingVideo.getEndTime(),
			shadowingVideo.getEngCaption(), shadowingVideo.getKorCaption()
		);
		return shadowingDetailDto;
	}

	@Override
	public LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId,Long memberId) {
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingVideoRepository
			.getLoginShadowingDetailDto(videoId, memberId);
		return loginShadowingDetailDto;
	}

	// ======================== 메인 페이지 추천 로드맵 ===========================

	@Override
	public List<RoadMapResponseDto> getRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList = shadowingVideoRepository.getRoadMapResponseDtoList();
		return roadMapResponseDtoList;
	}

	// =========================== 메인 페이지 추천 문장 ===========================

	@Override
	public List<RecommendationDto> getRecommendationList(Pageable pageable) {
		List<ShadowingVideo> recommendationList = shadowingVideoRepository
			.findRecommendation(
				pageable);

		List<RecommendationDto> recommendationDtos = new ArrayList<>();
		for (ShadowingVideo shadowingVideo : recommendationList) {
			RecommendationDto recommendationDto = new RecommendationDto(
				shadowingVideo.getVideoId(),
				shadowingVideo.getThumbnailUrl(),
				shadowingVideo.getEngSentence(),
				shadowingVideo.getKorSentence()
			);
			recommendationDtos.add(recommendationDto);
		}
		return recommendationDtos;
	}

}
