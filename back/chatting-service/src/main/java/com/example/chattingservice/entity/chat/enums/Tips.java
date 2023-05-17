package com.example.chattingservice.entity.chat.enums;

import java.util.Arrays;

import com.example.chattingservice.common.exception.ApiException;
import com.example.chattingservice.common.exception.ExceptionEnum;
import com.example.chattingservice.entity.chat.enums.Tip.*;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Tips {
	Movie_TIP_1(Movie.TIP1),
	Movie_TIP_2(Movie.TIP2),
	Movie_TIP_3(Movie.TIP3),
	TRIP_TIP_1(Trip.TIP1),
	TRIP_TIP_2(Trip.TIP2),
	TRIP_TIP_3(Trip.TIP3),
	TRIP_TIP_4(Trip.TIP4),
	TRIP_TIP_5(Trip.TIP5),
	MUSIC_TIP_1(Music.TIP1),
	MUSIC_TIP_2(Music.TIP2),
	MUSIC_TIP_3(Music.TIP3),
	MUSIC_TIP_4(Music.TIP4),
	READ_TIP_1(Daily.TIP1),
	READ_TIP_2(Daily.TIP2),
	READ_TIP_3(Daily.TIP3),
	READ_TIP_4(Daily.TIP4),
	GAME_TIP_1(Food.TIP1),
	GAME_TIP_2(Food.TIP2),
	GAME_TIP_3(Food.TIP3),
	SPORT_TIP_1(Sport.TIP1),
	SPORT_TIP_2(Sport.TIP2),
	SPORT_TIP_3(Sport.TIP3),
	SPORT_TIP_4(Sport.TIP4),
	ANIMATION_TIP_1(Animation.TIP1),
	ANIMATION_TIP_2(Animation.TIP2),
	ANIMATION_TIP_3(Animation.TIP3),
	BUSINESS_TIP_1(Business.TIP1),
	BUSINESS_TIP_2(Business.TIP2),
	BUSINESS_TIP_3(Business.TIP3),
	BUSINESS_TIP_4(Business.TIP4),
	;

	private final TipType tipType;

	public static Tips[] valuesByType(int type) {
		if (type == 1) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Movie)
				.toArray(Tips[]::new);
		} else if (type == 2) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Trip)
				.toArray(Tips[]::new);
		} else if (type == 3) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Music)
				.toArray(Tips[]::new);
		} else if (type == 4) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Sport)
				.toArray(Tips[]::new);
		} else if (type == 5) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Food)
				.toArray(Tips[]::new);
		} else if (type == 6) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Daily)
				.toArray(Tips[]::new);
		} else if (type == 7) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Animation)
				.toArray(Tips[]::new);
		} else if (type == 8) {
			return Arrays.stream(Tips.values())
				.filter(tip -> tip.tipType instanceof Business)
				.toArray(Tips[]::new);
		} else {
			throw new ApiException(ExceptionEnum.TIP_NOT_FOUND_EXCEPTION);
		}
	}
}
