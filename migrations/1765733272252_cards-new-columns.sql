-- Up Migration

ALTER TABLE public.cards 
ADD COLUMN last_review TIMESTAMP,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN review_count SMALLINT DEFAULT 0;

-- Down Migration

ALTER TABLE public.cards 
DROP COLUMN last_review,
DROP COLUMN created_at,
DROP COLUMN review_count;