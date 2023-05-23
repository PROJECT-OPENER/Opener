package com.example.shadowingservice.common;

import java.util.HashMap;

public class StepMap {
	private static StepMap instance;
	private HashMap<Integer, String> hashMap;

	private StepMap() {
		hashMap = new HashMap<>();

		// 여기서 초기값을 설정합니다.
		hashMap.put(1, "처음 만났을 때");
		hashMap.put(2, "오랜만에 만났을 때");
		hashMap.put(3, "인사 대답하기");
		hashMap.put(4, "작별인사하기");
		hashMap.put(5, "자기소개하기");
		hashMap.put(6, "감정표현하기");
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