package com.example.shadowingservice.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shadowingservice.dto.BaseResponseDto;
import com.example.shadowingservice.dto.request.IndexDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryResponseDto;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.AuthMainThemeRoadMapResponseDto;
import com.example.shadowingservice.entity.member.Roadmap;
import com.example.shadowingservice.entity.shadowing.ShadowingStatus;
import com.example.shadowingservice.repository.ShadowingStatusRepository;
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
	public ResponseEntity<BaseResponseDto<List<AuthNoRoadMapResponseDto>>>
	getAuthMainRoadMapList(HttpServletRequest request) {
		Long memberId = Long.parseLong(request.getHeader("memberId"));
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
	public ResponseEntity<BaseResponseDto<Object>> getShadowingDetail(HttpServletRequest request,
		@PathVariable("video-id") Long videoId) {
		Long memberId = Long.parseLong(request.getHeader("memberId"));
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
	public ResponseEntity<BaseResponseDto<Object>> getCategoryList(HttpServletRequest request,
		@RequestParam("category") String category,
		@RequestParam("startIndex") int startIndex,
		@RequestParam("endIndex") int endIndex) {

		IndexDto indexDto = new IndexDto(startIndex, endIndex);
		Long memberId = Long.parseLong(request.getHeader("memberId"));
		int length;

		if(category.equals("전체")) {
			length = shadowingService.getShadowingVideoCount();
		}else if(category.equals("북마크")){
			length = shadowingService.getBookmarkCount(memberId);
			if(length == 0) {
				return ResponseEntity.status(HttpStatus.OK)
					.body(new BaseResponseDto<>(200, "영상 조회 완료", null));
			}
		}else {
			Long interestId = shadowingService.getInterestByName(category).getInterestId();
			length = shadowingService.getShadowingCategoryListCount(interestId);
		}

		List<AuthShadowingCategoryDto> shadowingCategoryDtoList = shadowingService.getAuthShadowingCategoryList(
			memberId, category,
			indexDto.toPageable());

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
	public ResponseEntity<BaseResponseDto<Object>> updateRepeatCount(HttpServletRequest request,
		@PathVariable("video-id") Long videoId) {

		Long memberId = Long.parseLong(request.getHeader("memberId"));
		shadowingService.updateRepeatCount(videoId, memberId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "반복 횟수 수정 완료", null));
	}

	/**
	 * 이우승
	 * explain : 북마크 등록
	 * @param videoId
	 * @return
	 */
	@PostMapping("/videos/{video-id}/bookmark")
	public ResponseEntity<BaseResponseDto<Object>> createBookmark(HttpServletRequest request,
		@PathVariable("video-id") Long videoId) {

		Long memberId = Long.parseLong(request.getHeader("memberId"));

		shadowingService.createBookmark(memberId, videoId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "북마크 등록 완료", null));
	}

	/**
	 * 이우승
	 * explain : 북마크 등록/해제
	 * @param videoId
	 * @return
	 */
	@PatchMapping("/videos/{video-id}/bookmark")
	public ResponseEntity<BaseResponseDto<Object>> patchBookmark(HttpServletRequest request,
		@PathVariable("video-id") Long videoId) {

		Long memberId = Long.parseLong(request.getHeader("memberId"));

		shadowingService.patchBookmark(memberId, videoId);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "북마크 등록/해제 완료", null));
	}

	/**
	 * 이우승
	 * explain : 로그인 메인 페이지 로드맵
	 * @return
	 */
	@GetMapping("/main-roadmap")
	public ResponseEntity<BaseResponseDto<AuthMainThemeRoadMapResponseDto>> getAuthMainRoadMap(
		HttpServletRequest request) {

		Long memberId = Long.parseLong(request.getHeader("memberId"));
		Roadmap roadmap = shadowingService.getMemberRoadmap(memberId);
		int stepNo = roadmap.getStepNo();
		int stepTheme = roadmap.getStepTheme();

		AuthMainThemeRoadMapResponseDto authMainThemeRoadMapResponseDto =
			shadowingService.getAuthMainRoadMapList(memberId, stepNo, stepTheme);

		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseResponseDto<>(200, "로그인 메인 로드맵 목록 조회 완료", authMainThemeRoadMapResponseDto));
	}

}
