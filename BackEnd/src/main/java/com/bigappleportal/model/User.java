package com.bigappleportal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String role;

    private String skills;
    private String education;
    private String workExperience;
    private String pictureURL;
    private String resumeURL;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Application> applications;
}



