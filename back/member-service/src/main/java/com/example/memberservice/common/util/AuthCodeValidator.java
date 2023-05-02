package com.example.memberservice.common.util;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.example.memberservice.common.annotation.AuthCode;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;

public class AuthCodeValidator implements ConstraintValidator<AuthCode, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim() == "") {
			throw new ApiException(ExceptionEnum.AUTH_CODE_NULL_EXCEPTION);
		}

		return true;
	}
}
