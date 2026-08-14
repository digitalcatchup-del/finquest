// ============================================================
// auth.js — Authentication & session management
// Butterfly Dynamix Platform
// Depends on: supabase-config.js (db)
// ============================================================

let currentUser = null; // { id, email, username, avatar, isSubscribed, pipScore, streak, ... }

// ── SIGN UP ─────────────────────────────────────────────────
async function completeSignup() {
  const btn = document.getElementById('signupSubmitBtn');
  const first   = document.getElementById('sfirst').value.trim();
  const last    = document.getElementById('slast').value.trim();
  const email   = document.getElementById('semail').value.trim();
  const pw      = document.getElementById('spw').value;
  const uname   = document.getElementById('suname').value.trim().toLowerCase();
  const bio     = document.getElementById('sbio').value.trim();
  const avatar  = window._selectedAvatar || '😎';

  // Basic validation
  let valid = true;
  if (!uname) { document.getElementById('eUname').classList.add('show'); valid = false; }
  else document.getElementById('eUname').classList.remove('show');
  if (!valid) return;

  btn.textContent = 'Creating account…';
  btn.disabled = true;

  try {
    // Check username is unique
    const { data: existing } = await db
      .from('profiles')
      .select('id')
      .eq('username', uname)
      .maybeSingle();

    if (existing) {
      document.getElementById('eUname').textContent = 'Username already taken';
      document.getElementById('eUname').classList.add('show');
      btn.textContent = 'Create Account →';
      btn.disabled = false;
      return;
    }

    // Create auth user — Supabase trigger will auto-create the profile row
    const { data, error } = await db.auth.signUp({
      email,
      password: pw,
      options: {
        data: { first_name: first, last_name: last, username: uname, avatar }
      }
    });

    if (error) {
      console.error('Supabase signup error:', JSON.stringify(error));
      alert('Signup error: ' + (error.message || error.status || JSON.stringify(error)));
      btn.textContent = 'Create Account →';
      btn.disabled = false;
      return;
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      // Email confirmation required — tell the user
      btn.textContent = 'Create Account →';
      btn.disabled = false;
      alert(`Almost there! We've sent a confirmation email to ${email}. Please check your inbox and click the link to activate your account, then log in.`);
      switchAuthTab('login');
      return;
    }

    // Update profile with bio (trigger creates it, we patch extra fields)
    if (data.user)
