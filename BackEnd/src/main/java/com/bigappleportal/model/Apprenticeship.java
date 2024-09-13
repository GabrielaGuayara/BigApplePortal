// Apprenticeship.java
package com.bigappleportal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Apprenticeship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String company;
    private String location;
    private boolean isRemote;

    @ManyToOne
    @JoinColumn(name = "job_category_id", referencedColumnName = "id")
    @JsonIgnore
    private JobCategory jobCategory;

    @OneToMany(mappedBy = "apprenticeship", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications;


}



