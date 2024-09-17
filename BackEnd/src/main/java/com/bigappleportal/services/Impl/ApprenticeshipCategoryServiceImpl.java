package com.bigappleportal.services.Impl;

import com.bigappleportal.dto.ApprenticeshipCategoryDTO;
import com.bigappleportal.dto.Response;
import com.bigappleportal.model.ApprenticeshipCategory;
import com.bigappleportal.repositories.ApprenticeshipCategoryRepository;
import com.bigappleportal.services.interfaces.IApprenticeshipCategoryService;
import com.bigappleportal.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApprenticeshipCategoryServiceImpl implements IApprenticeshipCategoryService {
    @Autowired
    private ApprenticeshipCategoryRepository categoryRepository;

    @Override
    public Response createCategory(ApprenticeshipCategory category) {
        Response response = new Response();
        try {
            ApprenticeshipCategory savedCategory = categoryRepository.save(category);
            ApprenticeshipCategoryDTO categoryDTO = Utils.mapApprenticeshipCategoryEntityToApprenticeshipCategoryDTO(savedCategory);
            response.setStatusCode(200);
            response.setCategory(categoryDTO);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error creating category: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateCategory(ApprenticeshipCategory category) {
        Response response = new Response();
        try {
            if (categoryRepository.existsById(category.getId())) {
                ApprenticeshipCategory updatedCategory = categoryRepository.save(category);
                ApprenticeshipCategoryDTO categoryDTO = Utils.mapApprenticeshipCategoryEntityToApprenticeshipCategoryDTO(updatedCategory);
                response.setStatusCode(200);
                response.setCategory(categoryDTO);
            } else {
                throw new RuntimeException("Category Not Found");
            }
        } catch (RuntimeException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating category: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteCategory(String categoryId) {
        Response response = new Response();
        try {
            categoryRepository.findById(Long.valueOf(categoryId)).orElseThrow(() -> new RuntimeException("Category Not Found"));
            categoryRepository.deleteById(Long.valueOf(categoryId));
            response.setStatusCode(200);
            response.setMessage("Successful");
        } catch (RuntimeException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting category: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getCategoryById(String categoryId) {
        Response response = new Response();
        try {
            ApprenticeshipCategory category = categoryRepository.findById(Long.valueOf(categoryId)).orElseThrow(() -> new RuntimeException("Category Not Found"));
            ApprenticeshipCategoryDTO categoryDTO = Utils.mapApprenticeshipCategoryEntityToApprenticeshipCategoryDTO(category);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCategory(categoryDTO);
        } catch (RuntimeException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting category by ID: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllCategories() {
        Response response = new Response();
        try {
            List<ApprenticeshipCategory> categoryList = categoryRepository.findAll();
            List<ApprenticeshipCategoryDTO> categoryDTOList = Utils.mapApprenticeshipCategoryListEntityToApprenticeshipCategoryListDTO(categoryList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setCategoryList(categoryDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all categories: " + e.getMessage());
        }
        return response;
    }
}



