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

        // Kiểm tra xem dữ liệu mẫu đã từng được khởi tạo hay chưa
        Optional<SiteConfigEntity> configOpt = siteConfigRepository.findById("main-config");
        boolean alreadySeeded = configOpt.map(cfg -> Boolean.TRUE.equals(cfg.getIsDataSeeded())).orElse(false);

        if (alreadySeeded) {
            log.info("ℹ Dữ liệu ban đầu đã được khởi tạo trước đó. Tôn trọng thao tác của quản trị viên (không tự ý re-seed khi bảng trống).");
            return;
        }

        seedProducts();
        seedProjects();
        seedArticles();

        // Đánh dấu đã seed xong để các lần khởi động tiếp theo không tự động tạo lại
        configOpt.ifPresent(cfg -> {
            cfg.setIsDataSeeded(true);
            siteConfigRepository.save(cfg);
            log.info("✓ Đã đánh dấu hoàn tất khởi tạo dữ liệu ban đầu (isDataSeeded = true)");
        });
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
        List<ProductEntity> defaultProducts = Arrays.asList(
            ProductEntity.builder()
                .id("coc-tre-15m")
                .slug("coc-tre-15m")
                .name("Cọc Tre 1,5m (Ø 6 - 8cm)")
                .length("1,5m")
                .lengthMeters(1.5)
                .diameter("Ø 60 – 80 mm")
                .bambooType("Tre đực già, tre gai, tre luồng Hòa Bình")
                .origin("Hòa Bình")
                .stockStatus("Sẵn hàng số lượng lớn")
                .shortDescription("Cọc tre 1,5m thân thẳng, cọc đặc thịt dày, vát nhọn sẵn, chuyên dùng gia cố nền móng nhà cấp 4, hố móng nông, cống hộp, kè kênh mương máng.")
                .description("Cọc tre 1,5m công trình xây dựng có xuất xứ từ vùng nguyên liệu tre già Hòa Bình. Cọc dài từ 1,4m đến 1,6m, thân gốc và một phần ngọn đủ tiêu chuẩn đường kính từ 6cm đến 8cm, thân thẳng không bị vỡ đầu, không cong vênh nứt nẻ. Đảm bảo cọc tốt không bị gãy vỡ khi đóng, số lượng cung cấp không giới hạn.")
                .applications(Arrays.asList(
                    "Đóng móng nhà cấp 4, móng các công trình phụ trên nền đất ruộng, đất mới hoặc đất mượn.",
                    "Gia cố móng kè ao hồ, rãnh thoát nước, cống hộp, kênh mương máng nội đồng.",
                    "Lót móng đường giao thông nông thôn, đường nội bộ nhà xưởng.",
                    "Chặn sạt lở bờ rãnh, gia cố vách hố móng chống sụt lún trong thi công."
                ))
                .advantages(Arrays.asList(
                    "Tre đực già đặc ruột, không gãy vỡ hay dập nát đầu cọc khi đóng búa rung hoặc ép máy.",
                    "Nguồn gốc tre già Hòa Bình chở trực tiếp từ nơi khai thác đến công trình, giá rẻ tận gốc.",
                    "Chi phí tiết kiệm nhất trong các quy cách cọc tre công trình.",
                    "Sẵn hàng số lượng lớn, vận chuyển tận chân công trình trong ngày."
                ))
                .packaging("Bó 25 cây hoặc 50 cây buộc dây thép chặt chẽ")
                .images(Arrays.asList("/images/products/coc-tre-15m-1.webp", "/images/products/coc-tre-15m-2.webp", "/images/products/coc-tre-15m-3.webp"))
                .featured(true)
                .rating(0.0)
                .reviewCount(0)
                .build(),

            ProductEntity.builder()
                .id("coc-tre-2m")
                .slug("coc-tre-2m")
                .name("Cọc Tre 2m (Ø 6 - 9cm)")
                .length("2m")
                .lengthMeters(2.0)
                .diameter("Ø 65 – 90 mm")
                .bambooType("Tre luồng / Tre gai già đanh")
                .origin("Hòa Bình – Thanh Hóa")
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
                .build(),

            ProductEntity.builder()
                .id("coc-tre-25m")
                .slug("coc-tre-25m")
                .name("Cọc Tre 2,5m (Ø 7 - 10cm)")
                .length("2.5m")
                .lengthMeters(2.5)
                .diameter("Ø 70 – 100 mm")
                .bambooType("Tre đực già đặc ruột")
                .origin("Hòa Bình")
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
                .build(),

            ProductEntity.builder()
                .id("coc-tre-3m")
                .slug("coc-tre-3m")
                .name("Cọc Tre 3m (Ø 8 - 10cm)")
                .length("3m")
                .lengthMeters(3.0)
                .diameter("Ø 80 – 100 mm")
                .bambooType("Tre luồng già loại 1")
                .origin("Hòa Bình – Thanh Hóa")
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
                .build(),

            ProductEntity.builder()
                .id("coc-tre-4m")
                .slug("coc-tre-4m")
                .name("Cọc Tre 4m (Ø 8 - 11cm)")
                .length("4m")
                .lengthMeters(4.0)
                .diameter("Ø 80 – 110 mm")
                .bambooType("Tre luồng đại thụ, tre gai già Hòa Bình")
                .origin("Hòa Bình")
                .stockStatus("Sẵn hàng số lượng lớn")
                .shortDescription("Cọc tre 4m thân to dày, chịu tải trọng lớn, chuyên trị nền móng bùn lầy sâu, kè sông biển chống sạt lở, cầu đường và cống hộp khẩu độ lớn.")
                .description("Cọc tre 4m công trình xây dựng khai thác từ các bụi tre luồng già lâu năm tại Hòa Bình. Cọc dài từ 3,9m đến 4,1m, đường kính gốc to tròn đạt từ 8cm đến 11cm, thân thẳng tắp đặc thịt tre. Chiều dài 4m nguyên khối giúp cọc cắm sâu vượt trội qua nhiều tầng bùn yếu, tạo lực ma sát thành cọc cực lớn.")
                .applications(Arrays.asList(
                    "Gia cố nền móng công trình cầu đường, đường dẫn cao tốc qua vùng đầm lầy, đất yếu sâu.",
                    "Kè bờ sông, bờ kênh lớn, đê biển chống sạt lở và xói mòn mùa mưa lũ.",
                    "Móng cống hộp khẩu độ lớn, trạm bơm thủy lợi, âu thuyền.",
                    "Gia cố nền móng nhà máy, khu bến cảng, kho bãi tải trọng nặng."
                ))
                .advantages(Arrays.asList(
                    "Chiều dài 4m nguyên khối tạo diện tích ma sát tiếp xúc nền đất lớn nhất.",
                    "Đường kính gốc to khủng Ø80-110mm, chịu lực va đập cơ giới cao không bị nứt vỡ.",
                    "Vận chuyển tận chân công trình bằng xe tải dài và xe cẩu chuyên dụng.",
                    "Đầy đủ hóa đơn VAT và hồ sơ nguồn gốc xuất xứ lâm sản hợp pháp."
                ))
                .packaging("Kiện 10 - 15 cây xếp ngay ngắn, buộc đai nâng hạ xe cẩu")
                .images(Arrays.asList("/images/products/coc-tre-4m-1.webp", "/images/products/coc-tre-4m-2.webp", "/images/products/coc-tre-4m-3.webp"))
                .featured(true)
                .rating(0.0)
                .reviewCount(0)
                .build(),

            ProductEntity.builder()
                .id("coc-tre-theo-yeu-cau")
                .slug("coc-tre-theo-yeu-cau")
                .name("Cọc Tre Theo Yêu Cầu (Đặt Cắt Quy Cách Riêng)")
                .length("Theo yêu cầu")
                .lengthMeters(0.0)
                .diameter("Ø 50 – 120 mm tùy chọn")
                .bambooType("Tre luồng, tre gai, tre đực Hòa Bình tuyển chọn")
                .origin("Hòa Bình")
                .stockStatus("Đặt hàng 1-2 ngày")
                .shortDescription("Cắt theo kích thước bản vẽ kỹ thuật: 1.2m, 1.8m, 2.2m, 3.5m, 5m, vát nhọn hoặc để phẳng đầu, phân loại đường kính riêng.")
                .description("Dịch vụ cung cấp cọc tre cắt theo yêu cầu phục vụ các công trình đặc thù theo hồ sơ thiết kế kỹ thuật. Chúng tôi nhận cắt theo mọi chiều dài yêu cầu (từ 1m đến 6m), tuyển chọn đường kính theo dải kích thước chỉ định, vát nhọn 3-4 cạnh hoặc để phẳng đầu.")
                .applications(Arrays.asList(
                    "Công trình có thiết kế địa chất chuyên biệt cần chiều dài cọc lẻ theo mặt cắt móng.",
                    "Dự án ODA, công trình vốn ngân sách đòi hỏi nghiêm ngặt về sai số kích thước.",
                    "Gia cố móng giếng chìm, hố móng tầng hầm sâu trong đô thị.",
                    "Công trình cảnh quan sinh thái, resort, kè hồ kiến trúc đặc thù."
                ))
                .advantages(Arrays.asList(
                    "Cắt đúng 100% kích thước thiết kế, loại bỏ hoàn toàn hao hụt đầu mẩu tại công trường.",
                    "Chất lượng đồng đều cao nhờ phân loại thủ công kết hợp máy cắt chuyên dụng.",
                    "Tư vấn kỹ thuật thực tế giúp tối ưu chi phí cho nhà thầu.",
                    "Khả năng cung ứng số lượng lớn, giao hàng nhanh chóng tận công trình."
                ))
                .packaging("Đóng bó theo quy cách yêu cầu hoặc xếp gọn gàng trên xe tải")
                .images(Arrays.asList("/images/products/coc-tre-theo-yeu-cau-1.webp", "/images/products/coc-tre-theo-yeu-cau-2.webp", "/images/products/coc-tre-theo-yeu-cau-3.webp"))
                .featured(true)
                .rating(0.0)
                .reviewCount(0)
                .build()
        );

        if (productRepository.count() == 0) {
            productRepository.saveAll(defaultProducts);
            log.info("✓ Đã khởi tạo ban đầu đầy đủ 6 danh mục sản phẩm cọc tre công trình");
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
                    .challenge("Địa chất bùn sét yếu, tiến độ thi công cấp bách theo cam kết thông xe.")
                    .solution("Cung cấp đồng bộ 10.000 - 15.000 cọc/ngày liên tục bằng đội xe tải và xe cẩu luân phiên.")
                    .results("Nghiệm thu 100% đạt chuẩn chất lượng TCVN 9361:2012, bảo đảm độ chịu tải thiết kế móng đường.")
                    .productsUsed(Arrays.asList("coc-tre-25m", "coc-tre-3m"))
                    .featured(true)
                    .build();

            ProjectEntity prj2 = ProjectEntity.builder()
                    .id("ke-bo-song-day-chong-sat-lo-ha-noi")
                    .slug("ke-bo-song-day-chong-sat-lo-ha-noi")
                    .title("Kè Bờ Sông Đáy Chống Sạt Lở Mùa Mưa Lũ")
                    .location("Huyện Thanh Oai – Ứng Hòa, TP. Hà Nội")
                    .projectType("Công trình thủy lợi & kè sông chống sạt lở")
                    .bambooSupplied("Cọc tre 4m thân to gốc già & Cọc tre 3m")
                    .totalQuantity("250.000 cọc tre")
                    .completionYear("2024")
                    .coverImage("/images/projects/du-an-ke-de-ha-nam-1.webp")
                    .gallery(Arrays.asList("/images/projects/du-an-ke-de-ha-nam-1.webp", "/images/projects/du-an-ke-de-ha-nam-2.webp"))
                    .shortDescription("Gia cố toàn tuyến chân đê bao sông Đáy với cọc tre 4m đường kính lớn, chống xói lở dòng chảy ngầm.")
                    .overview("Tuyến kè chống sạt lở xung yếu sông Đáy đi qua khu vực địa chất đất pha cát và bùn lỏng sâu.")
                    .challenge("Mực nước biến đổi liên tục, yêu cầu cọc tre ngâm bùn không bị mục rỗng và chịu va đập cơ giới mạnh.")
                    .solution("Sử dụng tre gai già tuyển chọn đường kính gốc 80-110mm, vận chuyển bằng sà lan và xe ben chuyên dụng.")
                    .results("Hệ thống chân kè ổn định vững chắc, vượt qua 2 đợt lũ lớn mà không phát sinh sụt trượt.")
                    .productsUsed(Arrays.asList("coc-tre-3m", "coc-tre-4m"))
                    .featured(true)
                    .build();

            ProjectEntity prj3 = ProjectEntity.builder()
                    .id("gia-co-mong-nha-xuong-kcn-pho-noi-hung-yen")
                    .slug("gia-co-mong-nha-xuong-kcn-pho-noi-hung-yen")
                    .title("Gia Cố Nền Móng Cụm Nhà Xưởng KCN Phố Nối")
                    .location("Khu Công Nghiệp Phố Nối A, Tỉnh Hưng Yên")
                    .projectType("Công trình nhà xưởng công nghiệp")
                    .bambooSupplied("Cọc tre 2m & Cọc tre 2,5m đặc ruột")
                    .totalQuantity("120.000 cọc tre")
                    .completionYear("2024")
                    .coverImage("/images/projects/du-an-nha-xuong-dong-van-1.webp")
                    .gallery(Arrays.asList("/images/projects/du-an-nha-xuong-dong-van-1.webp", "/images/projects/du-an-nha-xuong-dong-van-2.webp"))
                    .shortDescription("Cung cấp 120.000 cọc tre ép mật độ 25 cọc/m² xử lý tầng đất ruộng san lấp cho cụm nhà xưởng kho vận.")
                    .overview("Khu đất dự án trước đây là đất trũng trồng lúa nước, lớp bùn dẻo dày từ 1.8m đến 2.6m.")
                    .challenge("Yêu cầu tiến độ ép cọc đồng loạt để kịp bàn giao mặt bằng đổ bê tông móng đài.")
                    .solution("Bố trí 5 xe vận tải giao cọc trực tiếp trong đêm, đáp ứng công suất thi công 3 máy ép liên tục.")
                    .results("Độ lún dư sau thi công hoàn toàn nằm trong giới hạn cho phép của hồ sơ thiết kế.")
                    .productsUsed(Arrays.asList("coc-tre-2m", "coc-tre-25m"))
                    .featured(true)
                    .build();

            projectRepository.saveAll(Arrays.asList(prj1, prj2, prj3));
            log.info("✓ Đã khởi tạo dữ liệu mẫu 3 Projects thành công");
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
                    .excerpt("Hướng dẫn chi tiết quy trình đóng cọc tre bằng máy cuốc và búa rung, tiêu chuẩn mật độ 25 cọc/m² và xử lý đầu cọc ngập nước.")
                    .content("## 1. Nguyên lý gia cố nền móng bằng cọc tre\n\nGia cố nền đất yếu bằng cọc tre là giải pháp truyền thống lâu đời nhưng mang lại hiệu quả kinh tế và kỹ thuật rất cao trong xây dựng công trình dân dụng, nhà xưởng và công trình thủy lợi.\n\n### Tiêu chuẩn kỹ thuật áp dụng\nTheo TCVN 9361:2012, cọc tre được sử dụng để nén chặt các lớp đất dính yếu (bùn sét, cát pha bùn) có mực nước ngầm cao. Cọc tre chỉ bền lâu khi luôn nằm trong môi trường bão hòa nước ngầm hoặc bùn yếm khí.\n\n## 2. Tiêu chuẩn chọn cọc tre công trình\n- Tre dùng làm cọc phải là tre già (từ 3-5 năm tuổi), đặc thịt ruột nhỏ.\n- Thân thẳng, độ cong không vượt quá 1cm trên 1m chiều dài.\n- Không bị dập vỡ, nứt toác dọc thân hay bị mối mọt xâm nhập.\n- Đường kính gốc từ 60mm đến 110mm tùy quy cách thiết kế.\n\n## 3. Quy trình thi công ép và đóng cọc\n1. Đào hố móng đến cao trình thiết kế móng đài.\n2. Bố trí lưới cọc theo mật độ quy định (thường từ 25 cọc/m² theo hình xoắn ốc hoặc từ ngoài vào trong).\n3. Ép cọc bằng máy đào gầu hoặc búa rung đầu cọc có đệm gỗ.\n4. Sau khi đóng đủ chiều sâu, chặt phẳng đầu cọc và phủ lớp cát lót đệm 10-15cm trước khi đổ bê tông lót.")
                    .tags(Arrays.asList("Cọc tre", "Kỹ thuật thi công", "Nền móng", "TCVN 9361"))
                    .featured(true)
                    .build();

            ArticleEntity art2 = ArticleEntity.builder()
                    .id("kinh-nghiem-chon-coc-tre-gia-dac-ruot-chat-luong")
                    .slug("kinh-nghiem-chon-coc-tre-gia-dac-ruot-chat-luong")
                    .title("Kinh Nghiệm Chọn Mua Cọc Tre Già Đặc Ruột Không Bị Vỡ Đầu Khi Đóng")
                    .category("Kinh nghiệm chọn cọc")
                    .coverImage("/images/blog/kinh-nghiem-chon-coc-tre.webp")
                    .publishDate("2024-04-02")
                    .author("Chuyên viên Vật liệu Nguyễn Văn Dương")
                    .readTime("5 phút đọc")
                    .excerpt("Cách phân biệt cọc tre đực già Hòa Bình với tre non, tre xốp xơ giúp nhà thầu không bị hao hụt đầu cọc khi thi công cơ giới.")
                    .content("## 1. Tại sao cọc tre bị dập đầu khi đóng máy?\nNhiều nhà thầu phản ánh cọc mua về khi ép bằng máy cuốc thường bị toác đầu, gãy thân khiến lãng phí chi phí nhân công và vật tư. Nguyên nhân 90% là do mua phải cọc tre non hoặc tre ngâm lâu ngày bị mục xơ.\n\n## 2. Dấu hiệu nhận biết tre đực già chất lượng cao\n- **Vỏ tre:** Vàng óng hoặc xanh đậm ngả phấn xám, đốt tre dày và mắt tre nổi rõ.\n- **Thịt tre:** Lớp cùi thịt dày trên 12-18mm, ống ruột nhỏ hẹp đặc quánh.\n- **Độ già:** Tre phải đạt từ 4 năm tuổi trở lên khai thác từ vùng núi đồi đá vôi Hòa Bình có thớ gỗ dẻo đanh chắc chắn.")
                    .tags(Arrays.asList("Kinh nghiệm chọn cọc", "Cọc tre Hòa Bình", "Vật liệu xây dựng"))
                    .featured(true)
                    .build();

            ArticleEntity art3 = ArticleEntity.builder()
                    .id("so-sanh-mong-coc-tre-va-coc-be-tong-cot-thep")
                    .slug("so-sanh-mong-coc-tre-va-coc-be-tong-cot-thep")
                    .title("So Sánh Hiệu Quả Kinh Tế Giữa Móng Cọc Tre Và Cọc Bê Tông Cốt Thép")
                    .category("Kiến thức nền móng")
                    .coverImage("/images/blog/so-sanh-coc-tre-be-tong.webp")
                    .publishDate("2024-04-20")
                    .author("Kỹ sư Kết cấu Lê Thanh Tùng")
                    .readTime("6 phút đọc")
                    .excerpt("Phân tích chi phí thực tế và phạm vi ứng dụng thích hợp giữa phương án cọc tre truyền thống và cọc bê tông đúc sẵn cho nhà phố 2-4 tầng.")
                    .content("## 1. Bài toán chi phí trên mỗi mét vuông nền móng\nVới các công trình nhà ở gia đình dưới 4 tầng xây trên đất ao, ruộng san lấp có mực nước ngầm cao quanh năm, móng cọc tre có chi phí chỉ bằng 1/3 đến 1/4 so với cọc bê tông cốt thép đúc sẵn.\n\n## 2. Ưu thế vượt trội của cọc tre ở ngõ nhỏ\nXe cẩu bê tông và giàn ép tĩnh không thể vào các ngõ hẻm phố cổ hoặc ngõ nông thôn hẹp dưới 2m. Cọc tre vận chuyển linh hoạt bằng xe tải nhẹ hoặc ba gác, thi công ép nhanh gọn bằng máy cuốc mini.")
                    .tags(Arrays.asList("Kiến thức nền móng", "Chi phí xây dựng", "Nhà phố"))
                    .featured(false)
                    .build();

            articleRepository.saveAll(Arrays.asList(art1, art2, art3));
            log.info("✓ Đã khởi tạo dữ liệu mẫu 3 Articles thành công");
        }
    }
}
