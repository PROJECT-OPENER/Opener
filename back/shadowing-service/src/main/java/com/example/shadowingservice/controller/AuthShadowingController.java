package com.example.shadowingservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shadowingservice.dto.BaseResponseDto;
import com.example.shadowingservice.dto.request.IndexDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryResponseDto;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.service.ShadowingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthShadowingController {

	private final ShadowingService shadowingService;

	/**
	 * 이우승
	 * explain : 로그인 쉐도잉 로드맵 전체 목록 조회
	 * @return
	 */
	@GetMapping("/roadmap")
	public ResponseEntity<BaseResponseDto<List<AuthNoRoadMapResponseDto>>> getAuthRoadMapList() {
		Long memberId = 2L;
		List<AuthNoRoadMapResponseDto> authNoRoadMapResponseDtoList = shadowingService.getAuthRoadMapList(memberId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>
				(200, "로그인 쉐도잉 로드맵 전체 목록 조회 완료", authNoRoadMapResponseDtoList));
	}

	/**
	 * 이우승
	 * explain : 로그인 쉐도잉 영상 조회
	 * @param videoId
	 * @return
	 */
	@GetMapping("/videos/{video-id}")
	public ResponseEntity<BaseResponseDto<Object>> getShadowingDetail(@PathVariable("video-id") Long videoId) {
		Long memberId = 2L;
		LoginShadowingDetailDto loginShadowingDetailDto = shadowingService.getLoginShadowingDetailDto(videoId,
			memberId);
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", loginShadowingDetailDto));
	}

	/**
	 * 이우승
	 * explain : 로그인 카테고리별 쉐도잉 목록 조회
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
		Long memberId = 2L;

		List<AuthShadowingCategoryDto> shadowingCategoryDtoList = shadowingService.getAuthShadowingCategoryList(
			memberId, category,
			indexDto.toPageable());

		int length = shadowingService.getShadowingCategoryListCount(interestId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "영상 조회 완료", AuthShadowingCategoryResponseDto
				.builder()
				.length(length)
				.authShadowingCategoryDtoList(shadowingCategoryDtoList)
				.build()));

	}

	/**
	 * 이우승
	 * explain : 반복 횟수 수정
	 * @param videoId
	 * @return
	 */
	@PatchMapping("/videos/{video-id}")
	public ResponseEntity<BaseResponseDto<Object>> updateRepeatCount(@PathVariable("video-id") Long videoId) {
		System.out.println("================ updateRepeatCount============================");
		Long memberId = 2L;
		shadowingService.updateRepeatCount(videoId, memberId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "반복 횟수 수정 완료", null));
	}

}
