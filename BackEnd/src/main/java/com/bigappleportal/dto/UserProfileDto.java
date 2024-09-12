package com.bigappleportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserProfileDto {

    @NotNull
    private Integer userId;

    @NotBlank
    private String skills;

    @NotBlank
    private String education;

    @NotBlank
    private String workExperience;

    private String pictureURL;

    private String resumeURL;


}



