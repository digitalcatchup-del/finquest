// ============================================================
// supabase-config.js — Supabase client initialisation
// Think1st · FinQuest Learning Platform
// ============================================================

const SUPABASE_URL      = 'https://ikctnljbgsmlbyrcfrsi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrY3RubGpiZ3NtbGJ5cmNmcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NzMxOTEsImV4cCI6MjA5NzQ0OTE5MX0.wT1fALAXQcSKIR27Xkv4wa6mtULcHy54DGK5htuppNo';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken:   true,
    persistSession:     true,
    detectSessionInUrl: true
  }
});
