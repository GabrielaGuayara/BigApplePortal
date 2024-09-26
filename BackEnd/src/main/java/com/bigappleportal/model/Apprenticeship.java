package com.bigappleportal.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "apprenticeships")
public class Apprenticeship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String description;
    private String apprenticeshipType;
    private String salaryRange;
    private String experienceLevel;
    private String requiredSkills;
    private String status; // OPEN, CLOSED, FILLED
    private Date datePosted;


    @OneToMany(mappedBy = "apprenticeship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}