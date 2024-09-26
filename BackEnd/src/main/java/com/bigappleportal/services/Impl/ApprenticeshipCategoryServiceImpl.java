//package com.bigappleportal.services.Impl;
//
//import com.bigappleportal.dto.ApprenticeshipCategoryDTO;
//import com.bigappleportal.exceptions.OurException;
//import com.bigappleportal.model.ApprenticeshipCategory;
//import com.bigappleportal.repositories.ApprenticeshipCategoryRepository;
//import com.bigappleportal.services.interfaces.IApprenticeshipCategoryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//public class ApprenticeshipCategoryServiceImpl implements IApprenticeshipCategoryService {
//
//    @Autowired
//    private ApprenticeshipCategoryRepository categoryRepository;
//
//    @Override
//    public ApprenticeshipCategoryDTO createCategory(ApprenticeshipCategoryDTO categoryDTO) {
//        ApprenticeshipCategory category = new ApprenticeshipCategory();
//        category.setName(categoryDTO.getName());
//        ApprenticeshipCategory savedCategory = categoryRepository.save(category);
//        return convertToDTO(savedCategory);
//    }
//
//    @Override
//    public Optional<ApprenticeshipCategoryDTO> updateCategory(Integer categoryId, ApprenticeshipCategoryDTO categoryDTO) {
//        ApprenticeshipCategory existingCategory = categoryRepository.findById(categoryId)
//                .orElseThrow(() -> new OurException("Category not found"));
//
//        existingCategory.setName(categoryDTO.getName());
//        ApprenticeshipCategory updatedCategory = categoryRepository.save(existingCategory);
//        return Optional.of(convertToDTO(updatedCategory));
//    }
//
//    @Override
//    public void deleteCategory(Integer categoryId) {
//        categoryRepository.deleteById(categoryId);
//    }
//
//    @Override
//    public List<ApprenticeshipCategoryDTO> getAllCategories() {
//        return categoryRepository.findAll()
//                .stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public Optional<ApprenticeshipCategoryDTO> getCategoryById(Integer id) {
//        return categoryRepository.findById(id).map(this::convertToDTO);
//    }
//
//    // Helper method to convert to DTO
//    private ApprenticeshipCategoryDTO convertToDTO(ApprenticeshipCategory category) {
//        ApprenticeshipCategoryDTO dto = new ApprenticeshipCategoryDTO();
//        dto.setId(category.getId());
//        dto.setName(category.getName());
//        return dto;
//    }
//}
//
//
