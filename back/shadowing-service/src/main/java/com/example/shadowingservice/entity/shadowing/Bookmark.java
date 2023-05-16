package com.example.shadowingservice.entity.shadowing;

import java.io.Serializable;

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
import com.example.shadowingservice.entity.shadowing.ShadowingVideo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "bookmark")
public class Bookmark extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookmarkId;
	@Column(nullable = false)
	private Long memberId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "video_id", nullable = false)
	private ShadowingVideo shadowingVideo;
	private boolean isMarked;

	public void updateMarked(boolean isMarked) {
		this.isMarked = isMarked;
	}

}
