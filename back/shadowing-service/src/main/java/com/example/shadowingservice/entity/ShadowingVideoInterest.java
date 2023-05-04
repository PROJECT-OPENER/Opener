package com.example.shadowingservice.entity;

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
@Table(name = "shadowingvideointerest")
public class ShadowingVideoInterest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ShadowingVideoInterestId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_id", nullable = false)
	private ShadowingVideo shadowingVideo;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "interest_id", nullable = false)
	private Interest interest;

}
