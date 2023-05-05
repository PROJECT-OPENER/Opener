package com.example.challengeservice.controller.challenge;

import com.example.challengeservice.dto.BaseResponseDto;
import com.example.challengeservice.dto.request.MemberChallengeRequestDto;
import com.example.challengeservice.service.ChallengeService;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthChallengeController {
    private final ChallengeService challengeService;

    @PostMapping("/challenges/{challengeId}/member-challenge")
    public ResponseEntity<BaseResponseDto> createMemberChallenge(@PathVariable Long challengeId, @ModelAttribute MemberChallengeRequestDto memberChallengeRequestDto)
            throws IOException, FirebaseAuthException {
        challengeService.createMemberChallenge(challengeId, memberChallengeRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "나의 영상 등록 완료"));
    }

    /**
     * 신대득
     * explain : 회원 챌린지 선택 삭제
     */
    @DeleteMapping("/member-challenges/{member-challenge-id}")
    public ResponseEntity<BaseResponseDto> deleteMemberChallenge(@PathVariable Long memberChallengeId){
        challengeService.deleteMemberChallenge(memberChallengeId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<>(200, "나의 영상 삭제 완료"));
    }

}