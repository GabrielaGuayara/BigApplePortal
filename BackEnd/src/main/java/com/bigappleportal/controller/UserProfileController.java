package com.bigappleportal.controller;

import com.bigappleportal.dto.Response;
import com.bigappleportal.dto.UserProfileDTO;
import com.bigappleportal.services.interfaces.IUserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//Controller to managing user profiles
@RestController
@RequestMapping("/user-profile")
public class UserProfileController {

    //Injecting the user profile service
    @Autowired
    private IUserProfileService userProfileService;

    //Endpoint to create a new user profile
    @PostMapping("/create/{userId}")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public Response createUserProfile(@PathVariable Long userId, @RequestBody UserProfileDTO userProfileDTO) {
        return userProfileService.createUserProfile(userId, userProfileDTO);
    }

    //Endpoint to update an existing user profile
    @PutMapping("/update/{userId}")
    public Response updateUserProfile(@PathVariable Long userId, @RequestBody UserProfileDTO userProfileDTO) {
        return userProfileService.updateUserProfile(userId, userProfileDTO);
    }

    //Endpoint to delete a user profile
    @DeleteMapping("/delete/{userId}")
    public Response deleteUserProfile(@PathVariable Long userId) {
        return userProfileService.deleteUserProfile(userId);
    }

    @GetMapping("/view/{userId}")
    public Response getUserProfile(@PathVariable Long userId) {
        return userProfileService.getUserProfile(userId);
    }


}


