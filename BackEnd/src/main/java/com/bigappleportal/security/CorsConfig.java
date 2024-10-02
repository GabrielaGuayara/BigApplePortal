package com.bigappleportal.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    //Bean that provides CORS configuration for the application
    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                //Allow all origins and specify allowed HTTP methods
                registry.addMapping("/**") //Apply CORS settings to all endpoints
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        //Allow request from any origin
                        .allowedOrigins("*");
            }
        };
    }
}



