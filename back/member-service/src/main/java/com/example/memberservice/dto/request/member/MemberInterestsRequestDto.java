package com.example.memberservice.dto.request.member;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberInterestsRequestDto {
	@JsonProperty(value = "data")
	private Set<Long> interests;
}
