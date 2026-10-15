# ==========================================
# Giai đoạn 1: Build Spring Boot JAR
# ==========================================
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Sao chép Maven Wrapper & pom.xml trước để cache layer dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Tải trước dependencies (nếu có cache)
RUN ./mvnw dependency:go-offline -B || true

# Sao chép mã nguồn và đóng gói JAR
COPY src ./src
RUN ./mvnw clean package -DskipTests

# ==========================================
# Giai đoạn 2: Runtime Image gọn nhẹ (JRE 21)
# ==========================================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Tạo user không có đặc quyền root để đảm bảo an toàn
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Sao chép file JAR đã đóng gói từ builder
COPY --from=builder /app/target/*.jar app.jar

# Mở cổng 8080 cho Spring Boot API
EXPOSE 8080

# Cấu hình biến môi trường mặc định
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0"

# Lệnh chạy ứng dụng
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
