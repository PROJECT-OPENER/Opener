package com.example.shadowingservice.repository;

import static com.example.shadowingservice.entity.shadowing.QBookmark.*;
import static com.example.shadowingservice.entity.shadowing.QShadowingStatus.*;
import static com.example.shadowingservice.entity.shadowing.QShadowingVideo.*;
import static com.example.shadowingservice.entity.shadowing.QStep.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.common.exception.ApiException;
import com.example.shadowingservice.common.exception.ExceptionEnum;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;

import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.entity.shadowing.ShadowingStatus;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ShadowingVideoRepositoryCustomImpl implements ShadowingVideoRepositoryCustom {
	private final JPAQueryFactory queryFactory;

	private final EntityManager em;

	/**
	 * [우승 ❤ 😁 💋] 해당 유저의 학습 데이터와 북마크 데이터가 있는지 확인하고
	 * 학습 데이터가 없으면 생성, 북마크가 없으면 isMarked에 false처리
	 *
	 * @param videoId
	 * @param memberId
	 * @return
	 */
	@Override
	@Transactional
	public Optional<LoginShadowingDetailDto> getLoginShadowingDetailDto(Long videoId, Long memberId) {

		Tuple result = queryFactory
			.select(
				shadowingVideo.videoUrl,
				shadowingVideo.startTime,
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
			.where(shadowingVideo.videoId.eq(videoId))
			.fetchFirst();

		int repeatCount = 0;
		boolean isMarked = false;

		if(result == null) {
			throw new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION);
		}

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

		return Optional.of(new LoginShadowingDetailDto(
			result.get(shadowingVideo.videoUrl),
			result.get(shadowingVideo.startTime),
			result.get(shadowingVideo.endTime),
			result.get(shadowingVideo.engCaption),
			result.get(shadowingVideo.korCaption),
			repeatCount,
			isMarked
		));
	}

	@Override
	public List<RoadMapResponseDto> getThemeRoadMapResponseDtoList(List<Long> stepIdList) {

		Expression<String> idString = new CaseBuilder()
			.when(step.stepTheme.eq(1)).then("아이브")
			.when(step.stepTheme.eq(2)).then("뉴진스")
			.when(step.stepTheme.eq(3)).then("엔믹스")
			.when(step.stepTheme.eq(4)).then("블랙핑크")
			.otherwise("누구세요?");

		return queryFactory.select(Projections.constructor(RoadMapResponseDto.class,
				shadowingVideo.videoId,
				shadowingVideo.engSentence,
				shadowingVideo.korSentence,
				idString,
				step.sentenceNo
				)
			)
			.from(shadowingVideo)
			.join(step)
			.on(shadowingVideo.stepId.eq(step.stepId))
			.where(shadowingVideo.stepId.in(stepIdList))
			.fetch();

	}

	@Override
	public List<RoadMapResponseDto> getMainRoadMapResponseDtoList() {

		return queryFactory.select(Projections.constructor(RoadMapResponseDto.class,
					shadowingVideo.videoId,
					shadowingVideo.engSentence,
					shadowingVideo.korSentence,
					Expressions.cases()
						.when(step.stepTheme.eq(1)).then("아이브")
						.otherwise("Unknown"),
					step.sentenceNo
				)
			)
			.from(shadowingVideo)
			.leftJoin(step)
			.on(shadowingVideo.stepId.eq(step.stepId))
			.where(step.stepNo.eq(1).and(step.stepTheme.eq(1)))
			.fetch();
	}



	@Override
	public List<ShadowingCategoryDto> getCategoryDotoList(List<Long> videoIdList, Pageable pageable) {
		BooleanExpression inVideoIdList = shadowingVideo.videoId.in(videoIdList);

		return queryFactory.select(Projections.constructor(ShadowingCategoryDto.class,
				shadowingVideo.videoId,
				shadowingVideo.thumbnailUrl,
				shadowingVideo.engSentence,
				shadowingVideo.korSentence)
			)
			.from(shadowingVideo)
			.where(inVideoIdList)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(shadowingVideo.videoId.asc())
			.fetch();

	}

}
