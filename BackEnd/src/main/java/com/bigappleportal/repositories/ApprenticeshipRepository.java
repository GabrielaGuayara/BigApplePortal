package com.bigappleportal.repositories;


import com.bigappleportal.model.Apprenticeship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApprenticeshipRepository extends JpaRepository<Apprenticeship, Long> {

    List<Apprenticeship> findByCategoryId(Long categoryId);

    List<Apprenticeship> findByUserId(Long userId);

    @Query("SELECT a FROM Apprenticeship a WHERE a.status = :status")
    List<Apprenticeship> findByStatus(String status);

    @Query("SELECT a FROM Apprenticeship a WHERE a.id = :id AND a.user.id = :userId")
    Optional<Apprenticeship> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT a FROM Apprenticeship a WHERE a.status = 'OPEN' AND a.datePosted >= CURRENT_DATE")
    List<Apprenticeship> findOpenAndRecentApprenticeships();
}



