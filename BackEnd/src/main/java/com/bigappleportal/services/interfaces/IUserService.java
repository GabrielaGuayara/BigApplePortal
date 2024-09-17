package com.bigappleportal.services.interfaces;


import com.bigappleportal.dto.LoginRequest;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.User;



public interface IUserService {
        Response register(User user);
        Response login(LoginRequest loginRequest);
        Response getAllUsers();

        Response getApplicationHistory(String userId);

        Response deleteUser(String userId);
        Response getUserById(String userId);
        Response getMyInfo(String email);
    }




