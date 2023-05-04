package com.example.challengeservice.service;

import java.util.List;

import com.example.challengeservice.dto.response.OriginalChallengeResponseDto;
import com.example.challengeservice.dto.response.SelectOriginalResponseDto;

public interface ChallengeService {
	/** 원본 영상 정보 조회 **/
	List<OriginalChallengeResponseDto> getOriginalChallenges();
	/** 원본 챌린지 선택 조회 **/
	SelectOriginalResponseDto selectOriginalChallenge(Long challengeId);
}
