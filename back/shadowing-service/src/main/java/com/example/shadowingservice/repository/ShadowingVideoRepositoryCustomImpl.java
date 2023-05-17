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
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;

import com.example.shadowingservice.common.exception.ApiException;
import com.example.shadowingservice.common.exception.ExceptionEnum;
import com.example.shadowingservice.dto.response.AuthRoadMapResponseDto;
import com.example.shadowingservice.dto.response.AuthShadowingCategoryDto;
import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;

import com.example.shadowingservice.dto.response.RoadMapResponseDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.entity.member.Member;
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
	 * 이우승
	 * explain : 로그인 쉐도잉 영상 조회
	 * 사용자의 학습데이터가 없다면 자동으로 테이블에 등록
	 * @param videoId
	 * @param member
	 * @return
	 */
	@Override
	@Transactional
	public Optional<LoginShadowingDetailDto> getLoginShadowingDetailDto(Long videoId, Member member) {

		Tuple result = queryFactory
			.select(
				shadowingVideo.videoUrl,
				shadowingVideo.startTime,
				shadowingVideo.endTime,
				shadowingVideo.engCaption,
				shadowingVideo.korCaption,
				shadowingStatus.repeatCount,
				bookmark.memberId
			)
			.from(shadowingVideo)
			.leftJoin(shadowingStatus)
			.on(shadowingVideo.videoId
				.eq(shadowingStatus.shadowingVideo.videoId)
				.and(shadowingStatus.member.memberId.eq(member.getMemberId())))
			.leftJoin(bookmark)
			.on(bookmark.memberId
				.eq(member.getMemberId()).and(shadowingVideo.videoId
					.eq(bookmark.shadowingVideo.videoId)))
			.where(shadowingVideo.videoId.eq(videoId))
			.fetchFirst();

		int repeatCount = 0;
		boolean isMarked = false;

		if (result == null) {
			throw new ApiException(ExceptionEnum.SHADOWING_NOT_FOUND_EXCEPTION);
		}

		if (result.get(shadowingStatus.repeatCount) == null) {
			ShadowingVideo video = em.find(ShadowingVideo.class, videoId);
			ShadowingStatus status = ShadowingStatus.builder()
				.member(member)
				.shadowingVideo(video)
				.repeatCount(0)
				.viewCount(0)
				.build();
			em.persist(status);
			em.flush();
		} else {
			repeatCount = result.get(shadowingStatus.repeatCount);
		}

		if (result.get(bookmark.memberId) != null) {
			isMarked = true;
		}

		return Optional.of(LoginShadowingDetailDto.builder()
			.videoUrl(result.get(shadowingVideo.videoUrl))
			.start(result.get(shadowingVideo.startTime))
			.end(result.get(shadowingVideo.endTime))
			.engCaption(result.get(shadowingVideo.engCaption))
			.korCaption(result.get(shadowingVideo.korCaption))
			.repeat(repeatCount)
			.isMarked(isMarked)
			.build()
		);
	}

	/**
	 * 이우승
	 * explain : 비로그인 쉐도잉 로드맵 전체 조회
	 *CaseBuilder를 통해서 테이블에 저장되어있는 정수값을 문자열로 변경 후 반환
	 * @param stepIdList
	 * @return
	 */
	@Override
	public List<RoadMapResponseDto> getThemeRoadMapResponseDtoList(List<Long> stepIdList) {

		Expression<String> idString = new CaseBuilder()
			.when(step.stepTheme.eq(1)).then("아이브")
			.when(step.stepTheme.eq(2)).then("뉴진스")
			.when(step.stepTheme.eq(3)).then("엔믹스")
			.when(step.stepTheme.eq(4)).then("블랙핑크")
			.otherwise("");

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

	/**
	 * 이우승
	 * explain : 로그인 쉐도잉 로드맵 전체 목록 조회
	 * @param member
	 * @param stepIdList
	 * @return
	 */
	@Override
	public List<AuthRoadMapResponseDto> getAuthThemeRoadMapResponseDtoList(Member member, List<Long> stepIdList) {
		Expression<String> idString = new CaseBuilder()
			.when(step.stepTheme.eq(1)).then("아이브")
			.when(step.stepTheme.eq(2)).then("뉴진스")
			.when(step.stepTheme.eq(3)).then("엔믹스")
			.when(step.stepTheme.eq(4)).then("블랙핑크")
			.otherwise("");

		return queryFactory.select(Projections.constructor(AuthRoadMapResponseDto.class,
					shadowingVideo.videoId,
					shadowingVideo.engSentence,
					shadowingVideo.korSentence,
					idString,
					step.sentenceNo,
					shadowingStatus.statusDate
				)
			)
			.from(shadowingVideo)
			.join(step)
			.on(shadowingVideo.stepId.eq(step.stepId))
			.leftJoin(shadowingStatus)
			.on(shadowingStatus.member.memberId.eq(member.getMemberId())
				.and(shadowingStatus.shadowingVideo.videoId.eq(shadowingVideo.videoId)))
			.where(shadowingVideo.stepId.in(stepIdList))
			.fetch();
	}

	/**
	 * 이우승
	 * explain : 비로그인 메인 페이지 로드맵
	 * @return
	 */
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

	/**
	 * 이우승
	 * explain : 로그인 메인 로드맵 목록 조회
	 * @param member
	 * @param videoList
	 * @param stepNo
	 * @param stepTheme
	 * @return
	 */
	@Override
	public List<AuthRoadMapResponseDto> getAuthMainRoadMapResponseDtoList
	(Member member, List<Long> videoList, int stepNo, int stepTheme) {

		return queryFactory.select(Projections.constructor(AuthRoadMapResponseDto.class,
					shadowingVideo.videoId,
					shadowingVideo.engSentence,
					shadowingVideo.korSentence,
					Expressions.cases()
						.when(step.stepTheme.eq(1)).then("아이브")
						.when(step.stepTheme.eq(2)).then("뉴진스")
						.when(step.stepTheme.eq(3)).then("엔믹스")
						.when(step.stepTheme.eq(4)).then("블랙핑크")
						.otherwise("Unknown"),
					step.sentenceNo,
					shadowingStatus.statusDate
				)
			)
			.from(shadowingVideo)
			.leftJoin(step)
			.on(shadowingVideo.stepId.eq(step.stepId))
			.leftJoin(shadowingStatus)
			.on(shadowingStatus.shadowingVideo.videoId.eq(shadowingVideo.videoId)
				.and(shadowingStatus.member.memberId.eq(member.getMemberId()).and(shadowingStatus.shadowingVideo.videoId.in(videoList))))
			.where(step.stepNo.eq(stepNo).and(step.stepTheme.eq(stepTheme)))
			.groupBy(shadowingVideo.videoId, shadowingVideo.engSentence, shadowingVideo.korSentence,
				step.stepTheme, step.sentenceNo, shadowingStatus.statusDate)
			.fetch();
	}

	/**
	 * 이우승
	 * explain : 비로그인 카테고리 별 쉐도잉 영상 목록 조회
	 * @param videoIdList
	 * @param pageable
	 * @return
	 */
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

	/**
	 * 이우승
	 * explain : 로그인 카테고리 별 쉐도잉 영상 목록 조회
	 * @param member
	 * @param videoIdList
	 * @param pageable
	 * @return
	 */

	@Override
	public List<AuthShadowingCategoryDto> getAuthCategoryDtoList(Member member, List<Long> videoIdList,
		Pageable pageable) {

		BooleanExpression inVideoIdList = shadowingVideo.videoId.in(videoIdList);

		return queryFactory
			.select(
				shadowingVideo.videoId,
				shadowingVideo.thumbnailUrl,
				shadowingVideo.engSentence,
				shadowingVideo.korSentence,
				bookmark.memberId
			)
			.from(shadowingVideo)
			.leftJoin(bookmark)
			.on(bookmark.shadowingVideo.videoId.eq(shadowingVideo.videoId).and(bookmark.memberId.eq(member.getMemberId())))
			.where(inVideoIdList)
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(shadowingVideo.videoId.asc())
			.fetch()
			.stream()
			.map(tuple -> new AuthShadowingCategoryDto(
				tuple.get(shadowingVideo.videoId),
				tuple.get(shadowingVideo.thumbnailUrl),
				tuple.get(shadowingVideo.engSentence),
				tuple.get(shadowingVideo.korSentence),
				tuple.get(bookmark.memberId) != null
			))
			.collect(Collectors.toList());
	}
}
