package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.Application;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.ApplicationRepository;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IApplicationService;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
            User user = userRepository.findById(userId).orElseThrow(() -> new OurException("User not found"));
            Apprenticeship apprenticeship = apprenticeshipRepository.findById(apprenticeshipId).orElseThrow(() -> new OurException("Apprenticeship not found"));

            Application application = new Application();
            application.setUser(user);
            application.setApprenticeship(apprenticeship);
            application.setDateApplied(new java.util.Date());
            application.setStatus("Pending");

            Application savedApplication = applicationRepository.save(application);
            ApplicationDTO applicationDTO = Utils.mapApplicationEntityToApplicationDTO(savedApplication);

            response.setStatusCode(200);
            response.setMessage("Application successful");
            response.setApplication(applicationDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error applying for apprenticeship: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateApplication(Long applicationId, Long userId, Long apprenticeshipId, ApplicationDTO applicationDTO) {
        Response response = new Response();
        try {
            Application application = applicationRepository.findByIdAndUserId(applicationId, userId);
            if (application == null) {
                throw new OurException("Application not found");
            }

            if (apprenticeshipId != null) {
                Apprenticeship apprenticeship = apprenticeshipRepository.findById(apprenticeshipId).orElseThrow(() -> new OurException("Apprenticeship not found"));
                application.setApprenticeship(apprenticeship);
            }

            if (applicationDTO.getStatus() != null) {
                application.setStatus(applicationDTO.getStatus());
            }

            Application updatedApplication = applicationRepository.save(application);
            ApplicationDTO updatedApplicationDTO = Utils.mapApplicationEntityToApplicationDTO(updatedApplication);

            response.setStatusCode(200);
            response.setMessage("Application updated successfully");
            response.setApplication(updatedApplicationDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating application: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response viewApplication(Long applicationId, Long userId) {
        Response response = new Response();
        try {
            Application application = applicationRepository.findByIdAndUserId(applicationId, userId);
            if (application == null) {
                throw new OurException("Application not found");
            }

            ApplicationDTO applicationDTO = Utils.mapApplicationEntityToApplicationDTO(application);
            response.setStatusCode(200);
            response.setMessage("Application found");
            response.setApplication(applicationDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching application: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteApplication(Long applicationId, Long userId, Long apprenticeshipId) {
        Response response = new Response();
        try {
            Application application = applicationRepository.findByIdAndUserId(applicationId, userId);
            if (application == null) {
                throw new OurException("Application not found");
            }

            applicationRepository.delete(application);

            response.setStatusCode(200);
            response.setMessage("Application deleted successfully");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting application: " + e.getMessage());
        }
        return response;
    }

}



