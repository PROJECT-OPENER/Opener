package com.example.challengeservice.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import com.example.challengeservice.common.exception.ApiException;
import com.example.challengeservice.common.exception.ExceptionEnum;
import com.example.challengeservice.dto.response.MemberChallengeResponseDto;
import com.example.challengeservice.dto.response.SelectOriginalResponseDto;
import com.example.challengeservice.entity.challenge.MemberChallenge;
import com.example.challengeservice.repository.LoveRepository;
import org.springframework.stereotype.Service;

import com.example.challengeservice.dto.response.OriginalChallengeResponseDto;
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
    private final LoveRepository loveRepository;

    /**
     * 신대득
     * explain : 원본 챌린지들 목록 조회
     */
    @Override
    public List<OriginalChallengeResponseDto> getOriginalChallenges() {
        List<Challenge> challengeList = challengeRepository.findAll();
        if (challengeList.isEmpty()) {
            throw new ApiException(ExceptionEnum.CHALLENGES_NOT_FOUND_EXCEPTION);
        }
        List<OriginalChallengeResponseDto> originChallengeResponseDtoList = new LinkedList<>();
        for (Challenge challenge : challengeList) {
            int joinCount = memberChallengeRepository.countByChallenge(challenge);
            originChallengeResponseDtoList.add(OriginalChallengeResponseDto.from(challenge, joinCount));
        }
        return originChallengeResponseDtoList;
    }

    /**
     * 신대득
     * explain : 원본 영상 정보 조회
     */
    public OriginalChallengeResponseDto getOriginalChallengeInfo(Long challengeId) {
        Challenge challenge = challengeRepository.findByChallengeId(challengeId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));

        int joinCount = memberChallengeRepository.countByChallenge(challenge);
        return OriginalChallengeResponseDto.from(challenge, joinCount);
    }

    /**
     * 신대득
     * explain : 원본 챌린지 선택 조회
     *
     * @param challengeId : 원본 챌린지의 Id
     */
    @Override
    public SelectOriginalResponseDto selectOriginalChallenge(Long challengeId) {
        OriginalChallengeResponseDto originalChallengeResponseDto = getOriginalChallengeInfo(challengeId);
        LinkedList<MemberChallengeResponseDto> memberChallengeResponseDtoList = new LinkedList<>();
        List<MemberChallenge> memberChallenges = memberChallengeRepository.findAllByChallengeId(challengeId);
        for (MemberChallenge memberChallenge : memberChallenges) {
            int likeCount = loveRepository.countByMemberChallenge(memberChallenge);
            MemberChallengeResponseDto memberChallengeResponseDto = MemberChallengeResponseDto.from(memberChallenge, likeCount);
            memberChallengeResponseDtoList.add(memberChallengeResponseDto);
        }
        // 좋아요 순으로 정렬
        Collections.sort(memberChallengeResponseDtoList, new Comparator<MemberChallengeResponseDto>() {
            @Override
            public int compare(MemberChallengeResponseDto o1, MemberChallengeResponseDto o2) {
                return o1.getLikeCount() - o2.getLikeCount();
            }
        });
        return SelectOriginalResponseDto.from(originalChallengeResponseDto, memberChallenges.size(), memberChallengeResponseDtoList);
    }
}
