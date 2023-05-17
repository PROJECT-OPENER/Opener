package com.example.shadowingservice.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shadowingservice.dto.BaseListResponseDto;
import com.example.shadowingservice.dto.BaseResponseDto;
import com.example.shadowingservice.dto.request.CaptionDto;
import com.example.shadowingservice.dto.request.IndexDto;
import com.example.shadowingservice.dto.request.ThumbnailRequestDto;
import com.example.shadowingservice.dto.response.DictionaryResponseDto;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.NoMainRoadMapResponseDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryResponseDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.dto.response.ThemeRoadMapResponseDto;
import com.example.shadowingservice.service.ShadowingService;
import com.google.firebase.auth.FirebaseAuthException;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class ShadowingController {

	private final ShadowingService shadowingService;

	@GetMapping("/welcome")
	public String welcome() {
		System.out.println("asdfsdafsdf");
		return "asadfsadfsdafasdf";
	}

	/**
	 * 이우승
	 * explain : 비로그인 쉐도잉 로드맵 전체 목록 조회
	 * @return
	 */

	@GetMapping("/roadmap")
	public ResponseEntity<BaseResponseDto<List<NoRoadMapResponseDto>>> getRoadmapList() {
		List<NoRoadMapResponseDto> noListRoadMapResponseDto = shadowingService.getRoadMapList();
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "로드맵 목록 조회 완료", noListRoadMapResponseDto));
	}

	/**
	 * 이우승
	 * explain : 비로그인 카테고리 조회
	 * @param category
	 * @param startIndex
	 * @param endIndex
	 * @return
	 */
	@GetMapping("/shadowings")
	public ResponseEntity<BaseResponseDto<Object>> getCategoryList(@RequestParam("category") String category,
		@RequestParam("startIndex") int startIndex,
		@RequestParam("endIndex") int endIndex) {

		IndexDto indexDto = new IndexDto(startIndex, endIndex);
		Long interestId = shadowingService.getInterestByName(category).getInterestId();

		List<ShadowingCategoryDto> shadowingCategoryDtoList = shadowingService.getShadowingCategoryList(category,
			indexDto.toPageable());

		int length = shadowingService.getShadowingCategoryListCount(interestId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", ShadowingCategoryResponseDto
				.builder()
				.length(length)
				.shadowingCategoryDtoList(shadowingCategoryDtoList)
				.build()));
	}

	/**
	 * 이우승
	 * explain : 비로그인 영상 조회
	 * @param videoId
	 * @return
	 */
	@GetMapping("/videos/{video-id}")
	public ResponseEntity<BaseResponseDto<Object>> getShadowingDetail(@PathVariable("video-id") Long videoId) {
		ShadowingDetailDto shadowingDetailDto = shadowingService.getShadowingDetailDto(videoId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", shadowingDetailDto));
	}

	@PatchMapping("/videos/{video-id}")
	public ResponseEntity<BaseResponseDto<Object>> updateCaption
		(@RequestBody CaptionDto captionDto, @PathVariable("video-id") Long videoId) {

		shadowingService.updateCaption(captionDto, videoId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 자막 추가 완료", null));
	}

	/**
	 * 이우승
	 * explain : 비로그인 메인 로드맵 불러오기
	 * @return
	 */
	@GetMapping("/main-roadmap")
	public ResponseEntity<BaseResponseDto<NoMainRoadMapResponseDto>> getMainRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList = shadowingService.getMainRoadMapList();
		ThemeRoadMapResponseDto themeRoadMapResponseDto = new ThemeRoadMapResponseDto
			(roadMapResponseDtoList.get(0).getStepTheme(), roadMapResponseDtoList);
		NoMainRoadMapResponseDto noMainRoadMapResponseDto = new NoMainRoadMapResponseDto(1, themeRoadMapResponseDto);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>
				(200, "비로그인 로드맵 리스트 불러오기 완료", noMainRoadMapResponseDto));
	}

	/**
	 * 이우승
	 * explain : 비로그인 메인 추천 문장 불러오기
	 *
	 */

	@GetMapping("/main-recommendation")
	public ResponseEntity<BaseListResponseDto<RecommendationDto>> getRecommendationList() {
		PageRequest page = PageRequest.of(0, 6);
		List<RecommendationDto> recommendationDtoList = shadowingService.getRecommendationList(page);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<>(200, "비로그인 추천 문장 불러오기 완료", recommendationDtoList));
	}

	/**
	 * 이우승
	 * explain : 관심사 조회
	 * @param interestId
	 * @return
	 */

	@GetMapping("/interests/{interest-id}")
	public ResponseEntity<BaseResponseDto<InterestResponseDto>> getInterest(
		@PathVariable("interest-id") Long interestId) {

		InterestResponseDto interestResponseDto = shadowingService.getInterest(interestId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "관심사 조회 성공", interestResponseDto));
	}

	/**
	 * 이우승
	 * explain : 단어 조회
	 * @param word
	 * @return
	 */
	@GetMapping("/dictionary/{word}")
	public ResponseEntity<BaseResponseDto<DictionaryResponseDto>> getWord(@PathVariable("word") String word) {

		DictionaryResponseDto dictionaryResponseDto = shadowingService.getWord(word);
		if (dictionaryResponseDto.getWord() == null) {
			return ResponseEntity.status(HttpStatus.OK)
				.body(new BaseResponseDto<>(200, "존재하지 않는 단어입니다.", null));
		}

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "단어 조회 성공", dictionaryResponseDto));
	}

	/**
	 * 이우승
	 * explain : 썸네일 파이어베이스에 등록
	 * @param videoId
	 * @param thumbnailRequestDto
	 * @return
	 * @throws IOException
	 * @throws FirebaseAuthException
	 */
	@PostMapping("/shadowings/{video-id}")
	public ResponseEntity<BaseResponseDto> createMemberChallenge(@PathVariable("video-id") Long videoId, @ModelAttribute ThumbnailRequestDto thumbnailRequestDto)
		throws IOException, FirebaseAuthException {
		shadowingService.updateShadowingThumbnail(videoId, thumbnailRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "썸네일 저장 완료"));
	}

}
