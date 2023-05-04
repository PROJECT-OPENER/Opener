package com.example.shadowingservice.entity;

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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "shadowingstatus")
public class ShadowingStatus implements Serializable {

	public ShadowingStatus(Long memberId, ShadowingVideo shadowingVideo, int repeatCount,
		LocalDate statusDate) {
		this.memberId = memberId;
		this.shadowingVideo = shadowingVideo;
		this.repeatCount = repeatCount;
		this.statusDate = statusDate;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long statusId;
	@Column(nullable = false, unique = true)
	private Long memberId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_id", nullable = false)
	private ShadowingVideo shadowingVideo;
	private int repeatCount;
	private LocalDate statusDate;
}
