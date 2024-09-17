package com.bigappleportal.controller;

import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.Application;
import com.bigappleportal.services.interfaces.IApplicationService;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.services.interfaces.IUserService;
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
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<Response> applyForApprenticeship(@PathVariable Long userId, @PathVariable Long apprenticeshipId) {
        Response response = applicationService.applyForApprenticeship(userId, apprenticeshipId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{applicationId}/{userId}/{apprenticeshipId}")
    public ResponseEntity<Response> updateApplication(@PathVariable Long applicationId, @PathVariable Long userId, @PathVariable Long apprenticeshipId, @RequestBody ApplicationDTO applicationDTO) {
        Response response = applicationService.updateApplication(applicationId, userId, apprenticeshipId, applicationDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/view/{applicationId}/{userId}")
    public ResponseEntity<Response> viewApplication(@PathVariable Long applicationId, @PathVariable Long userId) {
        Response response = applicationService.viewApplication(applicationId, userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{applicationId}/{userId}/{apprenticeshipId}")
    public ResponseEntity<Response> deleteApplication(@PathVariable Long applicationId, @PathVariable Long userId, @PathVariable Long apprenticeshipId) {
        Response response = applicationService.deleteApplication(applicationId, userId, apprenticeshipId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}



