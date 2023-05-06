package com.example.shadowingservice.repository;

import static com.example.shadowingservice.entity.QBookmark.*;
import static com.example.shadowingservice.entity.QShadowingStatus.*;
import static com.example.shadowingservice.entity.QShadowingVideo.*;
import static com.example.shadowingservice.entity.QStep.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;

import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.entity.ShadowingStatus;
import com.example.shadowingservice.entity.ShadowingVideo;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ShadowingVideoRepositoryCustomImpl implements ShadowingVideoRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	private final EntityManager em;

	/**
	 * 해당 유저의 학습 데이터와 북마크 데이터가 있는지 확인하고
	 * 학습 데이터가 없으면 생성, 북마크가 없으면 isMarked에 false처리
	 * @param videoId
	 * @param memberId
	 * @return
	 */
	@Override
	@Transactional
	public LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId) {

		Tuple result = queryFactory
			.select(shadowingVideo.startTime,
				shadowingVideo.endTime,
				shadowingVideo.engCaption,
				shadowingVideo.korCaption,
				shadowingStatus.repeatCount,
				bookmark.isMarked
			)
			.from(shadowingVideo)
			.leftJoin(shadowingStatus)
			.on(shadowingVideo.videoId
				.eq(shadowingStatus.shadowingVideo.videoId)
				.and(shadowingStatus.memberId.eq(memberId)))
			.leftJoin(bookmark)
			.on(bookmark.memberId
				.eq(memberId).and(shadowingVideo.videoId
					.eq(bookmark.shadowingVideo.videoId)))
			.fetchFirst();

		int repeatCount = 0;
		boolean isMarked = false;

		if (result.get(shadowingStatus.repeatCount) == null) {
			ShadowingVideo video = em.find(ShadowingVideo.class, videoId);
			ShadowingStatus status = new ShadowingStatus(
				memberId,
				video,
				0,
				LocalDate.now()
			);
			em.persist(status);
			em.flush();
		} else {
			repeatCount = result.get(shadowingStatus.repeatCount);
		}

		if (result.get(bookmark.isMarked) != null) {
			isMarked = true;
		}

		return new LoginShadowingDetailDto(
			result.get(shadowingVideo.startTime),
			result.get(shadowingVideo.endTime),
			result.get(shadowingVideo.engCaption),
			result.get(shadowingVideo.korCaption),
			repeatCount,
			isMarked
		);
	}

	@Override
	public List<RoadMapResponseDto> getRoadMapResponseDtoList() {

		return queryFactory
			.select(Projections.constructor(RoadMapResponseDto.class,
					shadowingVideo.videoId,
					shadowingVideo.engSentence,
					shadowingVideo.korSentence,
					Expressions.cases()
						.when(step.stepTheme.eq(1)).then("아이브")
						.when(step.stepTheme.eq(2)).then("뉴진스")
						.otherwise("Unknown"),
					step.sentenceNo
				)
			)
			.from(shadowingVideo)
			.leftJoin(step)
			.on(shadowingVideo.Step.stepId.eq(step.stepId))
			.where(step.stepNo.eq(1).and(step.stepTheme.eq(1)))
			.fetch();
	}



}
