package com.example.shadowingservice.dto.response;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.shadowingservice.entity.Interest;
import com.example.shadowingservice.entity.ShadowingVideo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShadowingVideoInterestDto {

	private Long shadowingVideoInterestId;

	private Long shadowingVideoId;

	private Long interestId;

}
