package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.UserProfileDTO;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.model.UserProfile;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    public UserProfileDTO createOrUpdateProfile(UserProfileDTO profileDTO, Long userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElse(new UserProfile());

        userProfile.setUser(new User(userId));
        userProfile.setSkills(profileDTO.getSkills());
        userProfile.setExperience(profileDTO.getExperience());
        userProfile.setInterests(profileDTO.getInterests());
        userProfile.setPhoneNumber(profileDTO.getPhoneNumber());
        userProfile.setAddress(profileDTO.getAddress());
        userProfile.setSummary(profileDTO.getSummary());

        userProfile = userProfileRepository.save(userProfile);

        return mapToDTO(userProfile);
    }

    private UserProfileDTO mapToDTO(UserProfile userProfile) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(userProfile.getId());
        dto.setUserId(userProfile.getUser().getId());
        dto.setSkills(userProfile.getSkills());
        dto.setEducation(userProfile.getEducation());
        dto.setExperience(userProfile.getExperience());
        dto.setLocation(userProfile.getLocation());
        dto.setInterests(userProfile.getInterests());
        return dto;
    }

    public List<ApprenticeshipDTO> getSuggestedApprenticeships(Long userId) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        // Fetch apprenticeships based on user profile (e.g., skills, location, etc.)
        List<Apprenticeship> apprenticeships = apprenticeshipRepository
                .findByCriteria(userProfile.getSkills(), userProfile.getLocation());

        return apprenticeships.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ApprenticeshipDTO mapToDTO(Apprenticeship apprenticeship) {
        ApprenticeshipDTO apprenticeshipDTO = new ApprenticeshipDTO();
        apprenticeshipDTO.setId(apprenticeship.getId());
        apprenticeshipDTO.setTitle(apprenticeship.getTitle());
        apprenticeshipDTO.setDescription(apprenticeship.getDescription());

        apprenticeshipDTO.setLocation(apprenticeship.getLocation());
        apprenticeshipDTO.setRequiredSkills(apprenticeship.getRequiredSkills()); // Assuming skills are a list/array apprenticeshipDTO.setDuration(apprenticeship.getDuration()); apprenticeshipDTO.setEmployerName(apprenticeship.getUser().getName()); // Linking user to apprenticeship return apprenticeshipDTO; }

        return apprenticeshipDTO;
    }

}