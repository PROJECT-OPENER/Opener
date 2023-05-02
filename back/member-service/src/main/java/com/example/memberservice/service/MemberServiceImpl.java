package com.example.memberservice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	@Override
	@Transactional
	public void checkEmail(String email) {
		if (memberRepository.existsByEmail(email)) {
			throw new ApiException(ExceptionEnum.EMAIL_EXIST_EXCEPTION);
		}
	}

	@Override
	@Transactional
	public void checkNickname(String nickname) {
		if (memberRepository.existsByNickname(nickname)) {
			throw new ApiException(ExceptionEnum.NICKNAME_EXIST_EXCEPTION);
		}
	}
}
