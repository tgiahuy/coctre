-- ====================================================================
-- Migration V2: Ensure quote email columns and site config seed flag exist for legacy upgrades
-- Target DB: PostgreSQL 14+
-- ====================================================================

ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS email_status VARCHAR(50) DEFAULT 'PENDING';
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS email_error TEXT;
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS email_retry_count INTEGER DEFAULT 0;

ALTER TABLE site_config ADD COLUMN IF NOT EXISTS is_data_seeded BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
