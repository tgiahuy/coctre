package com.coctre.backend;

import com.coctre.backend.config.PasswordUtil;
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
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"phone\":\"0988718013\",\"customerName\":\"Test\"}"))
                .andExpect(status().isOk());
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
