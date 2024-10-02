package com.bigappleportal;

import com.bigappleportal.dto.EmployeeDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.Impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User existingUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        existingUser = new User();
        existingUser.setId(1L);
        existingUser.setName("Old User");
        existingUser.setEmail("olduser@example.com");
    }

    @Test
    void testUpdateUser_Success() {
        // Arrange
        EmployeeDTO updateUserDto = new EmployeeDTO();
        updateUserDto.setName("Updated User");
        updateUserDto.setEmail("updateduser@example.com");

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(existingUser);

        // Act
        Response response = userService.updateUser(1L, updateUserDto);

        // Assert
        assertEquals(200, response.getStatusCode());
        assertNotNull(response.getUser());
        assertEquals("Updated User", response.getUser().getName());
        assertEquals("updateduser@example.com", response.getUser().getEmail());

        // Verify that the user details were updated
        assertEquals("Updated User", existingUser.getName());
        assertEquals("updateduser@example.com", existingUser.getEmail());

        verify(userRepository).findById(1L);
        verify(userRepository).save(existingUser);
    }
}
