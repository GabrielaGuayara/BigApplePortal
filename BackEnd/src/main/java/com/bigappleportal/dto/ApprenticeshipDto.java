package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApprenticeshipDTO {

    private Long id;
    private String apprenticeshipType;
    private String salaryRange;
    private String experienceLevel;
    private String requiredSkills;
    private ApprenticeshipCategoryDTO category; // Include category details
    private String status;
    private String datePosted;
    private UserDTO user; // Include employer details
    private List<ApplicationDTO> applications = new ArrayList<>();

}



