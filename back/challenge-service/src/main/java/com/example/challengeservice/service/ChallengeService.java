package com.example.challengeservice.service;

import java.io.IOException;
import java.util.List;

import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.dto.request.OriginalChallengeRequestDto;
import com.example.challengeservice.dto.response.*;
import com.google.firebase.auth.FirebaseAuthException;

public interface ChallengeService {
    /** 챌린지 영상 등록 **/
    void createOriginalChallenge(OriginalChallengeRequestDto originalChallengeRequestDto);
    /** 원본 영상 정보 조회 **/
    List<OriginalChallengeResponseDto> getOriginalChallenges();
    /** 원본 챌린지 선택 조회 **/
    SelectOriginalResponseDto selectOriginalChallenge(Long challengeId, Integer startIndex, Integer endIndex);
    /** 원본 챌린지 영상 보기 **/
    WatchOriginalChallengeResponseDto watchOriginalChallenge(Long challengeId);
    /** 멤버 챌린지 영상 보기 **/
    WatchMemberChallengeResponseDto watchMemberChallenge(Long memberChallengeId, String memberId);
    /** 카테고리로 멤버 챌린지 영상 조회 **/
    MemberChallengeListResponseDto categoryMemberChallenge(String category, Integer startIndex, Integer endIndex);
    /** 멤버 챌린지 영상 등록 **/
    void createMemberChallenge(Long challengeId, MemberChallengeRequestDto memberChallengeRequestDto, Long memberId)
            throws IOException, FirebaseAuthException;
    /** 멤버 챌린지 영상 삭제 **/
    void deleteMemberChallenge(Long memberChallengeId);
    /** 멤버 챌린지 영상 좋아요 등록 **/
    void createLike(Long memberChallengeId, Long memberId);
    /** 멤버 챌린지 영상 좋아요 해제 **/
    void deleteLike(Long memberChallengeId, Long memberId);
    /** 내가 참여중인 멤버 챌린지 조회 **/
    List<MemberChallengeResponseDto> getMyChallenges(Long memberId);
}
