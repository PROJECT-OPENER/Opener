package com.example.shadowingservice.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shadowingservice.dto.response.RecommendationDto;
import com.example.shadowingservice.dto.response.ShadowingCategoryDto;
import com.example.shadowingservice.entity.ShadowingVideo;

public interface ShadowingVideoRepository extends JpaRepository<ShadowingVideo, Long>,
	ShadowingVideoRepositoryCustom {
	ShadowingVideo findByVideoId(Long videoId);

	@Query("select s from ShadowingVideo s")
	List<ShadowingVideo> findRecommendation(Pageable pageable);

	List<ShadowingVideo> findByVideoIdIn(List<Long> memberIdList, Pageable pagable);

}
