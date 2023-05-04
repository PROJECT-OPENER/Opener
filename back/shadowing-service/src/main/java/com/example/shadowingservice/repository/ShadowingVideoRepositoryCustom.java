package com.example.shadowingservice.repository;

import com.example.shadowingservice.dto.response.LoginShadowingDetailDto;

public interface ShadowingVideoRepositoryCustom {
	LoginShadowingDetailDto getLoginShadowingDetailDto(Long videoId, Long memberId);

}
