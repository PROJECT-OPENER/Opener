package com.example.memberservice.repository;

import com.example.memberservice.entity.member.Member;

public interface MemberInterestRepositoryCustom {
	/** 사용자의 관심사 개수 조회 **/
	int countDistinctInterestIdsByMember(Member member);
}
