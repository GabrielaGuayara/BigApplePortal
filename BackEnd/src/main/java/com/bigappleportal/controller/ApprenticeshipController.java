package com.bigappleportal.controller;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.services.interfaces.IApprenticeshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apprenticeships")
public class ApprenticeshipController {

    @Autowired
    private IApprenticeshipService apprenticeshipService;


    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('EMPLOYER')")
    public ResponseEntity<Response> createNewApprenticeship(
            @PathVariable Long userId,
            @PathVariable Long categoryId,
            @RequestBody ApprenticeshipDTO apprenticeshipDTO) {


        Response response = apprenticeshipService.createApprenticeship(
                userId,
                categoryId,
                apprenticeshipDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }




    @PostMapping("/post-apprenticeship/{userId}/{categoryId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER')")
    public ResponseEntity<Response> createApprenticeship(
            @PathVariable Long userId,
            @PathVariable Long categoryId,
            @RequestBody ApprenticeshipDTO apprenticeshipDTO) {


        Response response = apprenticeshipService.createApprenticeship(
                userId,
                categoryId,
                apprenticeshipDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



    @PutMapping("/update-by-id/{userId}/{categoryId}/{apprenticeshipId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Response> updateApprenticeship(
            @PathVariable Long userId,
            @PathVariable Long categoryId,
            @PathVariable Long apprenticeshipId,
            @RequestBody ApprenticeshipDTO apprenticeshipDTO) {


        Response response = apprenticeshipService.updateApprenticeship(userId, categoryId, apprenticeshipId, apprenticeshipDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }



    @DeleteMapping("/delete/{apprenticeshipId}/{userId}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER', 'ADMIN')")
    public ResponseEntity<Response> deleteApprenticeship(
            @PathVariable Long apprenticeshipId,
            @PathVariable Long userId) {


        Response response = apprenticeshipService.deleteApprenticeship(apprenticeshipId, userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }





//    @PostMapping("/post-apprenticeship/{employerId}/{userId}")
//    @PreAuthorize("hasAuthority('EMPLOYER')")
//    public ResponseEntity<Response> createApprenticeship(
//            @PathVariable Long employerId,
//            @PathVariable Long userId,
//            @RequestBody Apprenticeship apprenticeship) {
//        Response response = apprenticeshipService.createApprenticeship(apprenticeship);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }
//
//    @PutMapping("/update-by-id/{employerId}/{userId}")
//    @PreAuthorize("hasAuthority('EMPLOYER')")
//    public ResponseEntity<Response> updateApprenticeship(@PathVariable String id, @RequestBody Apprenticeship apprenticeship) {
//        apprenticeship.setId(Long.valueOf(id));
//        Response response = apprenticeshipService.updateApprenticeship(apprenticeship);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }
//
//    @DeleteMapping("/employer/delete-apprenticeship/by-id/{id}")
//    @PreAuthorize("hasAuthority('EMPLOYER')")
//    public ResponseEntity<Response> deleteApprenticeship(@PathVariable String id) {
//        Response response = apprenticeshipService.deleteApprenticeship(id);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

//    @GetMapping("/employer/get-apprenticeship/by-id/{id}")
//    public ResponseEntity<Response> getApprenticeshipById(@PathVariable String id) {
//        Response response = apprenticeshipService.getApprenticeshipById(id);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

//    @GetMapping("/all")
//    public ResponseEntity<Response> getAllApprenticeships() {
//        Response response = apprenticeshipService.getAllApprenticeships();
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }



//    // Filter apprenticeships by location, type, etc.
//    @GetMapping("/search")
//    public ResponseEntity<Response> searchApprenticeships(
//            @RequestParam(value = "location", required = false) String location,
//            @RequestParam(value = "apprenticeshipType", required = false) String apprenticeshipType,
//            @RequestParam(value = "experienceLevel", required = false) String experienceLevel
//    ) {
//        try {
//            Response response = apprenticeshipService.searchApprenticeships(location, apprenticeshipType, experienceLevel);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Response response = new Response();
//            response.setStatusCode(500);
//            response.setMessage("Error occurred while searching apprenticeships: " + e.getMessage());
//            return ResponseEntity.status(500).body(response);
//        }
//    }

}



