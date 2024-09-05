package com.winepredictive.winepredictive.configuration;

import java.io.IOException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SimpleCorsFilter implements Filter {

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
	    HttpServletResponse response = (HttpServletResponse) res;
	    HttpServletRequest request = (HttpServletRequest) req;

	    // Permitir cualquier origen
	    response.setHeader("Access-Control-Allow-Origin", "*");

	    // Métodos HTTP permitidos
	    response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

	    // Tiempo máximo que la respuesta puede ser cacheada por el cliente
	    response.setHeader("Access-Control-Max-Age", "3600000000");//41 Days

	    // Cabeceras permitidas en la solicitud
	    response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, X-Requested-With, Origin");

	    // Cabeceras que pueden ser expuestas en la respuesta
	    response.setHeader("Access-Control-Expose-Headers", "Authorization, Content-Type");

	    // Permitir solicitudes con credenciales (opcional, según necesidad)
	    response.setHeader("Access-Control-Allow-Credentials", "true");

	    // Manejar las solicitudes preflight (OPTIONS)
	    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
	        response.setStatus(HttpServletResponse.SC_OK);
	    } else {
	        chain.doFilter(req, res);
	    }
	}

}
