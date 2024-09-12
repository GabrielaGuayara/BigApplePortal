package com.bigappleportal.services;

import com.bigappleportal.dto.UserProfileDto;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }


    public void createUser(String username, String password, String role)
    { User user = new User(); user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);
        userRepository.save(user); }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("ADMIN", "EMPLOYEE", "EMPLOYER")
                .build();
    }


        public void updateUserProfile(UserProfileDto userProfileDTO) {
        User user = userRepository.findById(userProfileDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setSkills(userProfileDTO.getSkills());
        user.setEducation(userProfileDTO.getEducation());
        user.setWorkExperience(userProfileDTO.getWorkExperience());
        user.setPictureURL(userProfileDTO.getPictureURL());
        user.setResumeURL(userProfileDTO.getResumeURL());
        userRepository.save(user);
    }


}



