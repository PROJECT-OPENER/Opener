package com.example.shadowingservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shadowingservice.dto.BaseResponseDto;
import com.example.shadowingservice.dto.response.AuthNoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;
import com.example.shadowingservice.dto.response.NoRoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingDetailDto;
import com.example.shadowingservice.service.ShadowingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthShadowingController {

	private final ShadowingService shadowingService;

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

}
