package com.bigappleportal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RoleDto {

    @NotBlank
    private String name;

}



