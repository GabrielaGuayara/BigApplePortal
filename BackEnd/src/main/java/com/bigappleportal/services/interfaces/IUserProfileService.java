package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.dto.UserProfileDTO;

import java.util.List;

public interface IUserProfileService {
    Response createUserProfile(Long userId, UserProfileDTO userProfileDTO);

    Response updateUserProfile(Long userId, UserProfileDTO userProfileDTO);

    Response deleteUserProfile(Long userId);

    Response getUserProfile(Long userId);

//    Response suggestApprenticeships(Long userId);


}
