package com.bigappleportal.controllers;

import com.bigappleportal.dto.JobCategoryDto;
import com.bigappleportal.services.JobCategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/job-categories")
public class JobCategoryController {

    private final JobCategoryService jobCategoryService;



    public JobCategoryController(JobCategoryService jobCategoryService) {
        this.jobCategoryService = jobCategoryService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<JobCategoryDto>> getAllJobCategories() {
        List<JobCategoryDto> jobCategories = jobCategoryService.getAllJobCategories();
        return ResponseEntity.ok(jobCategories);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JobCategoryDto> getJobCategoryById(@PathVariable Integer id) {
        JobCategoryDto jobCategory = jobCategoryService.getJobCategoryById(id);
        return ResponseEntity.ok(jobCategory);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JobCategoryDto> createJobCategory(@Valid @RequestBody JobCategoryDto jobCategoryDTO) {
        JobCategoryDto createdJobCategory = jobCategoryService.createJobCategory(jobCategoryDTO);
        return ResponseEntity.status(201).body(createdJobCategory);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JobCategoryDto> updateJobCategory(@PathVariable Integer id, @Valid @RequestBody JobCategoryDto jobCategoryDTO) {
        JobCategoryDto updatedJobCategory = jobCategoryService.updateJobCategory(id, jobCategoryDTO);
        return ResponseEntity.ok(updatedJobCategory);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteJobCategory(@PathVariable Integer id) {
        jobCategoryService.deleteJobCategory(id);
        return ResponseEntity.noContent().build();
    }
}



