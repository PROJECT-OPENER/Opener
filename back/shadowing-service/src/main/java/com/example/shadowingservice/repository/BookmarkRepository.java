package com.example.shadowingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.shadowingservice.entity.shadowing.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	Bookmark findByShadowingVideo_VideoId(Long videoId);
}
