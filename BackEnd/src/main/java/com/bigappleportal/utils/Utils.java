package com.bigappleportal.utils;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.ApplicationDTO;
import com.bigappleportal.dto.UserDTO;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.Application;
import com.bigappleportal.model.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    // Map User entity to UserDTO
    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        userDTO.setSummary(user.getSummary());
        List<ApprenticeshipDTO> apprenticeshipDTOs = user.getApprenticeships().stream()
                .map(Utils::mapApprenticeshipEntityToApprenticeshipDTO)
                .collect(Collectors.toList());
        userDTO.setApprenticeships(apprenticeshipDTOs);

        // Map applications
//        List<ApplicationDTO> applicationDTOs = user.getApplications().stream()
//                .map(Utils::mapApplicationEntityToApplicationDTO)
//                .collect(Collectors.toList());
//        userDTO.setApplications(applicationDTOs);

        return userDTO;

    }

    // Map Apprenticeship entity to ApprenticeshipDTO
    public static ApprenticeshipDTO mapApprenticeshipEntityToApprenticeshipDTO(Apprenticeship apprenticeship) {
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
        apprenticeshipDTO.setExperienceLevel(apprenticeship.getExperienceLevel());
        List<ApplicationDTO> applicationDTOs = apprenticeship.getApplications().stream()
                .map(Utils::mapApplicationEntityToApplicationDTO)
                .collect(Collectors.toList());
        apprenticeshipDTO.setApplications(applicationDTOs);
        return apprenticeshipDTO;
    }

    // Map Application entity to ApplicationDTO
    public static ApplicationDTO mapApplicationEntityToApplicationDTO(Application application) {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        applicationDTO.setId(application.getId());
        applicationDTO.setDateApplied(application.getDateApplied());
        applicationDTO.setApplicationStatus(application.getStatus());
        applicationDTO.setUser(mapUserEntityToUserDTO(application.getUser()));

        return applicationDTO;
    }



    // Map User entity to UserDTO, including associated applications
    public static UserDTO mapUserEntityToUserDTOWithApplications(User user) {
        UserDTO userDTO = mapUserEntityToUserDTO(user);
        if (!user.getApplications().isEmpty()) {
            userDTO.setApplications(user.getApplications().stream()
                    .map(Utils::mapApplicationEntityToApplicationDTO)
                    .collect(Collectors.toList()));
        }
        return userDTO;
    }



    // Map Apprenticeship entity to ApprenticeshipDTO, including associated applications
    public static ApprenticeshipDTO mapApprenticeshipEntityToApprenticeshipDTOWithApplications(Apprenticeship apprenticeship) {
        ApprenticeshipDTO apprenticeshipDTO = mapApprenticeshipEntityToApprenticeshipDTO(apprenticeship);
        if (apprenticeship.getApplications() != null && !apprenticeship.getApplications().isEmpty()) {
            apprenticeshipDTO.setApplications(apprenticeship.getApplications().stream()
                    .map(Utils::mapApplicationEntityToApplicationDTO)
                    .collect(Collectors.toList()));
        }
        return apprenticeshipDTO;
    }

    // Map a list of User entities to a list of UserDTOs
    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    // Map a list of Apprenticeship entities to a list of ApprenticeshipDTOs
    public static List<ApprenticeshipDTO> mapApprenticeshipListEntityToApprenticeshipListDTO(List<Apprenticeship> apprenticeshipList) {
        return apprenticeshipList.stream().map(Utils::mapApprenticeshipEntityToApprenticeshipDTO).collect(Collectors.toList());
    }



    // Map a list of Application entities to a list of ApplicationDTOs
    public static List<ApplicationDTO> mapApplicationListEntityToApplicationListDTO(List<Application> applicationList) {
        return applicationList.stream().map(Utils::mapApplicationEntityToApplicationDTO).collect(Collectors.toList());
    }



    public static Apprenticeship mapApprenticeshipDTOToApprenticeshipEntity(ApprenticeshipDTO apprenticeshipDTO) {
        Apprenticeship apprenticeship = new Apprenticeship();

        apprenticeship.setTitle(apprenticeshipDTO.getTitle());
        apprenticeship.setLocation(apprenticeshipDTO.getLocation());
        apprenticeship.setDescription(apprenticeshipDTO.getDescription());
        apprenticeship.setApprenticeshipType(apprenticeshipDTO.getApprenticeshipType());
        apprenticeship.setSalaryRange(apprenticeshipDTO.getSalaryRange());
        apprenticeship.setExperienceLevel(apprenticeshipDTO.getExperienceLevel());
        apprenticeship.setRequiredSkills(apprenticeshipDTO.getRequiredSkills());
        apprenticeship.setStatus(apprenticeshipDTO.getStatus());
        apprenticeship.setDatePosted(apprenticeshipDTO.getDatePosted());

        return apprenticeship;
    }



}





