package com.example.chattingservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chattingservice.dto.BaseListResponseDto;
import com.example.chattingservice.dto.response.InterestResponseDto;
import com.example.chattingservice.service.ChattingServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/interests")
public class InterestController {

	private final ChattingServiceImpl chattingService;

	/**
	 * 김윤미
	 * explain : 전체 관심사 조회
	 * @return
	 */
	@GetMapping
	public ResponseEntity<BaseListResponseDto<InterestResponseDto>> getInterests() {
		return ResponseEntity.status(HttpStatus.OK)
			.body(new BaseListResponseDto<InterestResponseDto>(200, "관심사를 불러오는 데 성공했습니다.",
				chattingService.getInterests()));
	}

}
