package com.coctre.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String name;

    private String length;
    private Double lengthMeters;
    private String diameter;
    private String bambooType;
    private String origin;
    private String stockStatus;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_applications", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "application", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> applications = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_advantages", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "advantage", columnDefinition = "TEXT")
    @Builder.Default
    private List<String> advantages = new ArrayList<>();

    private String packaging;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private Double rating = 5.0;

    @Builder.Default
    private Integer reviewCount = 0;
}
