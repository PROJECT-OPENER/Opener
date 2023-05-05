package com.example.challengeservice.entity.challenge;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.challengeservice.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "challenge")
public class Challenge extends BaseEntity {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "challenge_id")
	private Long challengeId;
	@Column(name = "title")
	private String title;
	@Column(name="challenge_url", length = 1000)
	private String challengeUrl;
	@Column(name="challenge_img", length = 1000)
	private String challengeImg;
	@Column(name="eng_caption", length = 2000)
	private String engCaption;
	@Column(name="kor_capotion", length = 2000)
	private String korCaption;
	@Column(name="caption_time", length = 1000)
	private String captionTime;
}
