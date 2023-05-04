package com.example.memberservice.repository;

import com.example.memberservice.entity.member.Member;

public interface MemberRepositoryCustom {
	int countDistinctInterestIdsByMember(Member member);
}
