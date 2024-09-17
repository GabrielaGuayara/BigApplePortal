package com.bigappleportal.controller;

import com.bigappleportal.dto.Response;
import com.bigappleportal.model.ApprenticeshipCategory;
import com.bigappleportal.services.interfaces.IApprenticeshipCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class ApprenticeshipCategoryController {

    @Autowired
    private IApprenticeshipCategoryService categoryService;


    @GetMapping("/all")
    public ResponseEntity<Response> getAllCategories() {
        Response response = categoryService.getAllCategories();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createCategory(@RequestBody ApprenticeshipCategory category) {
        Response response = categoryService.createCategory(category);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateCategory(@PathVariable String id, @RequestBody ApprenticeshipCategory category) {
        category.setId(Long.valueOf(id));
        Response response = categoryService.updateCategory(category);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteCategory(@PathVariable String id) {
        Response response = categoryService.deleteCategory(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getCategoryById(@PathVariable String id) {
        Response response = categoryService.getCategoryById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}



