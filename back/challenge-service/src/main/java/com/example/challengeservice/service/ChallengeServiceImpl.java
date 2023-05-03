package com.example.challengeservice.service;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.challengeservice.dto.response.OriginChallengeResponseDto;
import com.example.challengeservice.entity.challenge.Challenge;
import com.example.challengeservice.repository.ChallengeRepository;
import com.example.challengeservice.repository.MemberChallengeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
	private final ChallengeRepository challengeRepository;
	private final MemberChallengeRepository memberChallengeRepository;

	/**
	 * 원본 챌린지들 목록 조회
	 * @return
	 */
	public List<OriginChallengeResponseDto> getOriginChallenges(){
		List<Challenge> challengeList = challengeRepository.findAll();
		List<OriginChallengeResponseDto> originChallengeResponseDtoList=new LinkedList<>();
		for(Challenge challenge:challengeList){
			int joinCount=memberChallengeRepository.countByChallenge(challenge);
			originChallengeResponseDtoList.add(OriginChallengeResponseDto.from(challenge, joinCount));
		}
		return originChallengeResponseDtoList;
	}
}
