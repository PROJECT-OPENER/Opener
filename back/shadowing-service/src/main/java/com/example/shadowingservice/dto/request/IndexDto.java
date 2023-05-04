package com.example.shadowingservice.dto.request;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IndexDto {

	private int startIndex;
	private int endIndex;

	public Pageable toPageable() {
		// 페이지 번호는 0부터 시작하므로, 시작 인덱스를 페이지 크기로 나눈 몫을 사용합니다.
		int page = startIndex / (endIndex - startIndex);
		// 페이지 크기는 endIndex와 startIndex의 차이입니다.
		int size = endIndex - startIndex;
		return PageRequest.of(page, size);
	}

}
