package com.bigappleportal;

import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        }

        @Test
        void testFindByEmail() {
            when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

            Optional<User> user = userRepository.findByEmail("test@example.com");
            assertTrue(user.isPresent());
            assertEquals("test@example.com", user.get().getEmail());
        }

        @Test
        void testExistsByEmail() {
            when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

            boolean exists = userRepository.existsByEmail("test@example.com");
            assertTrue(exists);
        }
    }


