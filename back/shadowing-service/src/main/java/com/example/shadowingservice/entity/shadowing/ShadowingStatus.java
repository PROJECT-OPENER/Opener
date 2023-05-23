package com.example.shadowingservice.entity.shadowing;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.shadowingservice.entity.BaseEntity;
import com.example.shadowingservice.entity.member.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "shadowingstatus")
public class ShadowingStatus extends BaseEntity {

	public ShadowingStatus(Member member, ShadowingVideo shadowingVideo, int repeatCount,
		LocalDate statusDate) {
		this.member = member;
		this.shadowingVideo = shadowingVideo;
		this.repeatCount = repeatCount;
		this.statusDate = statusDate;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long statusId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_id", nullable = false)
	private ShadowingVideo shadowingVideo;
	private int repeatCount;
	private LocalDate statusDate;
	private int viewCount;

	public void updateRepeatCount(int repeatCount) {
		this.repeatCount = repeatCount;
	}

	public void updateViewCount(int viewCount) {
		this.viewCount = viewCount;
	}

	public void updateStatusDate(LocalDate statusDate) {
		this.statusDate = statusDate;
	}

}
