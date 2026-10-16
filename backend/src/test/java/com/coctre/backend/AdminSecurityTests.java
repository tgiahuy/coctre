package com.coctre.backend;

import com.coctre.backend.config.PasswordUtil;
import com.coctre.backend.repository.QuoteRequestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdminSecurityTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private QuoteRequestRepository quoteRequestRepository;

    @Test
    void adminMutationsAndCustomerDataRequireAuthentication() throws Exception {
        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(get("/api/v1/quotes"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(put("/api/v1/config")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void publicQuoteSubmissionRemainsAvailable() throws Exception {
        mockMvc.perform(post("/api/v1/quotes")
                        .header("X-Forwarded-For", "198.51.100.10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"phone\":\"0988718013\",\"customerName\":\"Test\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void publicQuoteCannotChooseAdministrativeFields() throws Exception {
        mockMvc.perform(post("/api/v1/quotes")
                        .header("X-Forwarded-For", "198.51.100.11")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":\"known-id\",\"phone\":\"0988718013\",\"status\":\"CLOSED\"}"))
                .andExpect(status().isCreated());

        assertFalse(quoteRequestRepository.existsById("known-id"));
        assertTrue(quoteRequestRepository.findAll().stream().allMatch(quote -> "NEW".equals(quote.getStatus())));
    }

    @Test
    void rejectsInvalidPhoneAndRateLimitsRepeatedSubmissions() throws Exception {
        mockMvc.perform(post("/api/v1/quotes")
                        .header("X-Forwarded-For", "198.51.100.12")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"phone\":\"123\"}"))
                .andExpect(status().isBadRequest());

        for (int i = 0; i < 5; i++) {
            mockMvc.perform(post("/api/v1/quotes")
                            .header("X-Forwarded-For", "198.51.100.13")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"phone\":\"0988718013\"}"))
                    .andExpect(status().isCreated());
        }
        mockMvc.perform(post("/api/v1/quotes")
                        .header("X-Forwarded-For", "198.51.100.13")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"phone\":\"0988718013\"}"))
                .andExpect(status().isTooManyRequests());
    }

    @Test
    void passwordsUseAdaptiveHashing() {
        String hash = PasswordUtil.hashPassword("a-strong-test-password");
        assertTrue(hash.startsWith("$2"));
        assertTrue(PasswordUtil.verify("a-strong-test-password", hash));
        assertFalse(PasswordUtil.verify("wrong-password", hash));
        assertFalse(PasswordUtil.needsRehash(hash));
    }
}
