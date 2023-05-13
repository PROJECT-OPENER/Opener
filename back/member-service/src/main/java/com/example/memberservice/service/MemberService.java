package com.example.memberservice.service;

import com.example.memberservice.dto.request.member.LoginRequestDto;
import com.example.memberservice.dto.request.member.MemberInterestsRequestDto;
import com.example.memberservice.dto.request.member.NicknameRequestDto;
import com.example.memberservice.dto.request.member.PasswordRequestDto;
import com.example.memberservice.dto.request.member.ProfileImgRequestDto;
import com.example.memberservice.dto.request.member.SignUpMemberRequestDto;
import com.example.memberservice.dto.request.member.CheckEmailCodeRequestDto;
import com.example.memberservice.dto.response.member.BadgeResponseDto;
import com.example.memberservice.dto.response.member.LoginMemberResponseDto;
import com.example.memberservice.dto.response.member.LoginResponseDto;

public interface MemberService {
	/** 이메일 중복 체크 **/
	void checkEmail(String email);

	/** 닉네임 중복 체크 **/
	void checkNickname(String nickname);

	/** 이메일 인증 코드 전송 **/
	void sendEmailCode(String email);

	/** 이메일 인증 코드 검증 **/
	void checkEmailCode(CheckEmailCodeRequestDto checkEmailCodeRequestDto);

	/** 회원가입 **/
	void signUpMember(SignUpMemberRequestDto signUpMemberRequestDto);

	/** 로그인 **/
	LoginResponseDto login(LoginRequestDto loginRequestDto);

	/** 사용자 최초 관심사 등록 **/
	void createInterests(MemberInterestsRequestDto memberInterestsRequestDto, Long memberId);

	/** 로그아웃 **/
	void logout(String token);

	/** 닉네임 변경 **/
	void updateNickname(Long memberId, NicknameRequestDto nicknameRequestDto);

	/** 비밀번호 변경 **/
	void updatePassword(Long memberId, PasswordRequestDto passwordRequestDto);

	/** 관심사 변경 **/
	void updateMemberInterests(Long memberId, MemberInterestsRequestDto memberInterestsRequestDto);

	/** 프로필 사진 변경 **/
	void updateProfileImg(Long memberId, ProfileImgRequestDto profileImgRequestDto);

	/** 내 정보 조회 **/
	LoginMemberResponseDto getMyInfo(Long memberId);

	/** 내 뱃지 조회 **/
	BadgeResponseDto getBadge(Long memberId);
}
