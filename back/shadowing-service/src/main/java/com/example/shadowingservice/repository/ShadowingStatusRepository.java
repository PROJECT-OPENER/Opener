package com.example.shadowingservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.shadowing.ShadowingStatus;

public interface ShadowingStatusRepository extends JpaRepository<ShadowingStatus, Long> {
	Optional<ShadowingStatus> findByShadowingVideo_VideoIdAndMemberId(Long videoId, Long memberId);

}
