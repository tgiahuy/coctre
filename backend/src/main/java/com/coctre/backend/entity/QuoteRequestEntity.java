package com.coctre.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quote_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteRequestEntity {

    @Id
    private String id;

    private String customerName;

    @Column(nullable = false)
    private String phone;

    private String email;
    private String location;
    private String productType;
    private String quantity;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Builder.Default
    private String status = "NEW"; // NEW, CONTACTED, CLOSED, CANCELLED

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
