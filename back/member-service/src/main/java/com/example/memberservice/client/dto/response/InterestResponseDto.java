package com.example.memberservice.client.dto.response;

import com.example.memberservice.entity.shadowing.Interest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterestResponseDto {
	private Long interestId;
	private String interest;

	public Interest toEntity() {
		return Interest.builder()
			.interestId(this.interestId)
			.interest(interest)
			.build();
	}
}
