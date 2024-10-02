package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.*;
import com.bigappleportal.model.Application;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.model.UserProfile;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserProfileRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IUserProfileService;
import com.bigappleportal.utils.Utils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileServiceImpl implements IUserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    @Override
    public Response createUserProfile(Long userId, UserProfileDTO userProfileDTO) {
        Response response = new Response();

        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));

            UserProfile userProfile = new UserProfile();
            userProfile.setUser(user);
            userProfile.setPhoneNumber(userProfileDTO.getPhoneNumber());
            userProfile.setSummary(userProfileDTO.getSummary());
            userProfile.setSkills(userProfileDTO.getSkills());
            userProfile.setEducationLevel(userProfileDTO.getEducationLevel());
            userProfile.setPictureURL(userProfileDTO.getPictureURL());
            userProfile.setPreferredType(userProfile.getPreferredType());
            userProfile.setPictureURL(userProfile.getPictureURL());
            userProfileRepository.save(userProfile);

            response.setStatusCode(200);
            response.setMessage("User profile created successfully");
            response.setUser(mapToUserDTO(user));
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error creating user profile: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response updateUserProfile(Long userId, UserProfileDTO userProfileDTO) {
        Response response = new Response();

        try {
            UserProfile userProfile = userProfileRepository.findByUserId(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User profile not found"));

            userProfile.setPhoneNumber(userProfileDTO.getPhoneNumber());
            userProfile.setLocation(userProfileDTO.getLocation());
            userProfile.setPreferredType(userProfileDTO.getPreferredType());
            userProfile.setEducationLevel(userProfileDTO.getEducationLevel());
            userProfile.setSummary(userProfileDTO.getSummary());
            userProfile.setSkills(userProfileDTO.getSkills());
            userProfile.setPictureURL(userProfileDTO.getPictureURL());

            userProfileRepository.save(userProfile);

            response.setStatusCode(200);
            response.setMessage("User profile updated successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating user profile: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response deleteUserProfile(Long userId) {
        Response response = new Response();

        try {
            UserProfile userProfile = userProfileRepository.findByUserId(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User profile not found"));

            userProfileRepository.delete(userProfile);

            response.setStatusCode(200);
            response.setMessage("User profile deleted successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user profile: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getUserProfile(Long userId) {
        Response response = new Response();

        try {
            UserProfile userProfile = userProfileRepository.findByUserId(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User profile not found"));

            response.setStatusCode(200);
            response.setMessage("User profile retrieved successfully");
            response.setUserProfile(mapToDTO(userProfile));
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving user profile: " + e.getMessage());
        }

        return response;
    }

//    @Override
//    public Response suggestApprenticeships(Long userId) {
//        Response response = new Response();
//
//        try {
//            UserProfile userProfile = userProfileRepository.findByUserId(userId)
//                    .orElseThrow(() -> new EntityNotFoundException("User profile not found"));
//
//            List<Apprenticeship> suggestedApprenticeships =apprenticeshipRepository
//                    .findByCriteria(userProfile.getSkills(), userProfile.getInterests(), userProfile.getLocation());
//
//            response.setStatusCode(200);
//            response.setMessage("Apprenticeship suggestions retrieved successfully");
//            response.setApprenticeships(suggestedApprenticeships.stream()
//                    .map(this::mapToDTO)
//                    .collect(Collectors.toList()));
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error retrieving apprenticeship suggestions: " + e.getMessage());
//        }
//
//        return response;
//    }

    private UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setRole(user.getRole());
        // Assuming you want to include other fields like applications and apprenticeships if necessary
        userDTO.setApplications(
                user.getApplications().stream()
                        .map(this::mapToApplicationDTO)
                        .collect(Collectors.toList())
        );
        userDTO.setApprenticeships(
                user.getApprenticeships().stream()
                        .map(this::mapToDTO)
                        .collect(Collectors.toList())
        );
        return userDTO;
    }

    private ApplicationDTO mapToApplicationDTO(Application application) {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        applicationDTO.setId(application.getId());
        applicationDTO.setApplicationStatus(application.getStatusApplication());
        // Map other relevant fields from Application entity to ApplicationDTO
        return applicationDTO;
    }


    private ApprenticeshipDTO mapToDTO(Apprenticeship apprenticeship) {
        ApprenticeshipDTO apprenticeshipDTO = new ApprenticeshipDTO();
        apprenticeshipDTO.setId(apprenticeship.getId());
        apprenticeshipDTO.setTitle(apprenticeship.getTitle());
        apprenticeshipDTO.setCompany(apprenticeship.getCompany());
        apprenticeshipDTO.setDescription(apprenticeship.getDescription());
        apprenticeshipDTO.setApprenticeshipType(apprenticeship.getApprenticeshipType());
        apprenticeshipDTO.setSalaryRange(apprenticeship.getSalaryRange());
        apprenticeshipDTO.setLocation(apprenticeship.getLocation());
        apprenticeshipDTO.setStatus(apprenticeship.getStatus());
        apprenticeshipDTO.setDatePosted(apprenticeship.getDatePosted());
        apprenticeshipDTO.setEducationLevel(apprenticeship.getEducationLevel());
        List<ApplicationDTO> applicationDTOs = apprenticeship.getApplications().stream()
                .map(Utils::mapApplicationEntityToApplicationDTO)
                .collect(Collectors.toList());
        apprenticeshipDTO.setApplications(applicationDTOs);
        return apprenticeshipDTO;
    }

    private UserProfileDTO mapToDTO(UserProfile userProfile) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(userProfile.getId());
        userProfileDTO.setPhoneNumber(userProfile.getPhoneNumber());
        userProfileDTO.setPreferredType(userProfile.getPreferredType());
        userProfileDTO.setSummary(userProfile.getSummary());
        userProfileDTO.setSkills(userProfile.getSkills());  // Assuming this is a list/array
        userProfileDTO.setEducationLevel(userProfile.getEducationLevel());  // Assuming this is a list/array
        userProfileDTO.setPictureURL(userProfile.getPictureURL());
        return userProfileDTO;
    }



}


