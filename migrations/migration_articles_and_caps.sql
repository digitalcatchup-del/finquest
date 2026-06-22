-- ============================================================
-- Butterfly Dynamix Learning — migration for:
--   1) Monthly usage tracking (Free tier: 15 lessons / 4 mock exams)
--   2) Article engagement (thumbs-up + comments, no replies)
-- Run this in the Supabase SQL editor. Safe to run once; re-running
-- will error harmlessly on "already exists" (tables use IF NOT EXISTS).
-- ============================================================

-- ── 1. MONTHLY LESSON VIEWS ──────────────────────────────────
-- One row per distinct lesson a person opens in a given month.
-- Re-opening an already-viewed lesson the same month does NOT use up
-- another slot — the unique constraint below prevents double-counting.
create table if not exists monthly_lesson_views (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  lesson_key  text not null,          -- e.g. 'acc:7' (track_key:lesson_index)
  month_key   text not null,          -- e.g. '2026-06'
  viewed_at   timestamptz not null default now(),
  unique (user_id, lesson_key, month_key)
);
alter table monthly_lesson_views enable row level security;
create policy "select own lesson views" on monthly_lesson_views
  for select using (auth.uid() = user_id);
create policy "insert own lesson views" on monthly_lesson_views
  for insert with check (auth.uid() = user_id);

-- ── 2. MONTHLY EXAM ATTEMPTS ─────────────────────────────────
-- One row per mock exam attempt (every attempt counts, not just passes).
create table if not exists monthly_exam_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  track_key     text not null,
  month_key     text not null,
  attempted_at  timestamptz not null default now()
);
alter table monthly_exam_attempts enable row level security;
create policy "select own exam attempts" on monthly_exam_attempts
  for select using (auth.uid() = user_id);
create policy "insert own exam attempts" on monthly_exam_attempts
  for insert with check (auth.uid() = user_id);

-- ── 3. ARTICLE LIKES (thumbs up) ─────────────────────────────
-- article_id is a fixed slug (e.g. 'accruals-concept') matching the
-- `articles` array in data.js — articles themselves are static content,
-- not a database table, so there's nothing to join against here.
create table if not exists article_likes (
  id          uuid primary key default gen_random_uuid(),
  article_id  text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (article_id, user_id)
);
alter table article_likes enable row level security;
create policy "select all article likes" on article_likes
  for select using (true);
create policy "insert own article likes" on article_likes
  for insert with check (auth.uid() = user_id);
create policy "delete own article likes" on article_likes
  for delete using (auth.uid() = user_id);

-- ── 4. ARTICLE COMMENTS (flat — no replies/threading) ────────
create table if not exists article_comments (
  id          uuid primary key default gen_random_uuid(),
  article_id  text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  body        text not null check (char_length(body) <= 500),
  created_at  timestamptz not null default now()
);
alter table article_comments enable row level security;
create policy "select all article comments" on article_comments
  for select using (true);
create policy "insert own article comments" on article_comments
  for insert with check (auth.uid() = user_id);
create policy "delete own article comments" on article_comments
  for delete using (auth.uid() = user_id);

create index if not exists idx_article_likes_article    on article_likes(article_id);
create index if not exists idx_article_comments_article  on article_comments(article_id);
create index if not exists idx_monthly_lesson_views_user on monthly_lesson_views(user_id, month_key);
create index if not exists idx_monthly_exam_user         on monthly_exam_attempts(user_id, month_key);

-- ============================================================
-- OPTIONAL — only run once you've confirmed the Articles pivot is live
-- and you no longer need the old Community/Forum data for anything.
-- This permanently deletes the old discussion-forum tables. Commented
-- out on purpose — uncomment and run manually when you're ready.
-- ============================================================
-- drop table if exists post_votes;
-- drop table if exists replies;
-- drop table if exists posts;
