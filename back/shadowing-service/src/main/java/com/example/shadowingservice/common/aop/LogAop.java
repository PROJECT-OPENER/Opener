package com.example.shadowingservice.common.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LogAop {

	@Before("execution(* com.example.shadowingservice..*(..)) && !execution(* com.example.shadowingservice.exception..*(..))")
	public void before(JoinPoint joinPoint){
		log.info("[log] {} -> {} 실행", joinPoint.getSignature().getDeclaringType().getSimpleName() ,joinPoint.getSignature().getName());
	}

	@After("execution(* com.example.shadowingservice..*(..)) && !execution(* com.example.shadowingservice.exception..*(..))")
	public void after(JoinPoint joinPoint){
		log.info("[log] {} -> {} 종료", joinPoint.getSignature().getDeclaringType().getSimpleName() ,joinPoint.getSignature().getName());
	}
}