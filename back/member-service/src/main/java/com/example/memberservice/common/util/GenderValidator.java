package com.example.memberservice.common.util;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.example.memberservice.common.annotation.GenderEnum;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;
import com.example.memberservice.entity.member.enums.Gender;

public class GenderValidator implements ConstraintValidator<GenderEnum, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim() == "") {
			throw new ApiException(ExceptionEnum.GENDER_NULL_EXCEPTION);
		}

		try {
			Gender.valueOf(value);
		} catch (IllegalArgumentException e) {
			throw new ApiException(ExceptionEnum.INVALID_GENDER_EXCEPTION);
		}

		return true;
	}
}
