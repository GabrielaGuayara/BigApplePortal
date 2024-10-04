package com.bigappleportal.controller;

import com.bigappleportal.dto.*;
import com.bigappleportal.model.User;

import com.bigappleportal.services.interfaces.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-id/{id}")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<Response> getUserById(@PathVariable String id) {
        Response response = userService.getUserById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Update user profile
    @PutMapping("/update/{userId}")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public ResponseEntity<Response> updateUserProfile(
            @PathVariable Long userId,
            @RequestBody EmployeeDTO userUpdateRequest) {
        Response response = userService.updateUser(userId, userUpdateRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-profile-info")
    public ResponseEntity<Response> getLoggedInUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteUSer(@PathVariable("id") String userId) {
        Response response = userService.deleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/add-admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addAdmin(@RequestBody AdminRequest adminRequest) {
        try {
            Response response = userService.addAdmin(adminRequest);
            return ResponseEntity.status(response.getStatusCode()).body(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setStatusCode(500);
            response.setMessage("Error occurred while adding admin: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

}