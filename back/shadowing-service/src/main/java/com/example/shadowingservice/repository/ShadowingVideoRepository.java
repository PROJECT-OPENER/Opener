package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.shadowingservice.entity.shadowing.ShadowingVideo;

public interface ShadowingVideoRepository extends JpaRepository<ShadowingVideo, Long>,
	ShadowingVideoRepositoryCustom {
	Optional<ShadowingVideo> findByVideoId(Long videoId);

	@Query("select s.videoId from ShadowingVideo s where s.stepId in :stepIdList")
	List<Long> findByStepIdIn(@Param("stepIdList") List<Long> stepIdList);

	@Query("select s from ShadowingVideo s")
	List<ShadowingVideo> findRecommendation(Pageable pageable);

	@Query("SELECT s.videoId FROM ShadowingVideo s")
	List<Long> findAllVideoIds();

	@Query("SELECT COUNT(s) FROM ShadowingVideo s")
	int countAllRecords();

}
