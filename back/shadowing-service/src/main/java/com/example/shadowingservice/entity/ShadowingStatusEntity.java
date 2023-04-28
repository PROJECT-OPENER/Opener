package com.example.shadowingservice.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class ShadowingStatusEntity implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long statusId;
	@Column(nullable = false, unique = true)
	private Long memberId;
	@ManyToOne
	@JoinColumn(name = "video_id", nullable = false)
	private ShadowingVideoEntity shadowingVideoEntity;
	private int repeat_count;
	private LocalDate statusDate;
}
