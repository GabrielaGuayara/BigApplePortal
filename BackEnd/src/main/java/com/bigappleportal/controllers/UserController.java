package com.bigappleportal.controllers;

import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    private List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (user == null) {
            return ResponseEntity.badRequest().body("User object cannot be null");
        }
        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must not be null");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

//    // Get current user's profile
//    @GetMapping("/profile")
//    public ResponseEntity<?> getProfile() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//
//        if (username == null) {
//            return ResponseEntity.status(401).body("Unauthorized access");
//        }
//
//        Optional<User> user = userRepository.findByUsername(username);
//        if (user.isPresent()) {
//            return ResponseEntity.ok(user.get());
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // Update user profile
//    @PutMapping("/profile")
//    public ResponseEntity<String> updateProfile(@RequestBody User updatedUser) {
//        if (updatedUser == null) {
//            return ResponseEntity.badRequest().body("Updated user object cannot be null");
//        }
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//
//        if (username == null) {
//            return ResponseEntity.status(401).body("Unauthorized access");
//        }
//
//        Optional<User> userOptional = userRepository.findByUsername(username);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            user.setSkills(updatedUser.getSkills());
//            user.setEducation(updatedUser.getEducation());
//            user.setWorkExperience(updatedUser.getWorkExperience());
//            user.setPictureURL(updatedUser.getPictureURL());
//            user.setResumeURL(updatedUser.getResumeURL());
//            userRepository.save(user);
//            return ResponseEntity.ok("Profile updated successfully");
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
}
