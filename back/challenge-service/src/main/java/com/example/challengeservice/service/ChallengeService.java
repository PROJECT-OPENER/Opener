package com.example.challengeservice.service;

import java.util.List;

import com.example.challengeservice.dto.response.OriginChallengeResponseDto;

public interface ChallengeService {
	List<OriginChallengeResponseDto> getOriginChallenges();
}
