package com.bigappleportal.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class ApprenticeshipDto {

    @NotBlank
    @Size(min = 3, max = 100)
    private String title;

    @NotBlank
    @Size(min = 10, max = 500)
    private String description;

    @NotNull
    private Integer jobCategoryId;

    @NotNull
    private Boolean isRemote;

    @NotBlank
    @Size(min = 3, max = 100)
    private String location;


}



