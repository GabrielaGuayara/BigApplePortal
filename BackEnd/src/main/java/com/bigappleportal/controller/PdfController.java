package com.bigappleportal.controller;

import com.bigappleportal.model.PdfFile;
import com.bigappleportal.repositories.PdfFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private PdfFileRepository pdfFileRepository;

    @PostMapping
    public ResponseEntity<String> uploadPdf(@RequestParam("file") MultipartFile file) {
        try {
            PdfFile pdfFile = new PdfFile();
            pdfFile.setName(file.getOriginalFilename());
            pdfFile.setData(file.getBytes());
            pdfFileRepository.save(pdfFile);
            return ResponseEntity.ok("PDF uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading PDF");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getPdf(@PathVariable Long id) {
        Optional<PdfFile> pdfFile = pdfFileRepository.findById(id);
        if (pdfFile.isPresent()) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", pdfFile.get().getName());
            return new ResponseEntity<>(pdfFile.get().getData(), headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}