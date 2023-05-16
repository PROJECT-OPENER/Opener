package com.example.shadowingservice.entity.shadowing;

import java.io.Serializable;
import java.time.LocalTime;

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
@Table(name = "shadowingvideo")
public class ShadowingVideo extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long videoId;
	private String thumbnailUrl;
	private String videoUrl;
	private LocalTime startTime;
	private LocalTime endTime;
	private Long stepId;
	private String engSentence;
	private String korSentence;
	@Column(columnDefinition = "LONGTEXT")
	private String engCaption;
	@Column(columnDefinition = "LONGTEXT")
	private String korCaption;

	public void updateEngCaption(String engCaption) {
		this.engCaption = engCaption;
	}

	public void updateKorCapation(String korCaption) {
		this.korCaption = korCaption;
	}

}
