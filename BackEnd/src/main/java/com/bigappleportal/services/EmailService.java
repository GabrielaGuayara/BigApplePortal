package com.bigappleportal.services;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    void sendInterviewRequest(String toEmail, String subject, String text);
}



