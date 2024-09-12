package com.bigappleportal.repositories;

import com.bigappleportal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByApprenticeshipId(Integer apprenticeshipId);
}



