package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String phoneNumber;
    private String role; // "ADMIN", "EMPLOYER", "EMPLOYEE"
    private String summary;

    // For employer role
    private List<ApprenticeshipDTO> apprenticeships = new ArrayList<>();

    // For employee role
    private List<ApplicationDTO> applications = new ArrayList<>();


}