package com.example.memberservice.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.example.memberservice.common.annotation.Email;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<Email, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim().equals("")) {
			throw new ApiException(ExceptionEnum.EMAIL_NULL_EXCEPTION);
		}

		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(value);
		if (!m.matches()) {
			throw new ApiException(ExceptionEnum.INVALID_EMAIL_EXCEPTION);
		}
		return true;
	}
}