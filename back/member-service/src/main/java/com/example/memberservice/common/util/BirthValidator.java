package com.example.memberservice.common.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.example.memberservice.common.annotation.Birth;
import com.example.memberservice.common.exception.ApiException;
import com.example.memberservice.common.exception.ExceptionEnum;

public class BirthValidator implements ConstraintValidator<Birth, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || value.trim() == "") {
			throw new ApiException(ExceptionEnum.BIRTH_NULL_EXCEPTION);
		}

		try {
			LocalDate.parse(value, DateTimeFormatter.ISO_DATE);
		} catch (DateTimeParseException e) {
			throw new ApiException(ExceptionEnum.INVALID_DATE_EXCEPTION);
		}

		return true;
	}
}
