package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.Apprenticeship;

public interface IApprenticeshipService {

    Response createApprenticeship(Long userId, Long categoryId, ApprenticeshipDTO apprenticeshipDTO);

    Response updateApprenticeship(Long userId, Long categoryId, Long apprenticeshipId, ApprenticeshipDTO apprenticeshipDTO);

    Response deleteApprenticeship(Long apprenticeshipId, Long userId);





//    Response getApprenticeshipById(String id);

//    Response getAllApprenticeships();

//
    Response getAllApprenticeships();
//
    Response getApprenticeshipById(Long id);

//    Response searchApprenticeships(String location, String apprenticeshipType, String experienceLevel);

}



