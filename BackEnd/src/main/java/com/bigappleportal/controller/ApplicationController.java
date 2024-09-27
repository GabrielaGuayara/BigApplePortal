package com.bigappleportal.controller;

import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.dto.StatusRequest;
import com.bigappleportal.services.interfaces.IApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private IApplicationService applicationService;

    @PostMapping("/apply/{userId}/{apprenticeshipId}")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public ResponseEntity<Response> applyForApprenticeship(
            @PathVariable Long userId,
            @PathVariable Long apprenticeshipId) {
        Response response = applicationService.applyForApprenticeship(userId, apprenticeshipId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    // Update the status of an application
//    @PutMapping("/{applicationId}/newStatus")
//    @PreAuthorize("hasAuthority('EMPLOYEE')")
//    public ResponseEntity<Response> updateStatus(
//            @PathVariable Long applicationId,
//            @RequestBody String newStatus) {
//        Response response = applicationService.updateApplicationStatus(applicationId, newStatus);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Response> updateApplicationStatus(@PathVariable Long id, @RequestBody StatusRequest request) {
        Response response = applicationService.updateApplicationStatus(id, request.getStatus());
        return ResponseEntity.ok(response);
    }


    @GetMapping("/view/{userId}/all")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public ResponseEntity<Response> viewApplications(@PathVariable Long userId) {
        Response response = applicationService.viewApplicationsByUserId(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{applicationId}/{userId}")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public ResponseEntity<Response> deleteApplication(
            @PathVariable Long applicationId,
            @PathVariable Long userId) {
        Response response = applicationService.deleteApplication(applicationId, userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }





}


