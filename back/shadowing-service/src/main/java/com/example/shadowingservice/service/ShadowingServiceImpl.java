package com.example.shadowingservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.shadowingservice.common.StepMap;
import com.example.shadowingservice.common.exception.ApiException;
import com.example.shadowingservice.common.exception.ExceptionEnum;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthThemeRoadMapResponseDto;
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

@Service
@RequiredArgsConstructor
public class ShadowingServiceImpl implements ShadowingService {
	private final ShadowingVideoRepository shadowingVideoRepository;
	private final InterestRepository interestRepository;
	private final ShadowingVideoInterestRepository shadowingVideoInterestRepository;
	private final StepRepository stepRepository;

	StepMap stepMap = StepMap.getInstance();

	/**
	 * 이우승
	 * explain : 비로그인 쉐도잉 로드맵 전체 목록 조회
	 * @return
	 */
	@Override
	public List<NoRoadMapResponseDto> getRoadMapList() {

		HashMap<Integer, String> hashMap = stepMap.getHashMap();
		List<Integer> stepNoList = stepRepository.findDistinctStepNo();

		if (stepNoList == null || stepNoList.isEmpty()) {
			throw new ApiException(ExceptionEnum.ROADMAPS_NOT_FOUND_EXCEPTION);
		}

		List<NoRoadMapResponseDto> noRoadMapResponseDtoList = stepNoList.stream().map(stepNo -> {
			List<Integer> stepThemeList = stepRepository.findDistinctStepTheme(stepNo);

			if (stepThemeList == null || stepThemeList.isEmpty()) {
				throw new ApiException(ExceptionEnum.ROADMAPS_NOT_FOUND_EXCEPTION);
			}

			List<ThemeRoadMapResponseDto> themeRoadMapResponseDtoList = stepThemeList.stream().map(stepTheme -> {
				List<Long> stepIdList = stepRepository.findStepIdList(stepNo, stepTheme);

				if (stepIdList == null || stepIdList.isEmpty()) {
					throw new ApiException(ExceptionEnum.ROADMAPS_NOT_FOUND_EXCEPTION);
				}

				List<RoadMapResponseDto> shadowingVideoList =
					shadowingVideoRepository.getThemeRoadMapResponseDtoList(stepIdList);

				return ThemeRoadMapResponseDto.builder()
					.stepTheme(hashMap.get(stepTheme))
					.roadMapResponseDtoList(shadowingVideoList)
					.build();
			}).collect(Collectors.toList());

			return NoRoadMapResponseDto.builder()
				.stepNo(stepNo)
				.themeRoadMapResponseDtoList(themeRoadMapResponseDtoList)
				.build();
		}).collect(Collectors.toList());

		if (noRoadMapResponseDtoList.isEmpty()) {
			throw new ApiException(ExceptionEnum.ROADMAPS_NOT_FOUND_EXCEPTION);
		}

		return noRoadMapResponseDtoList;

	}

	/**
	 * 이우승
	 * explain : 로그인 쉐도잉 로드맵 전체 목록 조회
	 * @param memberId
	 * @return
	 */
	@Override
	public List<AuthNoRoadMapResponseDto> getAuthRoadMapList(Long memberId) {
		StepMap stepMap = StepMap.getInstance();
		HashMap<Integer, String> hashMap = stepMap.getHashMap();
		List<Integer> stepNoList = stepRepository.findDistinctStepNo();

		List<AuthNoRoadMapResponseDto> authNoRoadMapResponseDtoList = stepNoList.stream()
			.map(stepNo -> {
				List<AuthThemeRoadMapResponseDto> authThemeRoadMapResponseDtoList =
					stepRepository.findDistinctStepTheme(
						stepNo)
					.stream()
					.map(stepTheme -> {
						List<Long> stepIdList = stepRepository.findStepIdList(stepNo, stepTheme);
						List<AuthRoadMapResponseDto> shadowingVideoList =
							shadowingVideoRepository.getAuthThemeRoadMapResponseDtoList(
							memberId, stepIdList);

						if (shadowingVideoList.isEmpty()) {
							throw new ApiException(ExceptionEnum.AUTH_ROADMAPS_NOT_FOUND_EXCEPTION);
						}

						return AuthThemeRoadMapResponseDto.builder()
							.stepTheme(hashMap.get(stepTheme))
							.authRoadMapResponseDtoList(shadowingVideoList)
							.build();
					})
					.collect(Collectors.toList());

				if (authThemeRoadMapResponseDtoList.isEmpty()) {
					throw new ApiException(ExceptionEnum.AUTH_ROADMAPS_NOT_FOUND_EXCEPTION);
				}

				return AuthNoRoadMapResponseDto.builder()
					.stepNo(stepNo)
					.authThemeRoadMapResponseDtoList(authThemeRoadMapResponseDtoList)
					.build();
			})
			.collect(Collectors.toList());

		if (authNoRoadMapResponseDtoList.isEmpty()) {
			throw new ApiException(ExceptionEnum.AUTH_ROADMAPS_NOT_FOUND_EXCEPTION);
		}
		return authNoRoadMapResponseDtoList;
	}

	/**
	 * 이우승
	 * explain : 비로그인 카테고리 별 쉐도잉 영상 목록 조회
	 * @param category
	 * @param pageable
	 * @return
	 */
	@Override
	public List<ShadowingCategoryDto> getShadowingCategoryList(String category, Pageable pageable) {
		Optional<Interest> interest = interestRepository.findByInterest(category);
		List<Long> videoIdList = shadowingVideoInterestRepository.findAllVideoId(interest.get().getInterestId());
		List<ShadowingCategoryDto> shadowingVideoList = shadowingVideoRepository.getCategoryDotoList(videoIdList,
			pageable);
		return shadowingVideoList;
	}

	/**
	 * 이우승
	 * explain : 카테고리 별 쉐도잉 영상 목록 개수 조회
	 * @param interestId
	 * @return
	 */
	@Override
	public int getShadowingCategoryListCount(Long interestId) {
		return shadowingVideoInterestRepository.countVideoIdsByInterestId(interestId);
	}

	/**
	 * 이우승
	 * explain : 비로그인 쉐도잉 영상 조회
	 * @param videoId
	 * @return
	 */
	@Override
	public ShadowingDetailDto getShadowingDetailDto(Long videoId) {
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

	/**
	 * 이우승
	 * explain : 로그인 쉐도잉 영상 조회
	 * @param videoId
	 * @param memberId
	 * @return
	 */
	@Override
	public LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId) {
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingVideoRepository
			.getLoginShadowingDetailDto(videoId, memberId).get();
		return loginShadowingDetailDto;
	}

	/**
	 * 이우승
	 * explain : 비로그인 메인 페이지 로드맵
	 * @return
	 */
	@Override
	public List<RoadMapResponseDto> getMainRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList =
			shadowingVideoRepository.getMainRoadMapResponseDtoList();

		return roadMapResponseDtoList;
	}

	/**
	 * 이우승
	 * explain : 비로그인 메인 페이지 추천 문장
	 * @param pageable
	 * @return
	 */
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

	/**
	 * 이우승
	 * explain : 관심사Id 조회
	 * @param interestId
	 * @return
	 */
	@Override
	public InterestResponseDto getInterest(Long interestId) {
		Interest interest = interestRepository.findByInterestId(interestId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.CATEGORY_NOT_FOUND_EXCEPTION));

		return InterestResponseDto.builder()
			.interestId(interest.getInterestId())
			.interest(interest.getInterest())
			.build();
	}

	/**
	 * 이우승
	 * explain : 관심사 이름으로 조회
	 * @param interestName
	 * @return
	 */
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
