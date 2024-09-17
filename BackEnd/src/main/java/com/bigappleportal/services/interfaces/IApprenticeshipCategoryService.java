package com.bigappleportal.services.interfaces;

import com.bigappleportal.dto.ApprenticeshipCategoryDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.ApprenticeshipCategory;

public interface IApprenticeshipCategoryService {
    Response createCategory(ApprenticeshipCategory category);
    Response updateCategory(ApprenticeshipCategory category);
    Response deleteCategory(String categoryId);
    Response getCategoryById(String categoryId);
    Response getAllCategories();

}



