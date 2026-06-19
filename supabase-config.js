// ============================================================
// supabase-config.js — Supabase client initialisation
// Think1st · FinQuest Learning Platform
// ============================================================

const SUPABASE_URL     = 'https://ikctnljbgsmlbyrcfrsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4Ahn6SSiVaug4WDDQaelDw_ylrnPw-F';

// Supabase JS v2 — createClient is on the global supabase object
// loaded via CDN: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/...">
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
