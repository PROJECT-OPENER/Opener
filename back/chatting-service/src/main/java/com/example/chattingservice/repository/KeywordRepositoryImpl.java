package com.example.chattingservice.repository;

import static com.example.chattingservice.entity.QKeyword.*;

import com.example.chattingservice.entity.Keyword;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KeywordRepositoryImpl implements KeywordRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	/**
	 * 김윤미
	 * explain : 랜덤 제시어 조회
	 * @return
	 */
	@Override
	public Keyword findKeyword() {
		return queryFactory.selectFrom(keyword1)
			.orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
			.fetchFirst();
	}
}
