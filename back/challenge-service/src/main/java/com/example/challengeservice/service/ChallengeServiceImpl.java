package com.example.challengeservice.service;

import java.io.IOException;
import java.util.*;

import com.example.challengeservice.common.exception.ApiException;
import com.example.challengeservice.common.exception.ExceptionEnum;
import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.dto.response.MemberChallengeResponseDto;
import com.example.challengeservice.dto.response.SelectOriginalResponseDto;
import com.example.challengeservice.entity.challenge.MemberChallenge;
import com.example.challengeservice.entity.member.Member;
import com.example.challengeservice.repository.LoveRepository;
import com.example.challengeservice.repository.MemberRepository;
import com.google.firebase.auth.FirebaseAuthException;
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
    private final MemberRepository memberRepository;
    private final FireBaseService fireBaseService;

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
    public SelectOriginalResponseDto selectOriginalChallenge(Long challengeId, Integer startIndex, Integer endIndex) {
        OriginalChallengeResponseDto originalChallengeResponseDto = getOriginalChallengeInfo(challengeId);
        List<MemberChallengeResponseDto> memberChallengeResponseDtoList = new ArrayList<>();
        List<MemberChallenge> memberChallenges = memberChallengeRepository.findAllByChallengeId(challengeId);
        for (MemberChallenge memberChallenge : memberChallenges) {
            int likeCount = loveRepository.countByMemberChallenge(memberChallenge);
            MemberChallengeResponseDto memberChallengeResponseDto = MemberChallengeResponseDto.from(memberChallenge, likeCount);
            memberChallengeResponseDtoList.add(memberChallengeResponseDto);
        }
        // 좋아요 순으로 내림차순 정렬
        Collections.sort(memberChallengeResponseDtoList, new Comparator<MemberChallengeResponseDto>() {
            @Override
            public int compare(MemberChallengeResponseDto o1, MemberChallengeResponseDto o2) {
                return o2.getLikeCount() - o1.getLikeCount();
            }
        });
        return SelectOriginalResponseDto.from(originalChallengeResponseDto, memberChallenges.size(), memberChallengeResponseDtoList.subList(startIndex, endIndex));
    }

    /**
     * 신대득
     * explain : 멤버 챌린지 영상 등록
     *
     * @param challengeId : 선택한 챌린지Id
     */
    @Override
    public void createMemberChallenge(Long challengeId, MemberChallengeRequestDto memberChallengeRequestDto) throws
            IOException, FirebaseAuthException {
        Challenge challenge = challengeRepository.findByChallengeId(challengeId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.CHALLENGE_NOT_FOUND_EXCEPTION));
        // Todo : 하드코딩 바꿔야할 부분
        Member member = memberRepository.findByMemberId(1L)
                .orElseThrow(() -> new ApiException(ExceptionEnum.WRONG_MEMBER_EXCEPTION));
        int myCount = memberChallengeRepository.countByChallenge_ChallengeIdAndMember_MemberId(challengeId, member.getMemberId()) + 1;
        String fileName = challenge.getTitle() + "_" + memberChallengeRequestDto.getNickName() + myCount;
//        if (memberChallengeRepository.findByChallenge_ChallengeIdAndMember_MemberId(challengeId, member.getMemberId()).isPresent()) {
//            throw new ApiException(ExceptionEnum.MEMBER_CHALLENGE_EXIST_EXCEPTION);
//        }
        if (memberChallengeRequestDto.getMemberChallengeFile().isEmpty()) {
            throw new ApiException(ExceptionEnum.FILE_NOT_FOUND_EXCEPTION);
        }
        if (memberChallengeRequestDto.getMemberChallengeImg().isEmpty()) {
            throw new ApiException(ExceptionEnum.IMG_NOT_FOUND_EXCEPTION);
        }
        String fileUrl = fireBaseService.uploadFiles(memberChallengeRequestDto.getMemberChallengeFile(), fileName + "_file");
        String imgUrl = fireBaseService.uploadFiles(memberChallengeRequestDto.getMemberChallengeImg(), fileName + "_img");
        memberChallengeRepository.save(MemberChallenge.from(challenge, member, imgUrl, fileUrl));
    }
}
