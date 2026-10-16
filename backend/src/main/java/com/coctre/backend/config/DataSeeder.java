package com.coctre.backend.config;

import com.coctre.backend.entity.AdminUserEntity;
import com.coctre.backend.entity.ArticleEntity;
import com.coctre.backend.entity.ProductEntity;
import com.coctre.backend.entity.ProjectEntity;
import com.coctre.backend.entity.SiteConfigEntity;
import com.coctre.backend.repository.AdminUserRepository;
import com.coctre.backend.repository.ArticleRepository;
import com.coctre.backend.repository.ProductRepository;
import com.coctre.backend.repository.ProjectRepository;
import com.coctre.backend.repository.SiteConfigRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    @Value("${app.admin.initial-email:}")
    private String initialAdminEmail;

    @Value("${app.admin.initial-password:}")
    private String initialAdminPassword;

    private final ProductRepository productRepository;
    private final ProjectRepository projectRepository;
    private final ArticleRepository articleRepository;
    private final SiteConfigRepository siteConfigRepository;
    private final AdminUserRepository adminUserRepository;

    @Override
    public void run(String... args) {
        seedSiteConfig();
        seedAdminUsers();
        seedProducts();
    }

    private void seedAdminUsers() {
        if (initialAdminEmail.isBlank() || initialAdminPassword.isBlank()) {
            if (adminUserRepository.count() == 0) {
                log.warn("Chưa có tài khoản quản trị. Hãy đặt APP_ADMIN_INITIAL_EMAIL và APP_ADMIN_INITIAL_PASSWORD cho lần khởi động đầu tiên.");
            }
            return;
        }
        Optional<AdminUserEntity> userOpt = adminUserRepository.findByEmailIgnoreCase(initialAdminEmail.trim());
        if (userOpt.isEmpty()) {
            if (initialAdminPassword.length() < 12) {
                throw new IllegalStateException("APP_ADMIN_INITIAL_PASSWORD phải có ít nhất 12 ký tự");
            }
            AdminUserEntity superAdmin = AdminUserEntity.builder()
                    .id("admin-" + java.util.UUID.randomUUID())
                    .email(initialAdminEmail.trim().toLowerCase())
                    .passwordHash(PasswordUtil.hashPassword(initialAdminPassword))
                    .fullName("Ban Quản Trị Cọc Tre")
                    .role("SUPER_ADMIN")
                    .isActive(true)
                    .build();
            adminUserRepository.save(superAdmin);
            log.info("✓ Đã khởi tạo tài khoản quản trị ban đầu");
        }
    }

    private void seedSiteConfig() {
        if (siteConfigRepository.count() == 0) {
            SiteConfigEntity cfg = SiteConfigEntity.builder()
                    .id("main-config")
                    .companyName("Cọc Tre Huyền Dương")
                    .shortName("Cọc Tre Công Trình")
                    .legalName("Công ty TNHH Xây Dựng & TM Huyền Dương")
                    .slogan("Giao hàng tận chân công trình trong ngày – Hỗ trợ bốc xếp – Chiết khấu cao cho đơn hàng lớn")
                    .logoUrl("/images/logo.png")
                    .faviconUrl("/favicon.ico")
                    .hotline("0988718013")
                    .hotlineFormatted("0988.718.013")
                    .hotlineSecondary("0369.928.040")
                    .zalo("0988718013")
                    .zaloUrl("https://zalo.me/0988718013")
                    .email("huyenduong70@gmail.com")
                    .headquarters("331 Phố Vác, Dân Hòa, Hà Nội")
                    .warehouse1("Tổng kho & Xưởng chế biến cọc tre 331 Phố Vác, Dân Hòa, Hà Nội")
                    .warehouse2("Đội xe chuyên dụng giao hàng tận chân công trình trong ngày toàn miền Bắc")
                    .workHours("Thứ 2 - Chủ Nhật: 06:00 - 22:00 (Hỗ trợ khẩn cấp 24/7)")
                    .website("https://coctrehuyenduong.com")
                    .facebook("https://facebook.com/coctrehuyenduong")
                    .mapEmbedUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.6590783231222!2d105.7768899!3d20.8050759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31344b16832a57e1%3A0x50d7c89128659d32!2zQ-G7rWEgSMOgbmcgQ-G7jWMgVHJlIETGsMahbmcgSHV54buBbg!5e0!3m2!1svi!2s!4v1792139837819!5m2!1svi!2s")
                    .experienceYears(34)
                    .warehouseArea("10.000m²+")
                    .completedProjects("1.500+")
                    .supplyCapacity("Hàng sẵn kho – Giao trong ngày")
                    .deliveryCoverage("Giao tận chân công trình toàn miền Bắc")
                    .build();
            siteConfigRepository.save(cfg);
            log.info("✓ Đã khởi tạo dữ liệu mẫu SiteConfig thành công");
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            ProductEntity p2m = ProductEntity.builder()
                    .id("coc-tre-2m")
                    .slug("coc-tre-2m")
                    .name("Cọc Tre 2m (Ø 6 - 9cm)")
                    .length("2m")
                    .lengthMeters(2.0)
                    .diameter("Ø 65 – 90 mm")
                    .bambooType("Tre luồng / Tre gai già đanh")
                    .origin("Vùng tre già chọn lọc miền Bắc")
                    .stockStatus("Sẵn hàng số lượng lớn")
                    .shortDescription("Quy cách phổ biến nhất cho công trình nhà dân dụng, móng băng, móng bè trên nền đất ruộng, ao hồ san lấp.")
                    .description("Cọc tre 2m là quy cách được sử dụng nhiều nhất trên 70% các công trình xây dựng dân dụng tại khu vực miền Bắc.")
                    .applications(Arrays.asList("Thi công ép cọc móng nhà phố từ 2 – 5 tầng trên nền đất ao, đất lấp.", "Gia cố móng cầu, móng mố đường dẫn, cống hộp qua đường."))
                    .advantages(Arrays.asList("Tre già đanh chọn lọc, đường kính đồng đều", "Giao hàng thần tốc 24/7 tận chân công trình"))
                    .packaging("Bó 25 cây đai thép chắc chắn")
                    .images(Arrays.asList("/images/products/coc-tre-2m-1.webp", "/images/products/coc-tre-2m-2.webp"))
                    .featured(true)
                    .rating(0.0)
                    .reviewCount(0)
                    .build();

            ProductEntity p25m = ProductEntity.builder()
                    .id("coc-tre-25m")
                    .slug("coc-tre-25m")
                    .name("Cọc Tre 2,5m (Ø 7 - 10cm)")
                    .length("2.5m")
                    .lengthMeters(2.5)
                    .diameter("Ø 70 – 100 mm")
                    .bambooType("Tre đực già đặc ruột")
                    .origin("Vùng nguyên liệu tre già đạt chuẩn")
                    .stockStatus("Sẵn hàng số lượng lớn")
                    .shortDescription("Chuyên dùng cho gia cố móng nhà 3-4 tầng, móng kè đê bao kênh rạch.")
                    .description("Cọc tre 2.5m chịu lực nén cọc cao, độ thẳng đều.")
                    .applications(Arrays.asList("Kè sông, kè đê điều", "Gia cố nền móng nhà cao tầng"))
                    .advantages(Arrays.asList("Thịt tre dày, chịu búa rung tốt", "Chống mối mọt tự nhiên trong bùn yếm khí"))
                    .packaging("Bó 25 cây")
                    .images(Arrays.asList("/images/products/coc-tre-25m-1.webp"))
                    .featured(true)
                    .rating(0.0)
                    .reviewCount(0)
                    .build();

            ProductEntity p3m = ProductEntity.builder()
                    .id("coc-tre-3m")
                    .slug("coc-tre-3m")
                    .name("Cọc Tre 3m (Ø 8 - 10cm)")
                    .length("3m")
                    .lengthMeters(3.0)
                    .diameter("Ø 80 – 100 mm")
                    .bambooType("Tre luồng già loại 1")
                    .origin("Vùng nguyên liệu tre già chọn lọc")
                    .stockStatus("Sẵn hàng số lượng lớn")
                    .shortDescription("Quy cách cọc dài chuyên dụng xử lý tầng bùn sâu, kè bờ sông hồ.")
                    .description("Cọc tre 3m đạt độ già từ 4-6 năm, thân cọc thẳng và dẻo dai.")
                    .applications(Arrays.asList("Kè sông suối, đê điều chống sạt lở", "Móng sâu hố móng bùn lún"))
                    .advantages(Arrays.asList("Đường kính lớn, chịu tải trọng lớn", "Khối lượng dồi dào sẵn tại bãi"))
                    .packaging("Bó 20 cây")
                    .images(Arrays.asList("/images/products/coc-tre-3m-1.webp"))
                    .featured(true)
                    .rating(0.0)
                    .reviewCount(0)
                    .build();

            productRepository.saveAll(Arrays.asList(p2m, p25m, p3m));
            log.info("✓ Đã khởi tạo dữ liệu mẫu Products thành công");
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            ProjectEntity prj1 = ProjectEntity.builder()
                    .id("du-an-xay-dung-tinh-lo-489c-nam-dinh")
                    .slug("du-an-xay-dung-tinh-lo-489c-nam-dinh")
                    .title("Dự Án Xây Dựng Tuyến Tỉnh Lộ 489C Nam Định")
                    .location("Xuân Trường – Giao Thủy, Tỉnh Nam Định")
                    .projectType("Công trình hạ tầng giao thông đường bộ")
                    .bambooSupplied("Cọc tre 2,5m & Cọc tre 3m già chọn lọc")
                    .totalQuantity("180.000 cọc tre")
                    .completionYear("2023 - 2024")
                    .coverImage("/images/projects/du-an-tinh-lo-489c-1.webp")
                    .gallery(Arrays.asList("/images/projects/du-an-tinh-lo-489c-1.webp", "/images/projects/du-an-tinh-lo-489c-2.webp"))
                    .shortDescription("Cung cấp hơn 180.000 cọc tre 2,5m và 3m xử lý nền đất yếu, gia cố chân taluy và móng cống thoát nước.")
                    .overview("Dự án đầu tư xây dựng tuyến đường tỉnh lộ 489C có vai trò chiến lược kết nối hạ tầng Nam Định và Thái Bình.")
                    .challenge("Địa chất bùn sét yếu, tiến độ thi công cấp bách.")
                    .solution("Cung cấp đồng bộ 10.000 - 15.000 cọc/ngày liên tục bằng đội xe luân phiên.")
                    .results("Nghiệm thu 100% đạt chuẩn chất lượng TCVN.")
                    .productsUsed(Arrays.asList("coc-tre-25m", "coc-tre-3m"))
                    .featured(true)
                    .build();

            projectRepository.save(prj1);
            log.info("✓ Đã khởi tạo dữ liệu mẫu Projects thành công");
        }
    }

    private void seedArticles() {
        if (articleRepository.count() == 0) {
            ArticleEntity art1 = ArticleEntity.builder()
                    .id("ky-thuat-dong-coc-tre-gia-co-mong-chuan-tcvn")
                    .slug("ky-thuat-dong-coc-tre-gia-co-mong-chuan-tcvn")
                    .title("Quy Trình & Kỹ Thuật Đóng Cọc Tre Gia Cố Nền Móng Chuẩn TCVN 9361:2012")
                    .category("Kỹ thuật thi công")
                    .coverImage("/images/blog/ky-thuat-dong-coc-tre.webp")
                    .publishDate("2024-03-15")
                    .author("Kỹ sư Kết cấu Vũ Hải Nam")
                    .readTime("7 phút đọc")
                    .excerpt("Hướng dẫn chi tiết quy trình đóng cọc tre bằng máy cuốc và búa rung, tiêu chuẩn khoảng cách mật độ 25 cọc/m².")
                    .content("## 1. Nguyên lý gia cố nền móng bằng cọc tre\nGia cố nền đất yếu bằng cọc tre là giải pháp truyền thống lâu đời nhưng mang lại hiệu quả kinh tế và kỹ thuật rất cao...")
                    .tags(Arrays.asList("Cọc tre", "Kỹ thuật thi công", "Nền móng"))
                    .featured(true)
                    .build();

            articleRepository.save(art1);
            log.info("✓ Đã khởi tạo dữ liệu mẫu Articles thành công");
        }
    }
}
