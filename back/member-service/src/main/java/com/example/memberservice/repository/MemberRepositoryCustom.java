package com.example.memberservice.repository;

public interface MemberRepositoryCustom {
	int countDistinctInterestIdsByMemberId(Long memberId);
}
