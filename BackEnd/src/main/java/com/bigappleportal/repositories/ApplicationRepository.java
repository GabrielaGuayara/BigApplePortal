package com.bigappleportal.repositories;

import com.bigappleportal.model.Application;
import com.bigappleportal.model.Apprenticeship;
import com.bigappleportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {


    @Query("SELECT a FROM Application a WHERE a.status = :status")
    List<Application> findByStatus(String status);


    List<Application> findByUser(User user);

    List<Application> findByApprenticeship(Apprenticeship apprenticeship);

    boolean existsByUserAndApprenticeship(User user, Apprenticeship apprenticeship);

    Application findByIdAndUserId(Long applicationId, Long userId);
    List<Application> findByUserId(Long userId);
    List<Application> findByApprenticeshipId(Long apprenticeshipId);

}