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
import com.example.shadowingservice.dto.response.AuthMainThemeRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthThemeRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.DictionaryResponseDto;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.dto.response.ThemeRoadMapResponseDto;
import com.example.shadowingservice.entity.member.Roadmap;
import com.example.shadowingservice.entity.shadowing.Bookmark;
import com.example.shadowingservice.entity.shadowing.Dictionary;
import com.example.shadowingservice.entity.shadowing.Interest;
import com.example.shadowingservice.entity.shadowing.ShadowingStatus;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;
import com.example.shadowingservice.repository.BookmarkRepository;
import com.example.shadowingservice.repository.DictionaryRepository;
import com.example.shadowingservice.repository.InterestRepository;
import com.example.shadowingservice.repository.RoadmapRepository;
import com.example.shadowingservice.repository.ShadowingStatusRepository;
import com.example.shadowingservice.repository.ShadowingVideoInterestRepository;
import com.example.shadowingservice.repository.ShadowingVideoRepository;
import com.example.shadowingservice.repository.StepRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShadowingServiceImpl implements ShadowingService {
	private final ShadowingVideoRepository shadowingVideoRepository;
	private final ShadowingStatusRepository shadowingStatusRepository;
	private final InterestRepository interestRepository;
	private final ShadowingVideoInterestRepository shadowingVideoInterestRepository;
	private final StepRepository stepRepository;
	private final BookmarkRepository bookmarkRepository;
	private final DictionaryRepository dictionaryRepository;
	private final RoadmapRepository roadmapRepository;

	/**
	 * 이우승
	 * explain : 비로그인 쉐도잉 로드맵 전체 목록 조회
	 * @return
	 */
	@Override
	public List<NoRoadMapResponseDto> getRoadMapList() {

		StepMap stepMap = StepMap.getInstance();
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
								throw new ApiException(ExceptionEnum.VIDEO_ID_LIST_NOT_FOUND_EXCEPTION);
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
	 * explain : 로그인 카테고리 별 쉐도잉 영상 목록 조회
	 * @param memberId
	 * @param category
	 * @param pageable
	 * @return
	 */
	@Override
	public List<AuthShadowingCategoryDto> getAuthShadowingCategoryList(Long memberId, String category,
		Pageable pageable) {

		Optional<Interest> interest = interestRepository.findByInterest(category);
		List<Long> videoIdList = shadowingVideoInterestRepository.findAllVideoId(interest.get().getInterestId());
		List<AuthShadowingCategoryDto> shadowingVideoList =
			shadowingVideoRepository.getAuthCategoryDtoList(memberId, videoIdList, pageable);

		return shadowingVideoList;
	}

	/**
	 * 이우승
	 * explain : 비로그인 카테고리 별 쉐도잉 영상 목록 개수 조회
	 * @param interestId
	 * @return
	 */
	@Override
	public int getShadowingCategoryListCount(Long interestId) {
		return shadowingVideoInterestRepository.countVideoIdsByInterestId(interestId);
	}

	/**
	 * 이우승
	 * explain : 쉐도잉 학습 반복횟수
	 * @param memberId
	 */
	@Override
	public void updateRepeatCount(Long videoId, Long memberId) {
		ShadowingStatus shadowingStatus = shadowingStatusRepository
			.findByShadowingVideo_VideoIdAndMemberId(videoId, memberId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.REPEATCOUNT_NOT_FOUND_EXCEPTION));

		int count = shadowingStatus.getRepeatCount();

		if (count + 1 >= 21) {
			shadowingStatus.setRepeatCount(1);
		} else {
			shadowingStatus.setRepeatCount(count + 1);
		}
		shadowingStatusRepository.save(shadowingStatus);
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
	 * explain : 로그인 메인 페이지 로드맵
	 * @param memberId
	 * @param stepNo
	 * @param stepTheme
	 * @return
	 */
	@Override
	public AuthMainThemeRoadMapResponseDto getAuthMainRoadMapList(Long memberId, int stepNo, int stepTheme) {

		StepMap stepMap = StepMap.getInstance();
		HashMap<Integer, String> hashMap = stepMap.getHashMap();

		List<Long> stepIdList = stepRepository.findStepIdList(stepNo, stepTheme);
		if (stepIdList.isEmpty()) {
			throw new ApiException(ExceptionEnum.STEP_ID_LIST_NOT_FOUND_EXCEPTION);
		}

		List<Long> videoIdList = shadowingVideoRepository.findByStepIdIn(stepIdList);
		if (videoIdList.isEmpty()) {
			throw new ApiException(ExceptionEnum.VIDEO_ID_LIST_NOT_FOUND_EXCEPTION);
		}

		List<AuthRoadMapResponseDto> authRoadMapResponseDtoList =
			shadowingVideoRepository.getAuthMainRoadMapResponseDtoList(memberId, videoIdList, stepNo, stepTheme);

		if (authRoadMapResponseDtoList.isEmpty()) {
			throw new ApiException(ExceptionEnum.AUTH_MAIN_ROADMAPS_NOT_FOUND_EXCEPTION);
		}

		AuthMainThemeRoadMapResponseDto authMainThemeRoadMapResponseDto = AuthMainThemeRoadMapResponseDto.builder()
			.stepTheme(hashMap.get(stepTheme))
			.authRoadMapResponseDtoList(authRoadMapResponseDtoList)
			.build();

		return authMainThemeRoadMapResponseDto;
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

	/**
	 * 이우승
	 * explain : 북마크 등록
	 * @param memberId
	 * @param videoId
	 */

	@Override
	public void createBookmark(Long memberId, Long videoId) {

		ShadowingVideo shadowingVideo = shadowingVideoRepository.findByVideoId(videoId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION));

		Optional<Bookmark> existingBookmark =
			bookmarkRepository.findByMemberIdAndShadowingVideo_VideoId(memberId, videoId);

		if (existingBookmark.isPresent()) {
			throw new ApiException(ExceptionEnum.BOOKMARK_ALREADY_EXIST);
		}

		Bookmark bookmark = Bookmark.builder()
			.memberId(memberId)
			.shadowingVideo(shadowingVideo)
			.build();

		bookmarkRepository.save(bookmark);
	}

	/**
	 * 이우승
	 * explain : 북마크 삭제
	 * @param memberId
	 * @param videoId
	 */
	@Override
	public void deleteBookmark(Long memberId, Long videoId) {

		Bookmark bookmark = bookmarkRepository.findByMemberIdAndShadowingVideo_VideoId(memberId, videoId)
			.orElseThrow(() -> new ApiException(ExceptionEnum.ROOKMARK_NOT_FOUND_EXCEPTION));

		bookmarkRepository.delete(bookmark);

	}

	/**
	 * 이우승
	 * explain : 단어 조회
	 * @param word
	 * @return
	 */
	@Override
	public DictionaryResponseDto getWord(String word) {

		Dictionary dictionary = dictionaryRepository.findByWord(word)
			.orElse(new Dictionary());

		return DictionaryResponseDto.builder()
			.word(dictionary.getWord())
			.meaning(dictionary.getMeaning())
			.wordType(dictionary.getWordType())
			.level(dictionary.getLevel())
			.build();
	}

	/**
	 * 이우승
	 * explain : 사용자 로드맵 정보 조회
	 * @param memberId
	 * @return
	 */
	@Override
	public Roadmap getMemberRoadmap(Long memberId) {
		Roadmap roadmap = roadmapRepository.findByMember_MemberId(memberId);
		return roadmap;
	}

}
