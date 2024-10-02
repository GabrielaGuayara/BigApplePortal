package com.bigappleportal.services.Impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.model.UserProfile;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.ApprenticeshipSpecifications;
import com.bigappleportal.repositories.UserProfileRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApprenticeshipServiceImpl implements IApprenticeshipService {


    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;


    @Override
    public Response getAllApprenticeships() {
        Response response = new Response();
        try {
            List<Apprenticeship> apprenticeships = apprenticeshipRepository.findAll();
            List<ApprenticeshipDTO> apprenticeshipDTOs = Utils.mapApprenticeshipListEntityToApprenticeshipListDTO(apprenticeships);
            response.setStatusCode(200);
            response.setMessage("Success");
            response.setApprenticeships(apprenticeshipDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching apprenticeships: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getApprenticeshipById(Long id) {
        Response response = new Response();
        try {
            Apprenticeship apprenticeship = apprenticeshipRepository.findById(id)
                    .orElseThrow(() -> new OurException("Apprenticeship not found"));
            ApprenticeshipDTO apprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(apprenticeship);
            response.setStatusCode(200);
            response.setMessage("Success");
            response.setApprenticeship(apprenticeshipDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching apprenticeship: " + e.getMessage());
        }
        return response;
    }


@Override
public Response createApprenticeship(Long userId, ApprenticeshipDTO apprenticeshipDTO) {
    Response response = new Response();
    try {
        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new OurException("User not found"));

        // Create and save the apprenticeship
        Apprenticeship apprenticeship = Utils.mapApprenticeshipDTOToApprenticeshipEntity(apprenticeshipDTO);
        apprenticeship.setUser(user);
        Apprenticeship savedApprenticeship = apprenticeshipRepository.save(apprenticeship);

        ApprenticeshipDTO savedApprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(savedApprenticeship);
        response.setStatusCode(201);
        response.setMessage("Apprenticeship created successfully.");
        response.setApprenticeship(savedApprenticeshipDTO);
    } catch (OurException e) {
        response.setStatusCode(404);
        response.setMessage(e.getMessage());
    } catch (Exception e) {
        response.setStatusCode(500);
        response.setMessage("Error occurred while creating the apprenticeship: " + e.getMessage());
    }
    return response;
}

    @Override
    public Response updateApprenticeship(Long userId, Long apprenticeshipId, ApprenticeshipDTO apprenticeshipDTO) {
        Response response = new Response();
        try {
            // Fetch the apprenticeship and user
            Apprenticeship apprenticeship = apprenticeshipRepository.findById(apprenticeshipId)
                    .orElseThrow(() -> new OurException("Apprenticeship not found"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User not found"));

            // Update apprenticeship details
            apprenticeship.setCompany(apprenticeshipDTO.getCompany());
            apprenticeship.setTitle(apprenticeshipDTO.getTitle());
            apprenticeship.setLocation(apprenticeshipDTO.getLocation());
            apprenticeship.setDescription(apprenticeshipDTO.getDescription());
            apprenticeship.setApprenticeshipType(apprenticeshipDTO.getApprenticeshipType());
            apprenticeship.setSalaryRange(apprenticeshipDTO.getSalaryRange());
            apprenticeship.setEducationLevel(apprenticeshipDTO.getEducationLevel());
            apprenticeship.setRequiredSkills(apprenticeshipDTO.getRequiredSkills());
            apprenticeship.setStatus(apprenticeshipDTO.getStatus());
            apprenticeship.setDatePosted(apprenticeshipDTO.getDatePosted());
            apprenticeship.setLogoURL(apprenticeshipDTO.getLogoURL());
            apprenticeship.setUser(user);

            Apprenticeship updatedApprenticeship = apprenticeshipRepository.save(apprenticeship);
            ApprenticeshipDTO updatedApprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(updatedApprenticeship);

            response.setStatusCode(200);
            response.setMessage("Apprenticeship updated successfully.");
            response.setApprenticeship(updatedApprenticeshipDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating the apprenticeship: " + e.getMessage());
        }
        return response;
    }



    @Override
    public Response deleteApprenticeship(Long apprenticeshipId, Long userId) {
        Response response = new Response();
        try {
            // Ensure the apprenticeship exists
            apprenticeshipRepository.findById(apprenticeshipId)
                    .orElseThrow(() -> new OurException("Apprenticeship not found"));

            apprenticeshipRepository.deleteById(apprenticeshipId);
            response.setStatusCode(200);
            response.setMessage("Apprenticeship deleted successfully.");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while deleting the apprenticeship: " + e.getMessage());
        }
        return response;
    }

//    @Override
//    public Response searchApprenticeships(String location, String apprenticeshipType, String experienceLevel) {
//        Response response = new Response();
//        try {
//            List<Apprenticeship> apprenticeships = apprenticeshipRepository.searchApprenticeships(location, apprenticeshipType, experienceLevel);
//            List<ApprenticeshipDTO> apprenticeshipDTOs = Utils.mapApprenticeshipListEntityToApprenticeshipListDTO(apprenticeships);
//            response.setStatusCode(200);
//            response.setMessage("Success");
//            response.setApprenticeshipList(apprenticeshipDTOs);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error searching apprenticeships: " + e.getMessage());
//        }
//        return response;
//    }
@Override
public Response getAllApprenticeshipsByUserId(Long userId) {
    Response response = new Response();
    try {
        List<Apprenticeship> apprenticeships = apprenticeshipRepository.findByUserId(userId);
        List<ApprenticeshipDTO> apprenticeshipDTOs = apprenticeships.stream()
                .map(Utils::mapApprenticeshipEntityToApprenticeshipDTO)
                .collect(Collectors.toList());

        response.setStatusCode(200);
        response.setMessage("Apprenticeships fetched successfully.");
        response.setApprenticeships(apprenticeshipDTOs); // This line should work now
    } catch (Exception e) {
        response.setStatusCode(500);
        response.setMessage("Error occurred while fetching apprenticeships: " + e.getMessage());
    }
    return response;
}




//This method will be used for future features for my application
    @Override
    public List<ApprenticeshipDTO> findByCriteria(List<String> skills, List<String> education, String keyword) {
        Specification<Apprenticeship> spec = Specification
                .where(ApprenticeshipSpecifications.hasSkills(skills))
                .and(ApprenticeshipSpecifications.hasEducation(education))
                .and(ApprenticeshipSpecifications.containsKeyword(keyword));

        List<Apprenticeship> apprenticeships = apprenticeshipRepository.findAll(spec);
        return apprenticeships.stream()
                .map(Utils::mapApprenticeshipEntityToApprenticeshipDTO) // Use the mapping utility here
                .collect(Collectors.toList());
    }




    // Complete the mapping function here
    private ApprenticeshipDTO mapToDTO(Apprenticeship apprenticeship) {
        ApprenticeshipDTO apprenticeshipDTO = new ApprenticeshipDTO();
        apprenticeshipDTO.setId(apprenticeship.getId());
        apprenticeshipDTO.setTitle(apprenticeship.getTitle());
        apprenticeshipDTO.setCompany(apprenticeship.getCompany());
        apprenticeshipDTO.setDescription(apprenticeship.getDescription());
        apprenticeshipDTO.setLocation(apprenticeship.getLocation());
        apprenticeshipDTO.setApprenticeshipType(apprenticeship.getApprenticeshipType());
        apprenticeshipDTO.setDatePosted(apprenticeship.getDatePosted());
        apprenticeshipDTO.setEducationLevel(apprenticeship.getEducationLevel());
        apprenticeshipDTO.setRequiredSkills(apprenticeship.getRequiredSkills());
        apprenticeshipDTO.setSalaryRange(apprenticeship.getSalaryRange());
        apprenticeshipDTO.setStatus(apprenticeship.getStatus());
        return apprenticeshipDTO;
    }


    @Override
    public Response suggestApprenticeships(Long userId) {
        Response response = new Response();
        try {
            UserProfile userProfile = userProfileRepository.findByUserId(userId)
                    .orElseThrow(() -> new OurException("UserProfile not found"));

            // Ensure user profile is complete
            if (!userProfile.isComplete()) {
                response.setStatusCode(400);
                response.setMessage("User profile is not complete.");
                return response;
            }

            // Collect experience as a list
            List<String> experienceLevels = List.of(userProfile.getEducationLevel());

            // Call findByCriteria with the correct parameters
            List<ApprenticeshipDTO> apprenticeshipDTOs = findByCriteria(userProfile.getSkills(),
                    experienceLevels,
                    null); // You may pass a keyword if needed

            response.setStatusCode(200);
            response.setMessage("Suggested apprenticeships fetched successfully.");
            response.setApprenticeships(apprenticeshipDTOs);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error fetching suggested apprenticeships: " + e.getMessage());
        }
        return response;
    }





}



