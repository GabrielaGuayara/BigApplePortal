package com.bigappleportal.repositories;

import com.bigappleportal.model.Apprenticeship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
public interface ApprenticeshipRepository extends JpaRepository<Apprenticeship, Long>, JpaSpecificationExecutor<Apprenticeship> {

    List<Apprenticeship> findByUserId(Long userId);




}