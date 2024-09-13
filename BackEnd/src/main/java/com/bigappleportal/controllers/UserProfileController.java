package com.bigappleportal.controllers;

import com.bigappleportal.dto.UserProfileDto;
import com.bigappleportal.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/updateProfile")
//    @PreAuthorize("hasRole('ROLE_EMPLOYEE')") // Allow only employees to update their profiles
    public ResponseEntity<String> updateProfile(@Valid @RequestBody UserProfileDto userProfileDTO) {
        userService.updateUserProfile(userProfileDTO);
        return ResponseEntity.ok("Profile updated successfully");
    }
}




