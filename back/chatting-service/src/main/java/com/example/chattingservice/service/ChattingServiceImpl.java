package com.example.chattingservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.chattingservice.common.exception.ApiException;
import com.example.chattingservice.common.exception.ExceptionEnum;
import com.example.chattingservice.dto.response.InterestResponseDto;
import com.example.chattingservice.repository.InterestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {
	private final InterestRepository interestRepository;

	/**
	 * 김윤미
	 * explain : 전체 관심사 조회
	 * @return : 전체 관심사 정보
	 */
	@Override
	@Transactional
	public List<InterestResponseDto> getInterests() {
		List<InterestResponseDto> interests = interestRepository.findAll()
			.stream()
			.map(interest -> new InterestResponseDto(interest))
			.collect(
				Collectors.toList());
		if (interests.isEmpty()) {
			throw new ApiException(ExceptionEnum.INTERESTS_NOT_FOUND_EXCEPTION);
		}
		return interests;
	}
}
