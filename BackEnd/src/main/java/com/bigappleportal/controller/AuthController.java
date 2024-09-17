package com.bigappleportal.controller;

import com.bigappleportal.dto.LoginRequest;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.User;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IApprenticeshipService apprenticeshipService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest) {
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }


    // Public method to get all available apprenticeships
    @GetMapping("/all-apprenticeship")
    public ResponseEntity<Response> getAllApprenticeships() {
        try {
            Response response = apprenticeshipService.getAllApprenticeships();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setStatusCode(500);
            response.setMessage("Error occurred while fetching all apprenticeships: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // Public method to get apprenticeship by id
    @GetMapping("/apprenticeship-by-id/{id}")
    public ResponseEntity<Response> getApprenticeshipById(@PathVariable Long id) {
        try {
            Response response = apprenticeshipService.getApprenticeshipById(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setStatusCode(500);
            response.setMessage("Error occurred while fetching apprenticeship: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


}