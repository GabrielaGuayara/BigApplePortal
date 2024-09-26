package com.bigappleportal.controller;

import com.bigappleportal.dto.LoginRequest;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.User;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    // This method allows all users access  available apprenticeships
    @GetMapping("/all-apprenticeships")
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

}