package com.bigappleportal.repositories;

import com.bigappleportal.model.ApprenticeshipCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ApprenticeshipCategoryRepository extends JpaRepository<ApprenticeshipCategory, Long> {

    Optional<ApprenticeshipCategory> findByName(String name);

    @Query("SELECT c FROM ApprenticeshipCategory c")
    List<ApprenticeshipCategory> findAllCategories();
}



