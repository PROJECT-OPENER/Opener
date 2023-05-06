package com.example.shadowingservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.shadowingservice.common.exception.ApiException;
import com.example.shadowingservice.common.exception.ExceptionEnum;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.entity.shadowing.Interest;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;
import com.example.shadowingservice.entity.shadowing.ShadowingVideoInterest;
import com.example.shadowingservice.repository.BookmarkRepository;
import com.example.shadowingservice.repository.InterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoInterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShadowingServiceImpl implements ShadowingService {
	private final ShadowingVideoRepository shadowingVideoRepository;
	private final InterestRepository interestRepository;

	private final ShadowingVideoInterestRepository shadowingVideoInterestRepository;
	private final BookmarkRepository bookmarkRepository;

	// ============================ 쉐도잉 카테고리 ====================================

	@Override
	public List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable) {
		System.out.println("===============================");
		System.out.println("service 시작");
		Optional<Interest> interest = interestRepository.findByInterest(category);
		System.out.println(interest.get().getInterestId());
		List<ShadowingVideoInterest> videoIdList = shadowingVideoInterestRepository.findByInterest_InterestId(
			interest.get().getInterestId());
		System.out.println(videoIdList.get(0).getShadowingVideo().getVideoId());
		// List<ShadowingVideo> shadowingCategoryDtoPage = shadowingVideoRepository.findByVideoIdIn(videoIdList, pageable);
		// System.out.println(shadowingCategoryDtoPage.get(0).getVideoId());
		System.out.println("===============================");
		// return (List<ShadowingCategoryDto>)shadowingCategoryDtoPage;
		return null;
	}

	// ======================== 쉐도잉 영상 조회 ====================================

	@Override
	public ShadowingDetailDto getShadowingDetailDto(Long videoId) {
		// ModelMapper mapper = new ModelMapper();
		ShadowingVideo shadowingVideo = shadowingVideoRepository.findByVideoId(videoId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION));


		return ShadowingDetailDto.builder()
			.start(shadowingVideo.getStartTime())
			.end(shadowingVideo.getEndTime())
			.engCaption(shadowingVideo.getEngCaption())
			.korCaption(shadowingVideo.getKorCaption())
			.build();
	}

	@Override
	public LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId) {
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingVideoRepository
			.getLoginShadowingDetailDto(videoId, memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION));

		return loginShadowingDetailDto;
	}

	// ======================== 메인 페이지 추천 로드맵 ===========================

	@Override
	public List<RoadMapResponseDto> getRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList =
			shadowingVideoRepository.getRoadMapResponseDtoList();

		return roadMapResponseDtoList;
	}

	// =========================== 메인 페이지 추천 문장 ===========================

	@Override
	public List<RecommendationDto> getRecommendationList(Pageable pageable) {
		List<ShadowingVideo> recommendationList = shadowingVideoRepository
			.findRecommendation(
				pageable);
		if (recommendationList.isEmpty()) {
			throw new ApiException(ExceptionEnum.RECOMMENDATIONS_NOT_FOUND_EXCEPTION);
		}

		List<RecommendationDto> recommendationDtos = new ArrayList<>();
		for (ShadowingVideo shadowingVideo : recommendationList) {

			recommendationDtos.add(
				RecommendationDto.builder()
					.videoId(shadowingVideo.getVideoId())
					.thumbnailUrl(shadowingVideo.getThumbnailUrl())
					.engSentence(shadowingVideo.getEngSentence())
					.korSentence(shadowingVideo.getKorSentence())
					.build()
			);
		}
		return recommendationDtos;
	}

	// =========================== 관심사 조회 =========================
	@Override
	public InterestResponseDto getInterest(Long interestId) {
		Interest interest = interestRepository.findByInterestId(interestId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CATEGORY_NOT_FOUND_EXCEPTION));

		InterestResponseDto interestResponseDto = new InterestResponseDto(
			interest.getInterestId(),
			interest.getInterest()
		);
		return InterestResponseDto.builder()
			.interestId(interestResponseDto.getInterestId())
			.interest(interestResponseDto.getInterest())
			.build();
	}

}
