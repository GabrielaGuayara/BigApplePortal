package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileDTO {
    private Long id;
    private Long userId;
    private List<String> skills;
    private String educationLevel;
    private String phoneNumber;
    private String location;
    private String summary;
    private String pictureURL;
    private String preferredType;
}



