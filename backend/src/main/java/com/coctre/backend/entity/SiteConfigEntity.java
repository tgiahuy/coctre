package com.coctre.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteConfigEntity {

    @Id
    @Builder.Default
    private String id = "main-config";

    private String companyName;
    private String shortName;
    private String legalName;
    private String slogan;
    private String logoUrl;
    private String faviconUrl;
    private String hotline;
    private String hotlineFormatted;
    private String hotlineSecondary;
    private String zalo;
    private String zaloUrl;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String headquarters;

    @Column(columnDefinition = "TEXT")
    private String warehouse1;

    @Column(columnDefinition = "TEXT")
    private String warehouse2;

    private String workHours;
    private String website;
    private String facebook;

    @Column(columnDefinition = "TEXT")
    private String mapEmbedUrl;

    private Integer experienceYears;
    private String warehouseArea;
    private String completedProjects;
    private String supplyCapacity;
    private String deliveryCoverage;
}
