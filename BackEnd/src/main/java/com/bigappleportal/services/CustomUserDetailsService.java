package com.bigappleportal.services;

import com.bigappleportal.model.User;
import com.bigappleportal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    //Inject the userReposity to interact with the database
    @Autowired
    private UserRepository userRepository;

    //Methods to load user details by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Attemp to find a user by email
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Email not found: " + email);
        }

        // The User class implements UserDetails, so we can directly return the user.
        return userOptional.get();
    }
}



