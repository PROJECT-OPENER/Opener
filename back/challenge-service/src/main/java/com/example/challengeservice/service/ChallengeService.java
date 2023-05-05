package com.example.challengeservice.service;

import java.io.IOException;
import java.util.List;

import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.dto.response.OriginalChallengeResponseDto;
import com.example.challengeservice.dto.response.SelectOriginalResponseDto;
import com.google.firebase.auth.FirebaseAuthException;

public interface ChallengeService {
    /** 원본 영상 정보 조회 **/
    List<OriginalChallengeResponseDto> getOriginalChallenges();
    /** 원본 챌린지 선택 조회 **/
    SelectOriginalResponseDto selectOriginalChallenge(Long challengeId, Integer startIndex, Integer endIndex);
    /** 멤버 챌린지 영상 등록 **/
    void createMemberChallenge(Long challengeId, MemberChallengeRequestDto memberChallengeRequestDto)
            throws IOException, FirebaseAuthException;
    /** 멤버 챌린지 영상 삭제 **/
    void deleteMemberChallenge(Long memberChallengeId);
}
