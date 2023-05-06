package com.example.shadowingservice.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shadowingservice.dto.BaseListResponseDto;
import com.example.shadowingservice.dto.BaseResponseDto;
import com.example.shadowingservice.dto.request.IndexDto;
import com.example.shadowingservice.dto.response.InterestResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryResponseDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.dto.response.ThemeRoadMapResponseDto;
import com.example.shadowingservice.service.ShadowingService;

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
	 * explain : 비로그인 카테고리 영상 목록 조회
	 * @param category
	 * @param indexDto
	 * @return
	 */

	@GetMapping("/shadowings")
	public ResponseEntity<BaseResponseDto<Object>> getCategoryList(@RequestParam String category,
		@RequestBody IndexDto indexDto) {
		System.out.println("======================");
		System.out.println(category);
		System.out.println(indexDto.getStartIndex());
		System.out.println(indexDto.getEndIndex());
		System.out.println("======================");
		List<ShadowingCategoryDto> shadowingCategoryDtoList = shadowingService.getShadowingCategoryList(category,
			indexDto.toPageable());
		int length = shadowingCategoryDtoList.size();

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

	// ====================== 메인 페이지 로드맵 ====================================

	/**
	 * 이우승
	 * explain : 비로그인 메인 로드맵 불러오기
	 * @return
	 */
	@GetMapping("/main-roadmap")
	public ResponseEntity<BaseResponseDto<NoRoadMapResponseDto>> getRoadMapList() {
		List<RoadMapResponseDto> roadMapResponseDtoList = shadowingService.getRoadMapList();
		ThemeRoadMapResponseDto themeRoadMapResponseDto = new ThemeRoadMapResponseDto
			(roadMapResponseDtoList.get(0).getStepTheme(), roadMapResponseDtoList);
		NoRoadMapResponseDto noRoadMapResponseDto = new NoRoadMapResponseDto(1, themeRoadMapResponseDto);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>
				(200, "비로그인 로드맵 리스트 불러오기 완료", noRoadMapResponseDto));
	}

	// ======================= 메인 페이지 추천 문장 ==================================

	/**
	 * 이우승
	 * explain : 비로그인 메인 추천 문장 불러오기
	 *
	 */

	@GetMapping("/main-recommendation")
	public ResponseEntity<BaseListResponseDto<RecommendationDto>> getRecommendationList() {
		PageRequest page = PageRequest.of(0, 3);
		List<RecommendationDto> recommendationDtoList = shadowingService.getRecommendationList(page);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<>(200, "비로그인 추천 문장 불러오기 완료", recommendationDtoList));
	}

	// ======================= 윤미가 다시 살림 ======================

	@GetMapping("/interests/{interest-id}")
	public ResponseEntity<BaseResponseDto<InterestResponseDto>> getInterest(
		@PathVariable("interest-id") Long interestId) {

		InterestResponseDto interestResponseDto = shadowingService.getInterest(interestId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "관심사 조회 성공", interestResponseDto));
	}


}
