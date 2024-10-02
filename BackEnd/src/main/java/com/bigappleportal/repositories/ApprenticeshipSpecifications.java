package com.bigappleportal.repositories;

import org.springframework.data.jpa.domain.Specification;
import com.bigappleportal.model.Apprenticeship;

import java.util.List;

//This class includes code I want to use to match applications with employees
public class ApprenticeshipSpecifications {


    public static Specification<Apprenticeship> hasSkills(List<String> skills) {
        return (root, query, criteriaBuilder) -> {
            if (skills == null || skills.isEmpty()) {
                return criteriaBuilder.conjunction(); // No filter
            }
            return root.get("requiredSkills").in(skills); // Ensure you reference the correct field
        };
    }

    public static Specification<Apprenticeship> hasEducation(List<String> education) {
        return (root, query, criteriaBuilder) -> {
            if (education == null || education.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return root.get("educationLevel").in(education); // Ensure you reference the correct field
        };
    }

    public static Specification<Apprenticeship> containsKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.or(
                    criteriaBuilder.like(root.get("title"), "%" + keyword + "%"),
                    criteriaBuilder.like(root.get("description"), "%" + keyword + "%")
            );
        };
    }


}




