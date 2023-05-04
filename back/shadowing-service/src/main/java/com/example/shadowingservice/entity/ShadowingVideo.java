package com.example.shadowingservice.entity;

import java.io.Serializable;
import java.time.LocalTime;

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
@Table(name = "shadowingvideo")
public class ShadowingVideo implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long videoId;
	private String thumbnailUrl;
	private String videoUrl;
	private LocalTime startTime;
	private LocalTime endTime;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "step_id", nullable = false)
	private Step Step;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "interest_id", nullable = false)
	private Interest interest;
	private String engSentence;
	private String korSentence;
	private String engCaption;
	private String korCaption;

}
