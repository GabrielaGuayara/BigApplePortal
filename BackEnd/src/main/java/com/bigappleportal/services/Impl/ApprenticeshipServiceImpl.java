package com.bigappleportal.services.Impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import com.bigappleportal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApprenticeshipServiceImpl implements IApprenticeshipService {


    @Autowired
    private ApprenticeshipRepository apprenticeshipRepository;

    @Autowired
    private UserRepository userRepository;



//    @Override
//    public Response createApprenticeship(Apprenticeship apprenticeship) {
//        Response response = new Response();
//        try {
//            Apprenticeship savedApprenticeship = apprenticeshipRepository.save(apprenticeship);
//            ApprenticeshipDTO apprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(savedApprenticeship);
//            response.setStatusCode(200);
//            response.setMessage("Apprenticeship created successfully");
//            response.setApprenticeship(apprenticeshipDTO);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while creating the apprenticeship: " + e.getMessage());
//        }
//        return response;
//    }

//    @Override
//    public Response updateApprenticeship(Apprenticeship apprenticeship) {
//        Response response = new Response();
//        try {
//            if (!apprenticeshipRepository.existsById(apprenticeship.getId())) {
//                throw new OurException("Apprenticeship with ID " + apprenticeship.getId() + " not found.");
//            }
//            Apprenticeship updatedApprenticeship = apprenticeshipRepository.save(apprenticeship);
//            ApprenticeshipDTO apprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(updatedApprenticeship);
//            response.setStatusCode(200);
//            response.setMessage("Apprenticeship updated successfully");
//            response.setApprenticeship(apprenticeshipDTO);
//        } catch (OurException e) {
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while updating the apprenticeship: " + e.getMessage());
//        }
//        return response;
//    }

//    @Override
//    public Response deleteApprenticeship(String id) {
//        Response response = new Response();
//        try {
//            Apprenticeship apprenticeship = apprenticeshipRepository.findById(Long.valueOf(id))
//                    .orElseThrow(() -> new OurException("Apprenticeship with ID " + id + " not found."));
//            apprenticeshipRepository.delete(apprenticeship);
//            response.setStatusCode(200);
//            response.setMessage("Apprenticeship deleted successfully");
//        } catch (OurException e) {
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while deleting the apprenticeship: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @Override
//    public Response getApprenticeshipById(String id) {
//        Response response = new Response();
//        try {
//            Apprenticeship apprenticeship = apprenticeshipRepository.findById(Long.valueOf(id))
//                    .orElseThrow(() -> new OurException("Apprenticeship with ID " + id + " not found."));
//            ApprenticeshipDTO apprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(apprenticeship);
//            response.setStatusCode(200);
//            response.setApprenticeship(apprenticeshipDTO);
//            response.setMessage("Apprenticeship fetched successfully");
//        } catch (OurException e) {
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while fetching the apprenticeship: " + e.getMessage());
//        }
//        return response;
//    }

//    @Override
//    public Response getAllApprenticeships() {
//        Response response = new Response();
//        try {
//            List<Apprenticeship> apprenticeshipList = apprenticeshipRepository.findAll();
//            List<ApprenticeshipDTO> apprenticeshipDTOList = Utils.mapApprenticeshipListEntityToApprenticeshipListDTO(apprenticeshipList);
//            response.setStatusCode(200);
//            response.setMessage("All apprenticeships fetched successfully");
//            response.setApprenticeshipList(apprenticeshipDTOList);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while fetching all apprenticeships: " + e.getMessage());
//        }
//        return response;
//    }



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




//    @Override
//    public Response getAllApprenticeships() {
//        Response response = new Response();
//        try {
//            List<Apprenticeship> apprenticeships = apprenticeshipRepository.findAll();
//            List<ApprenticeshipDTO> apprenticeshipDTOs = Utils.mapApprenticeshipListToDTOList(apprenticeships);
//            response.setStatusCode(200);
//            response.setMessage("Successfully fetched all apprenticeships.");
//            response.setApprenticeshipList(apprenticeshipDTOs);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while fetching all apprenticeships: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @Override
//    public Response getApprenticeshipById(Long id) {
//        Response response = new Response();
//        try {
//            Apprenticeship apprenticeship = apprenticeshipRepository.findById(id)
//                    .orElseThrow(() -> new NotFoundException("Apprenticeship not found"));
//            ApprenticeshipDTO apprenticeshipDTO = Utils.mapApprenticeshipEntityToApprenticeshipDTO(apprenticeship);
//            response.setStatusCode(200);
//            response.setMessage("Successfully fetched apprenticeship.");
//            response.setApprenticeship(apprenticeshipDTO);
//        } catch (NotFoundException e) {
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while fetching apprenticeship: " + e.getMessage());
//        }
//        return response;
//    }
//
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
            apprenticeship.setCompany(apprenticeship.getCompany());
            apprenticeship.setTitle(apprenticeshipDTO.getTitle());
            apprenticeship.setLocation(apprenticeshipDTO.getLocation());
            apprenticeship.setDescription(apprenticeshipDTO.getDescription());
            apprenticeship.setApprenticeshipType(apprenticeshipDTO.getApprenticeshipType());
            apprenticeship.setSalaryRange(apprenticeshipDTO.getSalaryRange());
            apprenticeship.setExperienceLevel(apprenticeshipDTO.getExperienceLevel());
            apprenticeship.setRequiredSkills(apprenticeshipDTO.getRequiredSkills());
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








}