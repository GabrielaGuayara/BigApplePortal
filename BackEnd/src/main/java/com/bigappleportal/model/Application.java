package com.bigappleportal.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JoinColumn(name = "apprenticeship_id", referencedColumnName = "id")
    @JsonIgnore
    private Apprenticeship apprenticeship;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private User employee;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
}


