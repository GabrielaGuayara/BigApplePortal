package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.dto.UserDTO;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.Application;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.ApplicationRepository;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements IApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    @Override
    public Response applyForApprenticeship(Long userId, Long apprenticeshipId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new Exception("User not found"));
            Apprenticeship apprenticeship = apprenticeshipRepository.findById(apprenticeshipId)
                    .orElseThrow(() -> new Exception("Apprenticeship not found"));

            Application application = new Application();
            application.setUser(user);
            application.setApprenticeship(apprenticeship);
            application.setDateApplied(new Date());
            application.setStatus("Pending");

            applicationRepository.save(application);

            ApplicationDTO applicationDTO = convertToDTO(application);
            response.setStatusCode(201);
            response.setMessage("Application submitted successfully.");
            response.setApplication(applicationDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while applying: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response viewApplication(Long applicationId, Long userId) {
        Response response = new Response();
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new Exception("Application not found"));

            // Check if the user matches
            if (!application.getUser().getId().equals(userId)) {
                throw new Exception("Unauthorized access");
            }

            ApplicationDTO applicationDTO = convertToDTO(application);
            response.setStatusCode(200);
            response.setApplication(applicationDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while fetching application: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteApplication(Long applicationId, Long userId) {
        Response response = new Response();
        try {
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new Exception("Application not found"));

            // Check if the user matches
            if (!application.getUser().getId().equals(userId)) {
                throw new Exception("Unauthorized access");
            }

            applicationRepository.delete(application);
            response.setStatusCode(200);
            response.setMessage("Application deleted successfully.");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while deleting application: " + e.getMessage());
        }
        return response;
    }

    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(application.getId());
        dto.setDateApplied(application.getDateApplied());
        dto.setStatus(application.getStatus());

        // Map user and apprenticeship details if necessary
        UserDTO userDTO = new UserDTO(); // Ensure to populate this
        userDTO.setId(application.getUser().getId());
        userDTO.setName(application.getUser().getName());
        dto.setUser(userDTO);

        ApprenticeshipDTO apprenticeshipDTO = new ApprenticeshipDTO(); // Ensure to populate this
        apprenticeshipDTO.setId(application.getApprenticeship().getId());
        apprenticeshipDTO.setTitle(application.getApprenticeship().getTitle());
        dto.setApprenticeship(apprenticeshipDTO);

        return dto;
    }

    @Override
    public Response viewApplicationsByUserId(Long userId) {
        Response response = new Response();
        try {
            List<Application> applications = applicationRepository.findByUserId(userId);
            List<ApplicationDTO> applicationDTOs = applications.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            response.setStatusCode(200);
            response.setApplications(applicationDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while fetching applications: " + e.getMessage());
        }
        return response;
    }


    public Response updateApplicationStatus(Long applicationId, String newStatus) {
        Response response = new Response();
        try {
            // Fetch the application by ID
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new OurException("Application not found"));

            // Update the application status
            application.setStatus(newStatus);
            Application updatedApplication = applicationRepository.save(application);

            // Prepare the response
            ApplicationDTO applicationDTO = convertToDTO(updatedApplication);
            response.setStatusCode(200);
            response.setMessage("Application status updated successfully");
            response.setApplication(applicationDTO);
        } catch (OurException e) {
            response.setStatusCode(404); // Not found
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500); // Internal server error
            response.setMessage("Error occurred during application status update: " + e.getMessage());
        }
        return response;
    }



}






