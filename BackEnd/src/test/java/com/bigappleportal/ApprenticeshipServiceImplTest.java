package com.bigappleportal;

import com.bigappleportal.dto.ApprenticeshipDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.ApprenticeshipRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.Impl.ApprenticeshipServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApprenticeshipServiceImplTest {

    @Mock
    private ApprenticeshipRepository apprenticeshipRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApprenticeshipServiceImpl apprenticeshipService;

    private User user;
    private Apprenticeship existingApprenticeship;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Set up a sample user
        user = new User();
        user.setId(1L);
        user.setEmail("user@example.com");

        // Set up a sample existing apprenticeship
        existingApprenticeship = new Apprenticeship();
        existingApprenticeship.setId(1L);
        existingApprenticeship.setTitle("Original Title");
        existingApprenticeship.setCompany("Original Company");
    }

    @Test
    void testUpdateApprenticeship_Success() {
        // Given
        Long apprenticeshipId = 1L;
        Long userId = 1L;

        ApprenticeshipDTO apprenticeshipDTO = new ApprenticeshipDTO();
        apprenticeshipDTO.setTitle("Updated Title");
        apprenticeshipDTO.setCompany("Updated Company");
        apprenticeshipDTO.setLocation("Updated Location");
        apprenticeshipDTO.setDescription("Updated Description");
        apprenticeshipDTO.setApprenticeshipType("Internship");
        apprenticeshipDTO.setSalaryRange("30000-40000");
        apprenticeshipDTO.setEducationLevel("Bachelor's");
        apprenticeshipDTO.setRequiredSkills("Java");
        apprenticeshipDTO.setStatus("Active");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(apprenticeshipRepository.findById(apprenticeshipId)).thenReturn(Optional.of(existingApprenticeship));
        when(apprenticeshipRepository.save(any(Apprenticeship.class))).thenReturn(existingApprenticeship);

        // When
        Response response = apprenticeshipService.updateApprenticeship(userId, apprenticeshipId, apprenticeshipDTO);

        // Then
        assertEquals(200, response.getStatusCode());
        assertEquals("Apprenticeship updated successfully.", response.getMessage());
        assertEquals("Updated Title", response.getApprenticeship().getTitle());
        assertEquals("Updated Company", response.getApprenticeship().getCompany());

        // Verify interactions
        verify(userRepository).findById(userId);
        verify(apprenticeshipRepository).findById(apprenticeshipId);
        verify(apprenticeshipRepository).save(any(Apprenticeship.class));
    }
}
