package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.shadowingservice.entity.shadowing.ShadowingVideo;

public interface ShadowingVideoRepository extends JpaRepository<ShadowingVideo, Long>,
	ShadowingVideoRepositoryCustom {
	Optional<ShadowingVideo> findByVideoId(Long videoId);

	@Query("select s from ShadowingVideo s")
	Optional<List<ShadowingVideo>> findRecommendation(Pageable pageable);

	List<ShadowingVideo> findByVideoIdIn(List<Long> memberIdList, Pageable pagable);

}
