package com.example.memberservice.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import com.example.memberservice.common.util.BirthValidator;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = BirthValidator.class)
public @interface Birth {
	String message() default "";

	Class[] groups() default {};

	Class[] payload() default {};
}
