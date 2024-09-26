package com.bigappleportal.dto;

import lombok.Data;

@Data
public class UserUpdatedRequest {

    private String name;
    private String email;
    private String phoneNumber;
    private String summary;
}
