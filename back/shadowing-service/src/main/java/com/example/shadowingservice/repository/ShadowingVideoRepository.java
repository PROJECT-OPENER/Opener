package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;

public interface ShadowingVideoRepository extends JpaRepository<ShadowingVideo, Long>,
	ShadowingVideoRepositoryCustom {
	Optional<ShadowingVideo> findByVideoId(Long videoId);

	@Query("select s from ShadowingVideo s")
	List<ShadowingVideo> findRecommendation(Pageable pageable);

	// @Query("select s.videoId, s.thumbnailUrl, s.engSentence, s.korSentence from ShadowingVideo s" )
	// List<ShadowingCategoryDto> findByVideoIdIn(List<Long> videoIdList, Pageable pageable);

}
