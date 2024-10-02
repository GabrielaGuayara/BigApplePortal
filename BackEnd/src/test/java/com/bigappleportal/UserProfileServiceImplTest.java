package com.bigappleportal;

import com.bigappleportal.dto.Response;
import com.bigappleportal.model.User;
import com.bigappleportal.model.UserProfile;
import com.bigappleportal.repositories.UserProfileRepository;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.Impl.UserProfileServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserProfileServiceImplTest {

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserProfileServiceImpl userProfileService;

    private User existingUser;
    private UserProfile existingUserProfile;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        existingUser = new User();
        existingUser.setId(1L);
        existingUser.setName("Test User");
        existingUser.setEmail("testuser@example.com");

        existingUserProfile = new UserProfile();
        existingUserProfile.setId(1L);
        existingUserProfile.setUser(existingUser);
        existingUserProfile.setPhoneNumber("123-456-7890");
        existingUserProfile.setSummary("Initial summary.");
    }

    @Test
    void testDeleteUserProfile_Success() {
        // Arrange
        when(userProfileRepository.findByUserId(1L)).thenReturn(java.util.Optional.of(existingUserProfile));

        // Act
        Response response = userProfileService.deleteUserProfile(1L);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertEquals("User profile deleted successfully", response.getMessage());

        // Verify that the user profile was deleted
        verify(userProfileRepository).findByUserId(1L);
        verify(userProfileRepository).delete(existingUserProfile);
    }
}
