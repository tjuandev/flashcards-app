ALTER TABLE public.cards
  RENAME COLUMN last_review TO last_review_timestamp;

ALTER TABLE public.cards
  ADD COLUMN last_review_weight SMALLINT;
