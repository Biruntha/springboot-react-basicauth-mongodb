package com.biruntha.security.basicauth.config;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class BasicAuthEntryPoint extends BasicAuthenticationEntryPoint {
	private static final Logger logger = LoggerFactory.getLogger(BasicAuthEntryPoint.class);
	
	@Override
    public void commence(HttpServletRequest request, HttpServletResponse response, 
    		AuthenticationException authException)
      throws IOException {
		logger.error("Unauthorized error: {}", authException.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }
	
	@Override
    public void afterPropertiesSet() {
        setRealmName("BasicAuth");
        super.afterPropertiesSet();
    }
}
