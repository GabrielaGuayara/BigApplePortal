package com.bigappleportal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Apprenticeship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String company;
    private String location;

    private boolean isRemote;

    @ManyToOne()
    @JoinColumn(name = "job_category_id")
    private JobCategory jobCategory;

}



