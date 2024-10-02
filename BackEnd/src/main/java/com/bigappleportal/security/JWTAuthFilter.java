package com.bigappleportal.security;

import com.bigappleportal.services.CustomUserDetailsService;
import com.bigappleportal.utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    //Inject JWT utility class for token handling
    @Autowired
    private JWTUtils jwtUtils;

    //Inject custom user details service for the user retrieval
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    //Filter method that processes incoming request
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //Retrive the authorization header from the request
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        //If the header is missing or blank, it will procced with the filter chain
        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        //Extract JWT token from the authorizarion header and extract tje user's email from the token
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);

        //If a user email is found and no authorization is currently set
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //Load user details based on the email
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);

            //Validate the token agains the user details
            if (jwtUtils.isValidToken(jwtToken, userDetails)) {
                //Create a new secutity context to hold the authentification
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

                //Create an authentication token with user detals and authorities
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                //Attach request details to the authentication token
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                //Set the authentication in the security context
                securityContext.setAuthentication(token);

                //Update the SecurityContext with the new context
                SecurityContextHolder.setContext(securityContext);
            }
        }

        //Continue the filter chain with the request and response
        filterChain.doFilter(request, response);
    }
}


