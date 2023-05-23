package com.example.memberservice.repository;

import java.util.List;

import com.example.memberservice.dto.response.member.RankResponseDto;

public interface MemberRepositoryCustom {

	List<RankResponseDto> getRankingList();
}
