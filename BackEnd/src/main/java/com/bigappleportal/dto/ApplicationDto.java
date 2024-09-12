package com.bigappleportal.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationDto {

    @NotNull
    private Integer apprenticeshipId;

    @NotNull
    private Integer employeeId;

    private String status;


}



