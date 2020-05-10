package com.biruntha.security.basicauth.config;

import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class BasicAuthUtils {
	
	public String generateBasicToken(String username, String password) {
		String input = username + ":" + password;
	    return Base64.getEncoder().encodeToString(input.getBytes());
	}
}
