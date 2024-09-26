package com.bigappleportal.repositories;

import com.bigappleportal.model.PdfFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfFileRepository extends JpaRepository<PdfFile, Long> {
}