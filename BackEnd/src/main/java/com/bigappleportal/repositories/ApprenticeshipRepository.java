package com.bigappleportal.repositories;

import com.bigappleportal.model.Apprenticeship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApprenticeshipRepository extends JpaRepository<Apprenticeship, Integer> {
    // Custom query to find all apprenticeships by job category
    List<Apprenticeship> findByJobCategoryId(Integer jobCategoryId);
}



