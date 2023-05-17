package com.example.memberservice.repository;

import static com.example.memberservice.entity.member.QMemberInterest.*;

import com.example.memberservice.entity.member.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberInterestRepositoryImpl implements MemberInterestRepositoryCustom{
	private final JPAQueryFactory queryFactory;

	/**
	 * 김윤미
	 * explain : 사용자의 관심사 개수를 조회
	 * @param member : 사용자 정보
	 * @return : 사용자의 관심사 개수
	 */
	@Override
	public int countDistinctInterestIdsByMember(Member member) {
		return Math.toIntExact(queryFactory.selectDistinct(memberInterest.interest.interestId)
			.from(memberInterest)
			.where(memberInterest.member.memberId.eq(member.getMemberId()))
			.fetchFirst());
	}
}
