package com.bigappleportal.dto;

import lombok.Data;

@Data
public class AdminRequest {
    private String name;
    private String password;
    private String email;

}
