package com.example.shadowingservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.shadowingservice.entity.shadowing.ShadowingVideoInterest;

public interface ShadowingVideoInterestRepository extends JpaRepository<ShadowingVideoInterest, Long> {

	List<ShadowingVideoInterest> findByInterest_InterestId(Long interestId);

	@Query("select s.shadowingVideo.videoId from ShadowingVideoInterest s where s.interest.interestId = :interestId")
	List<Long> findAllVideoId(Long interestId);

	@Query("SELECT COUNT(s.shadowingVideo.videoId) FROM ShadowingVideoInterest s WHERE s.interest.interestId = :interestId")
	int countVideoIdsByInterestId(@Param("interestId") Long interestId);

}
