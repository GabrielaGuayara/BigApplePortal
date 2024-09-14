package com.bigappleportal.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "apprenticeships")
public class Apprenticeship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String apprenticeshipType;
    private String salaryRange;
    private String experienceLevel;
    private String requiredSkills;
    private String status; // OPEN, CLOSED, FILLED
    private LocalDate datePosted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private ApprenticeshipCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}



