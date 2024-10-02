package com.bigappleportal.dto;

import com.bigappleportal.model.Application;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

//DTO for standardized API response
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    //HTTP status code for the response
    private int statusCode;
    private String message;

    //Token and role information for authentificate users
    private String token;
    private String role;
    private String expirationTime;

    //User-related data
    private Long id;
    private String name;
    private String status;
    private String applicationStatus;

    //DT0s for related entities
    private UserDTO user;
    private ApprenticeshipDTO apprenticeship;
    private ApplicationDTO application;
    private UserProfileDTO userProfile;
    private List<UserDTO> userList;
    private List<ApprenticeshipDTO> apprenticeships;
    private List<ApplicationDTO> applications;



}