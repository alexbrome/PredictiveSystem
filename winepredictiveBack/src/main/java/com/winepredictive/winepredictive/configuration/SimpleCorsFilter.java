package com.winepredictive.winepredictive.configuration;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SimpleCorsFilter implements Filter {

	  @Override
	   public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;
		Map<String,String> map = new HashMap<>();
		String originHeader = request.getHeader("origin");
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		response.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,OPTIONS,DELETE");//Metodos HTTP permitidos
		response.setHeader("Access-Control-Max-Age", "3600");//Tiempo maximo almacenado en cache
		response.setHeader("Access-Control-Allow-Headers", "*");//Permite el encabezado CORS
		
		if("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
		}else {
			chain.doFilter(req, res);
		}
		
		
	}


}
