package com.example.memberservice.dto.response.member;

import com.example.memberservice.dto.BadgeDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BadgeResponseDto {
	private BadgeDto attendanceBadge;
	private BadgeDto shadowingBadge;
	private BadgeDto challengeBadge;
	private BadgeDto gameBadge;
}
