package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.Apprenticeship;

public interface IApprenticeshipService {

    Response createApprenticeship(Long userId , ApprenticeshipDTO apprenticeshipDTO);

    Response updateApprenticeship(Long userId, Long apprenticeshipId, ApprenticeshipDTO apprenticeshipDTO);

    Response deleteApprenticeship(Long apprenticeshipId, Long userId);

    Response getAllApprenticeshipsByUserId(Long userId);

    Response getApprenticeshipById(Long id);

    Response getAllApprenticeships();





//    Response getApprenticeshipById(String id);

//    Response getAllApprenticeships();

    //

    //

//    Response searchApprenticeships(String location, String apprenticeshipType, String experienceLevel);

}
