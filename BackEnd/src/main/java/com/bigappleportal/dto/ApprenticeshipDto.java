package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApprenticeshipDTO {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String description;
    private String apprenticeshipType;
    private String salaryRange;
    private String experienceLevel;
    private String requiredSkills;
    private String status;
    private Date datePosted;
    private UserDTO user;
    private List<ApplicationDTO> applications = new ArrayList<>();

}