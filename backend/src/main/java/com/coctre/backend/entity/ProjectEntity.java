package com.coctre.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectEntity {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    private String location;
    private String projectType;
    private String bambooSupplied;
    private String totalQuantity;
    private String completionYear;
    private String coverImage;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_gallery", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "image_url")
    @Builder.Default
    private List<String> gallery = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(columnDefinition = "TEXT")
    private String challenge;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(columnDefinition = "TEXT")
    private String results;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_products_used", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "product_slug")
    @Builder.Default
    private List<String> productsUsed = new ArrayList<>();

    @Builder.Default
    private Boolean featured = false;
}
