package com.example.memberservice.repository;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Value;

import com.example.memberservice.dto.response.member.RankResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
	private final EntityManager em;

	@Value("${spring.img.baseurl}")
	private String baseImgUrl;

	public List<RankResponseDto> getRankingList() {
		List<Object[]> result = em.createNativeQuery(
				"SELECT nickname, profile, score, RANK() OVER (ORDER BY score DESC) as `rank` " +
					"FROM member " +
					"ORDER BY score DESC " +
					"LIMIT 10")
			.getResultList();

		return result.stream()
			.map(record -> RankResponseDto.builder()
				.nickname((String)record[0])
				.profile(record[1] == null ? baseImgUrl : (String) record[1])
				.score(((Number)record[2]).intValue())
				.rank(((Number)record[3]).intValue())
				.build())
			.collect(Collectors.toList());
	}

}
