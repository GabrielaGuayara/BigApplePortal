package com.bigappleportal.model;

import com.bigappleportal.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

//Entity class representing a user profile
@Data
@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Association with the User Entity
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    //Collection of skills associated with the user profile
    @ElementCollection
    @CollectionTable(name = "user_skills", joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();


    private String educationLevel;

    private String phoneNumber;

    private String location;

    //Summary of the user's profile that has a length constrain for the database
    @Column(length = 65555)
    private String summary;

    @Column(length = 65555)
    private String pictureURL;
    private String preferredType;

    private boolean isPrivateComplete;



    public boolean isComplete(){
        return skills != null && !skills.isEmpty() && educationLevel != null && !educationLevel.isEmpty();
    }

}





