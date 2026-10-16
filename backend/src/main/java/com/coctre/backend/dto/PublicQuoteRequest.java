package com.coctre.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PublicQuoteRequest {
    @Size(max = 120, message = "Họ tên không được vượt quá 120 ký tự")
    private String customerName;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(03|05|07|08|09)[0-9]{8}$", message = "Số điện thoại không hợp lệ (cần 10 chữ số)")
    private String phone;

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.replaceAll("[\\s.-]", "").trim();
    }

    @Email(message = "Email không hợp lệ")
    @Size(max = 160, message = "Email không được vượt quá 160 ký tự")
    private String email;

    @Size(max = 160, message = "Tên công ty không được vượt quá 160 ký tự")
    private String company;

    @Size(max = 300, message = "Địa điểm không được vượt quá 300 ký tự")
    private String location;

    @Size(max = 160, message = "Loại sản phẩm không được vượt quá 160 ký tự")
    private String productType;

    @Size(max = 80, message = "Số lượng không được vượt quá 80 ký tự")
    private String quantity;

    @Size(max = 2000, message = "Nội dung không được vượt quá 2000 ký tự")
    private String notes;
}
