package com.example.memberservice.common.util;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.example.memberservice.common.annotation.Nickname;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;

public class NicknameValidator implements ConstraintValidator<Nickname, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim().equals("")) {
			throw new ApiException(ExceptionEnum.NICKNAME_NULL_EXCEPTION);
		}
		return true;
	}
}
