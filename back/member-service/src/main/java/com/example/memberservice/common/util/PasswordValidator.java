package com.example.memberservice.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.example.memberservice.common.annotation.Password;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<Password, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim().equals("")) {
			throw new ApiException(ExceptionEnum.PASSWORD_NULL_EXCEPTION);
		}

		String regex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(value);
		if (!m.matches()) {
			throw new ApiException(ExceptionEnum.INVALID_PASSWORD_EXCEPTION);
		}
		return true;
	}
}
