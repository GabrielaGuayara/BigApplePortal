package com.bigappleportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class BigApplePortalApplication {
	public static void main(String[] args) {
		SpringApplication.run(BigApplePortalApplication.class, args);
	}
}
