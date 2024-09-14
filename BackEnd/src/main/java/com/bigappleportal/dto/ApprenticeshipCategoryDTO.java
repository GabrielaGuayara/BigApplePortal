package com.bigappleportal.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApprenticeshipCategoryDTO {

    private Long id;
    private String name;
    private List<ApprenticeshipDTO> apprenticeships = new ArrayList<>();

}



