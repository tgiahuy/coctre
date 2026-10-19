package com.coctre.backend;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:coctre-flyway-validate;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH",
        "spring.flyway.enabled=true",
        "spring.flyway.locations=classpath:db/migration",
        "spring.flyway.baseline-on-migrate=true",
        "spring.jpa.hibernate.ddl-auto=validate",
        "app.internal-secret=test-internal-secret-for-validation-32chars"
})
class FlywayMigrationValidationTests {

    @Autowired(required = false)
    private Flyway flyway;

    @Test
    @DisplayName("Kiểm tra Flyway tự động migrate và Hibernate validate thành công 100% schema V1")
    void verifyFlywaySchemaAndHibernateValidation() {
        assertNotNull(flyway, "Flyway bean phải được Spring Boot starter tự động khởi tạo thành công");
        assertNotNull(flyway.info().current(), "Phải có migration V1 hiện hành");
        assertEquals("1", flyway.info().current().getVersion().getVersion(), "Version migration hiện hành phải là V1");
        assertTrue(flyway.info().current().getState().isApplied(), "Migration V1 phải ở trạng thái đã áp dụng (APPLIED)");
    }
}
