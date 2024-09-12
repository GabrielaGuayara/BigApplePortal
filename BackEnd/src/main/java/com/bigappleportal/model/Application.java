package com.bigappleportal.model;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "apprenticeship_id")
    private Apprenticeship apprenticeship;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User employee;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

}


