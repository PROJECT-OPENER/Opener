package com.example.shadowingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.shadowingservice.entity.shadowing.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	Optional<Bookmark> findByMemberIdAndShadowingVideo_VideoId(Long memberId, Long videoId);
	@Query("SELECT COUNT(s.shadowingVideo.videoId) FROM ShadowingVideoInterest s WHERE s.interest.interestId = :interestId")
	int countVideoIdsByInterestId(@Param("interestId") Long interestId);
	@Query("SELECT COUNT (*) FROM Bookmark b WHERE b.memberId = :memberId")
	int countMemberId(Long memberId);
	@Query("SELECT b.shadowingVideo.videoId FROM Bookmark b WHERE b.memberId = :memberId")
	List<Long> findBookmarkVideoIdList(Long memberId);

}
