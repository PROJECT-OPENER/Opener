package com.example.shadowingservice.common;

import java.util.HashMap;

public class StepMap {
	private static StepMap instance;
	private HashMap<Integer, String> hashMap;

	private StepMap() {
		hashMap = new HashMap<>();

		// 여기서 초기값을 설정합니다.
		hashMap.put(1, "영화");
		hashMap.put(2, "여행");
		hashMap.put(3, "음악");
		hashMap.put(4, "스포츠");
		hashMap.put(5, "음식");
		hashMap.put(6, "일상");
		hashMap.put(7, "애니메이션");
		hashMap.put(8, "비즈니스");
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