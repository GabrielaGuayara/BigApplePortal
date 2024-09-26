package com.bigappleportal.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PdfFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private byte[] data;


}