package com.bigappleportal.services;

import com.bigappleportal.exceptions.OurException;
import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new OurException("User with email not found"));
        return buildUserDetails(user);
    }

    private UserDetails buildUserDetails(User user) {
        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getEmail());
        builder.password(user.getPassword());
        builder.authorities(Collections.singleton(new SimpleGrantedAuthority(user.getRole())));
        return builder.build();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new OurException("User with email not found"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new OurException("User with ID not found"));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}



