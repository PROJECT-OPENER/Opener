package com.example.memberservice.dto;

import com.example.memberservice.entity.shadowing.Interest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterestDto {
	private Long interestId;
	private String interest;

	public InterestDto(Interest interest) {
		this.interestId = interest.getInterestId();
		this.interest = interest.getInterest();
	}
}
