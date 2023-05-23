package com.example.chattingservice.dto.response;

import com.example.chattingservice.entity.Interest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterestResponseDto {
	private Long interestId;
	private String interest;

	public InterestResponseDto(Interest interest) {
		this.interestId = interest.getInterestId();
		this.interest = interest.getInterest();
	}
}

