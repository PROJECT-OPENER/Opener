package com.example.chattingservice.repository;

import com.example.chattingservice.entity.Keyword;

public interface KeywordRepositoryCustom {
	/** 랜덤 제시어 얻기 **/
	Keyword findKeyword();
}
