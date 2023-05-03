package com.example.challengeservice.controller.challenge;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.challengeservice.dto.BaseListResponseDto;
import com.example.challengeservice.dto.response.OriginChallengeResponseDto;
import com.example.challengeservice.service.ChallengeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("")
public class ChallengeController {
	private final ChallengeService challengeService;

	@GetMapping("/challenges")
	public ResponseEntity<BaseListResponseDto<OriginChallengeResponseDto>> getOriginChallenges(){
		log.info("start");
		List<OriginChallengeResponseDto> originChallenges = challengeService.getOriginChallenges();
		return ResponseEntity.status(HttpStatus.OK).body(new BaseListResponseDto<OriginChallengeResponseDto>(200, "챌린지 리스트 호출 성공", originChallenges));
	}
}
