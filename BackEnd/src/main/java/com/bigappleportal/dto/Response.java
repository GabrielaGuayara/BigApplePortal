package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

        private int statusCode;
        private String message;

        private String token;
        private String role;
        private String expirationTime;
        private String bookingConfirmationCode;

        private UserDTO user;
        private ApprenticeshipDTO apprenticeship;
        private ApplicationDTO application;
        private ApprenticeshipCategoryDTO category;

        private List<UserDTO> userList;
        private List<ApprenticeshipDTO> apprenticeshipList;
        private List<ApplicationDTO> applicationList;
        private List<ApprenticeshipCategoryDTO> categoryList;

    }



