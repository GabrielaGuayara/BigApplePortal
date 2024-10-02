package com.bigappleportal.repositories;

import com.bigappleportal.model.Application;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {


    List<Application> findByUserId(Long userId);

}