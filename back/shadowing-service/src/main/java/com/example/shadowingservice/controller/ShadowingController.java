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
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryResponseDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
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

		ShadowingCategoryResponseDto shadowingCategoryResponseDto = new ShadowingCategoryResponseDto(length,
			shadowingCategoryDtoList);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", shadowingCategoryResponseDto));
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

	/**
	 * 이우승
	 * explain : 로그인 영상 조회
	 * @param vidoeId
	 *
	 */

	@GetMapping("/auth/videos/{video-id}")
	public ResponseEntity<BaseResponseDto<Object>> getLoginShadowingDetail(@PathVariable("video-id") Long vidoeId) {
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingService.getLoginShadowingDetailDto(vidoeId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", loginShadowingDetailDto));
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
		List<RecommendationDto> recommendationDtos = shadowingService.getRecommendationDtos(page);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<>(200, "비로그인 추천 문장 불러오기 완료", recommendationDtos));
	}
}
