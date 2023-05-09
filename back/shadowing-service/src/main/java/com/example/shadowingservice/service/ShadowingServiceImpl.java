package com.example.shadowingservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.shadowingservice.common.StepMap;
import com.example.shadowingservice.common.exception.ApiException;
import com.example.shadowingservice.common.exception.ExceptionEnum;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.dto.response.ThemeRoadMapResponseDto;
import com.example.shadowingservice.entity.shadowing.Interest;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;
import com.example.shadowingservice.repository.InterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoInterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoRepository;
import com.example.shadowingservice.repository.StepRepository;

import lombok.RequiredArgsConstructor;

/**
 * [우승 ❤ 😁 💋] 쉐도잉 서비스 인터페이스 구현 👀
 */
@Service
@RequiredArgsConstructor
public class ShadowingServiceImpl implements ShadowingService {
	private final ShadowingVideoRepository shadowingVideoRepository;
	private final InterestRepository interestRepository;
	private final ShadowingVideoInterestRepository shadowingVideoInterestRepository;
	private final StepRepository stepRepository;

	@Override
	public List<NoRoadMapResponseDto> getRoadMapList() {

		StepMap stepMap = StepMap.getInstance();
		HashMap<Integer, String> hashMap = stepMap.getHashMap();
		List<Integer> stepNoList = stepRepository.findDistinctStepNo();
		List<NoRoadMapResponseDto> noRoadMapResponseDtoList = new ArrayList<>();

		for (int stepNo = 0; stepNo < stepNoList.size(); stepNo++) {
			List<Integer> stepThemeList = stepRepository.findDistinctStepTheme(stepNoList.get(stepNo));
			List<ThemeRoadMapResponseDto> themeRoadMapResponseDtoList = new ArrayList<>();
			for (int stepTheme = 0; stepTheme < stepThemeList.size(); stepTheme++) {

				List<Long> stepIdList = stepRepository
					.findStepIdList(stepNoList.get(stepNo), stepThemeList.get(stepTheme));

				List<RoadMapResponseDto> shadowingVideoList =
					shadowingVideoRepository.getThemeRoadMapResponseDtoList(stepIdList);
				ThemeRoadMapResponseDto themeRoadMapResponseDto = ThemeRoadMapResponseDto.builder()
					.stepTheme(hashMap.get(stepThemeList.get(stepTheme)))
					.roadMapResponseDtoList(shadowingVideoList)
					.build();

				themeRoadMapResponseDtoList.add(themeRoadMapResponseDto);

			}

			NoRoadMapResponseDto noRoadMapResponseDto = NoRoadMapResponseDto.builder()
				.stepNo(stepNoList.get(stepNo))
				.themeRoadMapResponseDtoList(themeRoadMapResponseDtoList)
				.build();

			noRoadMapResponseDtoList.add(noRoadMapResponseDto);

		}
		if(noRoadMapResponseDtoList.isEmpty()) {
			throw new ApiException(ExceptionEnum.ROADMAPS_NOT_FOUND_EXCEPTION);
		}
		return noRoadMapResponseDtoList;
	}

	// ============================ 쉐도잉 카테고리 ====================================

	@Override
	public List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable) {
		Optional<Interest> interest = interestRepository.findByInterest(category);
		List<Long> videoIdList = shadowingVideoInterestRepository.findAllVideoId(interest.get().getInterestId());
		List<ShadowingCategoryDto> shadowingVideoList = shadowingVideoRepository.getCategoryDotoList(videoIdList,
			pageable);
		return shadowingVideoList;
	}

	@Override
	public int getShadowingCategoryListCount(Long interestId) {
		return shadowingVideoInterestRepository.countVideoIdsByInterestId(interestId);
	}

	// ======================== 쉐도잉 영상 조회 ====================================

	@Override
	public ShadowingDetailDto getShadowingDetailDto(Long videoId) {
		// ModelMapper mapper = new ModelMapper();
		ShadowingVideo shadowingVideo = shadowingVideoRepository.findByVideoId(videoId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION));

		return ShadowingDetailDto.builder()
			.videoUrl(shadowingVideo.getVideoUrl())
			.start(shadowingVideo.getStartTime())
			.end(shadowingVideo.getEndTime())
			.engCaption(shadowingVideo.getEngCaption())
			.korCaption(shadowingVideo.getKorCaption())
			.build();
	}

	@Override
	public LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId) {
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingVideoRepository
			.getLoginShadowingDetailDto(videoId, memberId).get();
		return loginShadowingDetailDto;
	}

	// ======================== 메인 페이지 추천 로드맵 ===========================

	@Override
	public List<RoadMapResponseDto> getMainRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList =
			shadowingVideoRepository.getMainRoadMapResponseDtoList();

		return roadMapResponseDtoList;
	}

	// =========================== 메인 페이지 추천 문장 ===========================

	@Override
	public List<RecommendationDto> getRecommendationList(Pageable pageable) {
		List<ShadowingVideo> recommendationList = shadowingVideoRepository
			.findRecommendation(
				pageable);

		List<RecommendationDto> recommendationDtoList = new ArrayList<>();
		for (ShadowingVideo shadowingVideo : recommendationList) {
			recommendationDtoList.add(
				RecommendationDto.builder()
					.videoId(shadowingVideo.getVideoId())
					.thumbnailUrl(shadowingVideo.getThumbnailUrl())
					.engSentence(shadowingVideo.getEngSentence())
					.korSentence(shadowingVideo.getKorSentence())
					.build()
			);
		}
		return recommendationDtoList;
	}

	// =========================== 관심사 id로 조회 =========================
	@Override
	public InterestResponseDto getInterest(Long interestId) {
		Interest interest = interestRepository.findByInterestId(interestId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CATEGORY_NOT_FOUND_EXCEPTION));

		return InterestResponseDto.builder()
			.interestId(interest.getInterestId())
			.interest(interest.getInterest())
			.build();
	}

	// ================= 관심사 이름으로 조회
	@Override
	public InterestResponseDto getInterestByName(String interestName) {

		Interest interest = interestRepository.findByInterest(interestName)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CATEGORY_NOT_FOUND_EXCEPTION));

		InterestResponseDto interestResponseDto = InterestResponseDto.builder()
			.interestId(interest.getInterestId())
			.interest(interest.getInterest())
			.build();

		return interestResponseDto;
	}

}
