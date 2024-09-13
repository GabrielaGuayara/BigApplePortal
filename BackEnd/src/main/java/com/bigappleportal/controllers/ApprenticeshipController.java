package com.bigappleportal.controllers;

import com.bigappleportal.model.Application;
import com.bigappleportal.model.ApplicationStatus;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.repositories.ApplicationRepository;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/apprenticeships")
@CrossOrigin(origins = "http://localhost:5173/apprenticeships")
public class ApprenticeshipController {

    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    private final EmailService emailService;

    @Autowired
    public ApprenticeshipController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<?> postApprenticeship(@Valid @RequestBody Apprenticeship apprenticeship) {
        apprenticeshipRepository.save(apprenticeship);
        return ResponseEntity.ok("Apprenticeship posted successfully");
    }

    @GetMapping
    public List<Apprenticeship> getAllApprenticeships() {
        return apprenticeshipRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApprenticeship(@PathVariable Integer id) {
        Optional<Apprenticeship> apprenticeship = apprenticeshipRepository.findById(id);
        if (apprenticeship.isPresent()) {
            return ResponseEntity.ok(apprenticeship.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApprenticeship(@PathVariable Integer id, @Valid @RequestBody Apprenticeship updatedApprenticeship) {
        if (apprenticeshipRepository.existsById(id)) {
            updatedApprenticeship.setId(id);
            apprenticeshipRepository.save(updatedApprenticeship);
            return ResponseEntity.ok("Apprenticeship updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApprenticeship(@PathVariable Integer id) {
        if (apprenticeshipRepository.existsById(id)) {
            apprenticeshipRepository.deleteById(id);
            return ResponseEntity.ok("Apprenticeship deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<?> getApplicantsForApprenticeship(@PathVariable Integer id) {
        List<Application> applications = applicationRepository.findByApprenticeshipId(id);
        return ResponseEntity.ok(applications);
    }

    // Send interview request
    @PostMapping("/{id}/applications/{applicationId}/interview")
    public ResponseEntity<?> sendInterviewRequest(@PathVariable Integer id, @PathVariable Integer applicationId) {
        Optional<Application> optionalApplication = applicationRepository.findById(applicationId);
        if (optionalApplication.isPresent()) {
            Application application = optionalApplication.get();
            String toEmail = application.getEmployee().getUsername(); // Use actual email field
            String subject = "Interview Request for Apprenticeship";
            String text = "You have been selected for an interview for the apprenticeship position at " + id + ".";
            emailService.sendInterviewRequest(toEmail, subject, text);

            return ResponseEntity.ok("Interview request sent successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update application status
    @PutMapping("/{id}/applications/{applicationId}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Integer id, @PathVariable Integer applicationId, @RequestParam ApplicationStatus status) {
        Optional<Application> optionalApplication = applicationRepository.findById(applicationId);
        if (optionalApplication.isPresent()) {
            Application application = optionalApplication.get();
            application.setStatus(status);
            applicationRepository.save(application);
            return ResponseEntity.ok("Application status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


