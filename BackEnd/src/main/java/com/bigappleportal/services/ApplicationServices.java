package com.bigappleportal.services;

import com.bigappleportal.dto.ApplicationDto;
import com.bigappleportal.model.Application;
import com.bigappleportal.model.ApplicationStatus;
import com.bigappleportal.repositories.ApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ApplicationServices {

    private final ApplicationRepository applicationRepository;


    public ApplicationServices(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public void updateApplicationStatus(Integer id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(ApplicationStatus.valueOf(status));
        applicationRepository.save(application);
    }

    public ApplicationDto getApplicationById(Integer id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return convertToDTO(application);
    }

    private ApplicationDto convertToDTO(Application application) {
        ApplicationDto dto = new ApplicationDto();
        dto.setApprenticeshipId(application.getApprenticeship().getId());
        dto.setEmployeeId(application.getEmployee().getId());
        dto.setStatus(String.valueOf(application.getStatus()));
        return dto;
    }
}



