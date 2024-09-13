package com.bigappleportal.controllers;

import com.bigappleportal.dto.ApplicationDto;
import com.bigappleportal.services.ApplicationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationServices applicationService;

    public ApplicationController(ApplicationServices applicationService) {
        this.applicationService = applicationService;
    }

    @PutMapping("/{id}/update-status")
//    @PreAuthorize("hasRole('ROLE_EMPLOYER')")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable Integer id,
            @RequestParam("status") String status) {
        applicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok("Application status updated successfully");
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasRole('ROLE_EMPLOYER')")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable Integer id) {
        ApplicationDto application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }
}



