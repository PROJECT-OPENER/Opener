package com.example.memberservice.common.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	// private final JwtExceptionFilter jwtExceptionFilter;
	private final JwtTokenProvider jwtTokenProvider;
	// private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	// private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()

			// .exceptionHandling()
			// .authenticationEntryPoint(jwtAuthenticationEntryPoint)
			// .accessDeniedHandler(jwtAccessDeniedHandler)

			// .and()
			// .sessionManagement()
			// .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션 사용 x

			// .and()
			.authorizeRequests()
			.antMatchers("/**").permitAll()
			.anyRequest().authenticated();

		// .and()
		// .apply(new JwtSecurityConfig(jwtTokenProvider, jwtExceptionFilter));
	}
}


