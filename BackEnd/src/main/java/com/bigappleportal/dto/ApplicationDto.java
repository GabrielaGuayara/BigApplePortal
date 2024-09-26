package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApplicationDTO {

    private Long id;
    private Date dateApplied;
    private String status;
    private UserDTO user; // Include employee details
    private ApprenticeshipDTO apprenticeship; // Include apprenticeship details
//    private Long apprenticeshipId;

}