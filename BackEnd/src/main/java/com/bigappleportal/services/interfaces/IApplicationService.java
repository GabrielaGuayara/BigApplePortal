package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.Response;

public interface IApplicationService {

    Response applyForApprenticeship(Long userId, Long apprenticeshipId);

    Response viewApplication(Long applicationId, Long userId);

    Response deleteApplication(Long applicationId, Long userId);

    Response viewApplicationsByUserId(Long userId);
    Response updateApplicationStatus(Long applicationId, String newStatus);
}


