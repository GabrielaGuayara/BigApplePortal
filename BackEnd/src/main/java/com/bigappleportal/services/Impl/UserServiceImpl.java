
package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.*;
import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import com.bigappleportal.services.interfaces.IUserService;
import com.bigappleportal.utils.JWTUtils;
import com.bigappleportal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

//Implement IUserService interface for user-related operations
@Service
public class UserServiceImpl implements IUserService {

    //Inject userRepository for user data access
    @Autowired
    private UserRepository userRepository;

    //Encoder for hashing passwords
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Utility for JWT operations
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    //Method for user registration
    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            //Set default role if not provided
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }

            //Check if the email already exits
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + " Already Exists");
            }

            //Encode the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Registration " + e.getMessage());
        }
        return response;
    }

    //Method for user login
    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            //Authenticated user credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("User Not Found"));
            //Here is where the token get generated
            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("Successful");
            response.setId(user.getId());
            response.setName(user.getName());

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During User Login " + e.getMessage());
        }
        return response;
    }

    //Method to get all the users
    @Override
    public Response getAllUsers() {
        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUserList(userDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;
    }

    //Method to add a new admin
    @Override
    public Response addAdmin(AdminRequest adminRequest) {
        Response response = new Response();
        try {
            // Validate the input
            if (adminRequest.getName() == null || adminRequest.getName().isBlank()) {
                throw new OurException("Username cannot be empty");
            }
            if (adminRequest.getEmail() == null || adminRequest.getEmail().isBlank()) {
                throw new OurException("Email cannot be empty");
            }
            if (adminRequest.getPassword() == null || adminRequest.getPassword().isBlank()) {
                throw new OurException("Password cannot be empty");
            }

            // Check if the email already exists
            if (userRepository.existsByEmail(adminRequest.getEmail())) {
                throw new OurException(adminRequest.getEmail() + " already exists");
            }

            // Create new User entity
            User adminUser = new User();
            adminUser.setName(adminRequest.getName());
            adminUser.setEmail(adminRequest.getEmail());
            adminUser.setPassword(passwordEncoder.encode(adminRequest.getPassword()));
            adminUser.setRole("ADMIN");  // Set the role to ADMIN

            // Save the user
            User savedUser = userRepository.save(adminUser);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during admin registration: " + e.getMessage());
        }
        return response;
    }


    //Method to update user details
    @Override
    public Response updateUser(Long userId, EmployeeDTO employeeDTO) {
        Response response = new Response();
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User not found"));

            // Update user details
            user.setName(employeeDTO.getName());
            user.setEmail(employeeDTO.getEmail());


            User updatedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(updatedUser);

            response.setStatusCode(200);
            response.setUser(userDTO);
            response.setMessage("User profile updated successfully");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred while updating user profile: " + e.getMessage());
        }
        return response;
    }

    //Method to get user's application history
    @Override
    public Response getApplicationHistory(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOWithApplications(user);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user application history " + e.getMessage());
        }
        return response;
    }

    //Method to delete a user
    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user " + e.getMessage());
        }
        return response;
    }

    //Method to get user by ID
    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user by ID " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new OurException("User Not Found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user info " + e.getMessage());
        }
        return response;
    }
}
