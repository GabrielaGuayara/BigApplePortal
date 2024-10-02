//package com.bigappleportal.config;
//
//import com.bigappleportal.model.Apprenticeship;
//import com.bigappleportal.model.Application;
//import com.bigappleportal.model.User;
//import com.bigappleportal.model.UserProfile;
//import com.bigappleportal.repositories.ApprenticeshipRepository;
//import com.bigappleportal.repositories.ApplicationRepository;
//import com.bigappleportal.repositories.UserProfileRepository;
//import com.bigappleportal.repositories.UserRepository;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.persistence.EntityNotFoundException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.List;
//
//@Component
//public class LoadJsonData implements CommandLineRunner {
//
//    private static final Logger logger = LoggerFactory.getLogger(LoadJsonData.class);
//
//    @Autowired
//    private ApprenticeshipRepository apprenticeshipRepository;
//
//    @Autowired
//    private ApplicationRepository applicationRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private UserProfileRepository userProfileRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        loadUsers();
//        loadApprenticeships();
//        loadProfiles();
//        loadApplications();
//
//    }
//
//    private void loadProfiles() {
//        ObjectMapper mapper = new ObjectMapper();
//        TypeReference<List<UserProfile>> typeReference = new TypeReference<List<UserProfile>>() {};
//        InputStream inputStream = null;
//        try {
//            inputStream = new ClassPathResource("/Data/userProfiles.json").getInputStream();
//            List<UserProfile> userProfiles = mapper.readValue(inputStream, typeReference);
//            userProfileRepository.saveAll(userProfiles);
//            logger.info("Users profile loaded successfully.");
//        } catch (IOException e) {
//            logger.error("Unable to load user profiles: " + e.getMessage());
//        } finally {
//            if (inputStream != null) {
//                try {
//                    inputStream.close();
//                } catch (IOException e) {
//                    logger.error("Unable to close input stream: " + e.getMessage());
//                }
//            }
//        }
//    }
//
//    private void loadApprenticeships() {
//        ObjectMapper mapper = new ObjectMapper();
//        TypeReference<List<Apprenticeship>> typeReference = new TypeReference<List<Apprenticeship>>() {};
//        InputStream inputStream = null;
//        try {
//            inputStream = new ClassPathResource("/Data/apprenticeships.json").getInputStream();
//            List<Apprenticeship> apprenticeships = mapper.readValue(inputStream, typeReference);
//
//            for (Apprenticeship apprenticeship : apprenticeships) {
//                if (apprenticeship.getUser() != null) {
//                    // Fetch the User by ID
//                    User user = userRepository.findById(apprenticeship.getUser().getId())
//                            .orElseThrow(() -> new EntityNotFoundException("User not found for ID: " + apprenticeship.getUser().getId()));
//                    apprenticeship.setUser(user);
//                }
//            }
//
//            apprenticeshipRepository.saveAll(apprenticeships);
//            logger.info("Apprenticeships loaded successfully.");
//        } catch (IOException e) {
//            logger.error("Unable to load apprenticeships: " + e.getMessage());
//        } finally {
//            if (inputStream != null) {
//                try {
//                    inputStream.close();
//                } catch (IOException e) {
//                    logger.error("Unable to close input stream: " + e.getMessage());
//                }
//            }
//        }
//    }
//
//    private void loadApplications() {
//        ObjectMapper mapper = new ObjectMapper();
//        TypeReference<List<Application>> typeReference = new TypeReference<List<Application>>() {};
//        InputStream inputStream = null;
//        try {
//            inputStream = new ClassPathResource("/Data/applications.json").getInputStream();
//            List<Application> applications = mapper.readValue(inputStream, typeReference);
//            applicationRepository.saveAll(applications);
//            logger.info("Applications loaded successfully.");
//        } catch (IOException e) {
//            logger.error("Unable to load applications: " + e.getMessage());
//        } finally {
//            if (inputStream != null) {
//                try {
//                    inputStream.close();
//                } catch (IOException e) {
//                    logger.error("Unable to close input stream: " + e.getMessage());
//                }
//            }
//        }
//    }
//
//    private void loadUsers() {
//        ObjectMapper mapper = new ObjectMapper();
//        TypeReference<List<User>> typeReference = new TypeReference<List<User>>() {};
//        InputStream inputStream = null;
//        try {
//            inputStream = new ClassPathResource("/Data/users.json").getInputStream();
//            List<User> users = mapper.readValue(inputStream, typeReference);
//            userRepository.saveAll(users);
//            logger.info("Users loaded successfully.");
//        } catch (IOException e) {
//            logger.error("Unable to load users: " + e.getMessage());
//        } finally {
//            if (inputStream != null) {
//                try {
//                    inputStream.close();
//                } catch (IOException e) {
//                    logger.error("Unable to close input stream: " + e.getMessage());
//                }
//            }
//        }
//    }
//}
//
//
