package com.example.shadowingservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.shadowing.ShadowingStatus;
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;

public interface ShadowingStatusRepository extends JpaRepository<ShadowingStatus, Long> {
	Optional<ShadowingVideo> findByShadowingVideo_VideoId(Long videoId);

}
