package com.bigappleportal.controller;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apprenticeships")
public class ApprenticeshipController {

    @Autowired
    private IApprenticeshipService apprenticeshipService;

    // Get all available apprenticeships
    @GetMapping("/{userId}/all")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<Response> getAllApprenticeshipsByUserId(@PathVariable Long userId) {
        try {
            Response response = apprenticeshipService.getAllApprenticeshipsByUserId(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Response response = new Response();
            response.setStatusCode(500);
            response.setMessage("Error occurred while fetching all apprenticeships for user " + userId + ": " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }



    // Public method to get apprenticeship by id
    @GetMapping("/apprenticeship-by-id/{id}")
    @PreAuthorize("hasAuthority('EMPLOYEE', 'EMPLOYER')")

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


    // Create a new apprenticeship
    @PostMapping("/post-apprenticeship/{userId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER')")
    public ResponseEntity<Response> createApprenticeship(
            @PathVariable Long userId,
            @RequestBody ApprenticeshipDTO apprenticeshipDTO) {
        Response response = apprenticeshipService.createApprenticeship(userId, apprenticeshipDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Update an existing apprenticeship
    @PutMapping("/update-by-id/{userId}/{apprenticeshipId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Response> updateApprenticeship(
            @PathVariable Long userId,
            @PathVariable Long apprenticeshipId,
            @RequestBody ApprenticeshipDTO apprenticeshipDTO) {
        Response response = apprenticeshipService.updateApprenticeship(userId, apprenticeshipId, apprenticeshipDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // Delete an apprenticeship
    @DeleteMapping("/delete/{apprenticeshipId}/{userId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Response> deleteApprenticeship(
            @PathVariable Long apprenticeshipId,
            @PathVariable Long userId) {
        Response response = apprenticeshipService.deleteApprenticeship(apprenticeshipId, userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-id/{apprenticeshipId}")
    public ResponseEntity<Response> apprenticeshipById(
            @PathVariable Long apprenticeshipId
    ){
        Response response = apprenticeshipService.getApprenticeshipById(apprenticeshipId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }

    @GetMapping("/suggested/{userId}")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public ResponseEntity<Response> suggestApprenticeships(@PathVariable Long userId) {
        Response response = apprenticeshipService.suggestApprenticeships(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}



