package com.bigappleportal.repositories;

import com.bigappleportal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);

    List<Application> findByApprenticeshipId(Long apprenticeshipId);

    @Query("SELECT a FROM Application a WHERE a.status = :status")
    List<Application> findByStatus(String status);

    @Query("SELECT a FROM Application a WHERE a.id = :id AND a.user.id = :userId")
    Optional<Application> findByIdAndUserId(Long id, Long userId);
}



