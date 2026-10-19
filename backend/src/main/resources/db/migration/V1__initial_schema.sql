-- ====================================================================
-- Baseline Schema Migration for Coc Tre Huyen Duong
-- Target DB: PostgreSQL 14+
-- ====================================================================

-- 1. Bảng Quản trị viên
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 2. Bảng Phiên đăng nhập (Session)
CREATE TABLE IF NOT EXISTS admin_sessions (
    id VARCHAR(64) PRIMARY KEY,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_session_token ON admin_sessions(token_hash);

-- 3. Bảng Cấu hình Doanh nghiệp
CREATE TABLE IF NOT EXISTS site_config (
    id VARCHAR(64) PRIMARY KEY,
    company_name VARCHAR(255),
    short_name VARCHAR(255),
    legal_name VARCHAR(255),
    slogan VARCHAR(500),
    logo_url VARCHAR(500),
    favicon_url VARCHAR(500),
    hotline VARCHAR(50),
    hotline_formatted VARCHAR(50),
    hotline_secondary VARCHAR(50),
    zalo VARCHAR(50),
    zalo_url VARCHAR(500),
    email VARCHAR(255),
    headquarters TEXT,
    warehouse1 TEXT,
    warehouse2 TEXT,
    work_hours VARCHAR(255),
    website VARCHAR(255),
    facebook VARCHAR(500),
    map_embed_url TEXT,
    experience_years INTEGER,
    warehouse_area VARCHAR(100),
    completed_projects VARCHAR(100),
    supply_capacity VARCHAR(255),
    delivery_coverage VARCHAR(255),
    is_data_seeded BOOLEAN DEFAULT FALSE
);

-- 4. Bảng Sản phẩm
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    length VARCHAR(100),
    length_meters DOUBLE PRECISION,
    diameter VARCHAR(100),
    bamboo_type VARCHAR(255),
    origin VARCHAR(255),
    stock_status VARCHAR(100),
    short_description TEXT,
    description TEXT,
    packaging VARCHAR(255),
    video_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    rating DOUBLE PRECISION DEFAULT 5.0,
    review_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

CREATE TABLE IF NOT EXISTS product_specs (
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label VARCHAR(255),
    spec_value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product_applications (
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    application TEXT
);

CREATE TABLE IF NOT EXISTS product_advantages (
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    advantage TEXT
);

CREATE TABLE IF NOT EXISTS product_images (
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500)
);

-- 5. Bảng Dự án Công trình
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    project_type VARCHAR(255),
    bamboo_supplied VARCHAR(255),
    total_quantity VARCHAR(100),
    completion_year VARCHAR(100),
    cover_image VARCHAR(500),
    short_description TEXT,
    overview TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    featured BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

CREATE TABLE IF NOT EXISTS project_gallery (
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS project_products_used (
    project_id VARCHAR(64) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    product_slug VARCHAR(255)
);

-- 6. Bảng Tin tức / Bài viết
CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    cover_image VARCHAR(500),
    publish_date VARCHAR(50),
    author VARCHAR(100),
    read_time VARCHAR(50),
    excerpt TEXT,
    content TEXT,
    featured BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

CREATE TABLE IF NOT EXISTS article_tags (
    article_id VARCHAR(64) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    tag VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS article_table_of_contents (
    article_id VARCHAR(64) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    heading_id VARCHAR(100),
    text VARCHAR(255)
);

-- 7. Bảng Yêu cầu Báo giá
CREATE TABLE IF NOT EXISTS quote_requests (
    id VARCHAR(64) PRIMARY KEY,
    customer_name VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    product_type VARCHAR(255),
    quantity VARCHAR(100),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    email_status VARCHAR(50) DEFAULT 'PENDING',
    email_error TEXT,
    email_retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON quote_requests(phone);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
