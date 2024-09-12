package com.bigappleportal.controllers;

import com.bigappleportal.services.SignupRequest;
import com.bigappleportal.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody SignupRequest signupRequest) {
        if (signupRequest == null) {
            return ResponseEntity.badRequest().body("Signup request cannot be null");
        }
        if (signupRequest.getUsername() == null || signupRequest.getPassword() == null || signupRequest.getRole() == null) {
            return ResponseEntity.badRequest().body("Username, password, and role must not be null");
        }
        if (userService.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        // Create new user
        userService.createUser(signupRequest.getUsername(), signupRequest.getPassword(), signupRequest.getRole());

        return ResponseEntity.ok("User registered successfully");
    }
}
