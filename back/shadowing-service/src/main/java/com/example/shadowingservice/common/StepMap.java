package com.example.shadowingservice.common;

import java.util.HashMap;

public class StepMap {
	private static StepMap instance;
	private HashMap<Integer, String> hashMap;

	private StepMap() {
		hashMap = new HashMap<>();

		// 여기서 초기값을 설정합니다.
		hashMap.put(1, "아이브");
		hashMap.put(2, "뉴진스");
		hashMap.put(3, "엔믹스");
		hashMap.put(4, "블랙핑크");
	}

	public static StepMap getInstance() {
		if (instance == null) {
			instance = new StepMap();
		}
		return instance;
	}

	public HashMap<Integer, String> getHashMap() {
		return hashMap;
	}
}