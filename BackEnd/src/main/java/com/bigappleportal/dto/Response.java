package com.bigappleportal.dto;

import com.bigappleportal.model.Application;
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
    private Long id;
    private String name;

    private UserDTO user;
    private ApprenticeshipDTO apprenticeship;
    private ApplicationDTO application;

    private List<UserDTO> userList;
    private List<ApprenticeshipDTO> apprenticeships;
    private List<ApplicationDTO> applications;


}