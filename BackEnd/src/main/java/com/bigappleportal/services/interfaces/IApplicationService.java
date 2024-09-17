package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.Application;

public interface IApplicationService {
//
//    Response createApplication(Application application);
//
//    Response updateApplication(Application application);
//
//    Response deleteApplication(String id);
//
//    Response getApplicationById(String id);
//
//    Response getAllApplications();
//
//    Response getApplicationsByUserId(String userId);
//
//    Response getApplicationsByApprenticeshipId(String apprenticeshipId);

    Response applyForApprenticeship(Long userId, Long apprenticeshipId);

    Response updateApplication(Long applicationId, Long userId, Long apprenticeshipId, ApplicationDTO applicationDTO);

    Response viewApplication(Long applicationId, Long userId);

    Response deleteApplication(Long applicationId, Long userId, Long apprenticeshipId);


}



