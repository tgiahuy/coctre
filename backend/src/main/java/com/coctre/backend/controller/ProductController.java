package com.coctre.backend.controller;

import com.coctre.backend.dto.ApiResponse;
import com.coctre.backend.entity.ProductEntity;
import com.coctre.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductEntity>>> getAllProducts() {
        List<ProductEntity> list = productRepository.findAll();
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách sản phẩm thành công", list));
    }

    @GetMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<ProductEntity>> getProduct(@PathVariable String slugOrId) {
        Optional<ProductEntity> found = productRepository.findBySlug(slugOrId);
        if (found.isEmpty()) {
            found = productRepository.findById(slugOrId);
        }
        return found.map(productEntity -> ResponseEntity.ok(ApiResponse.ok(productEntity)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Không tìm thấy sản phẩm")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductEntity>> saveProduct(@RequestBody ProductEntity product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            product.setId("product-" + System.currentTimeMillis());
        }
        ProductEntity saved = productRepository.save(product);
        return ResponseEntity.ok(ApiResponse.ok("Đã lưu thông tin sản phẩm thành công", saved));
    }

    @DeleteMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String slugOrId) {
        Optional<ProductEntity> found = productRepository.findBySlug(slugOrId);
        if (found.isPresent()) {
            productRepository.delete(found.get());
        } else {
            productRepository.deleteById(slugOrId);
        }
        return ResponseEntity.ok(ApiResponse.ok("Đã xóa sản phẩm thành công", null));
    }
}
