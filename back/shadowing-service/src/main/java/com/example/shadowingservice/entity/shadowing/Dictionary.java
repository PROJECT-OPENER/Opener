package com.example.shadowingservice.entity.shadowing;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "dictionary")
public class Dictionary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long dictionaryId;
	private String word;
	private String meaning;
	private String wordType;
	private String level;

}
