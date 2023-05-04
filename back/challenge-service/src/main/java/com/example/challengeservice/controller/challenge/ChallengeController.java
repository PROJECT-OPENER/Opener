package com.example.challengeservice.controller.challenge;

import java.util.List;

import com.example.challengeservice.dto.BaseResponseDto;
import com.example.challengeservice.dto.response.SelectOriginalResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.challengeservice.dto.BaseListResponseDto;
import com.example.challengeservice.dto.response.OriginalChallengeResponseDto;
import com.example.challengeservice.service.ChallengeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("")
public class ChallengeController {
    private final ChallengeService challengeService;

    /**
     * 신대득
     * expalin : 원본 영상 정보 조회
     */
    @GetMapping("/challenges")
    public ResponseEntity<BaseListResponseDto<OriginalChallengeResponseDto>> getOriginalChallenges() {
        List<OriginalChallengeResponseDto> originChallenges = challengeService.getOriginalChallenges();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseListResponseDto<OriginalChallengeResponseDto>(200, "챌린지 리스트 호출 성공", originChallenges));
    }

    /**
     * 신대득
     * explain : 원본 챌린지 선택 조회
     *
     * @param challengeId : 입장
     * @return
     */
    @GetMapping("/challenges/{challengeId}")
    public ResponseEntity<BaseResponseDto<SelectOriginalResponseDto>> selectOriginalChallenge(@PathVariable Long challengeId) {
        SelectOriginalResponseDto selectOriginalResponseDto = challengeService.selectOriginalChallenge(challengeId);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponseDto<SelectOriginalResponseDto>(200, "챌린지 선택 조회 성공", selectOriginalResponseDto));
    }
}
