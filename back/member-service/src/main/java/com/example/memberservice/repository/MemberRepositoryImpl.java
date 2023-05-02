package com.example.memberservice.repository;

import static com.example.memberservice.entity.member.QMemberInterest.memberInterest;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	@Override
	public int countDistinctInterestIdsByMemberId(Long memberId) {
		return Math.toIntExact(queryFactory.selectDistinct(memberInterest.interestId)
			.from(memberInterest)
			.where(memberInterest.member.memberId.eq(memberId))
			.fetchFirst());
	}
}
