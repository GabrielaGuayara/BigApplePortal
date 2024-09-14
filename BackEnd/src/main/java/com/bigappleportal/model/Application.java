package com.bigappleportal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Status is required")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // Employee

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apprenticeship_id")
    private Apprenticeship apprenticeship;

    // Getters and Setters
}



