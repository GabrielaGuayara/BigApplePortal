package com.bigappleportal.services;

import com.bigappleportal.dto.JobCategoryDto;
import com.bigappleportal.model.JobCategory;
import com.bigappleportal.repositories.JobCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobCategoryService {

    private final JobCategoryRepository jobCategoryRepository;

    public JobCategoryService(JobCategoryRepository jobCategoryRepository) {
        this.jobCategoryRepository = jobCategoryRepository;
    }

    public List<JobCategoryDto> getAllJobCategories() {
        return jobCategoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public JobCategoryDto getJobCategoryById(Integer id) {
        JobCategory jobCategory = jobCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Category not found"));
        return convertToDTO(jobCategory);
    }

    public JobCategoryDto createJobCategory(JobCategoryDto jobCategoryDto) {
        JobCategory jobCategory = convertToEntity(jobCategoryDto);
        JobCategory savedJobCategory = jobCategoryRepository.save(jobCategory);
        return convertToDTO(savedJobCategory);
    }

    public JobCategoryDto updateJobCategory(Integer id, JobCategoryDto jobCategoryDTO) {
        JobCategory existingJobCategory = jobCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job Category not found"));
        existingJobCategory.setName(jobCategoryDTO.getName());
        JobCategory updatedJobCategory = jobCategoryRepository.save(existingJobCategory);
        return convertToDTO(updatedJobCategory);
    }

    public void deleteJobCategory(Integer id) {
        if (!jobCategoryRepository.existsById(id)) {
            throw new RuntimeException("Job Category not found");
        }
        jobCategoryRepository.deleteById(id);
    }

    private JobCategoryDto convertToDTO(JobCategory jobCategory) {
        JobCategoryDto dto = new JobCategoryDto();
        dto.setId(jobCategory.getId());
        dto.setName(jobCategory.getName());
        return dto;
    }

    private JobCategory convertToEntity(JobCategoryDto dto) {
        JobCategory jobCategory = new JobCategory();
        jobCategory.setName(dto.getName());
        return jobCategory;
    }

    public static interface EmailService {
        void sendInterviewRequest(String toEmail, String subject, String text);
    }
}




