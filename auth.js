// ============================================================
// auth.js — Authentication & session management
// Butterfly Dynamix Learning Platform
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
    if (data.user) {
      await db.from('profiles').update({ bio, first_name: first, last_name: last }).eq('id', data.user.id);
    }

    // Set current user
    await loadCurrentUser(data.user);

    // Show welcome screen
    document.getElementById('wName').textContent = first;
    document.getElementById('wAvatar').textContent = avatar;
    showStep('welcome');

  } catch (err) {
    console.error('Signup catch error:', err);
    alert('Signup error: ' + (err.message || err.status || JSON.stringify(err)));
    btn.textContent = 'Create Account →';
    btn.disabled = false;
  }
}

// ── LOG IN ──────────────────────────────────────────────────
async function doLogin() {
  const btn   = document.getElementById('loginSubmitBtn');
  const email = document.getElementById('lemail').value.trim();
  const pw    = document.getElementById('lpw').value;

  btn.textContent = 'Logging in…';
  btn.disabled = true;

  try {
    const { data, error } = await db.auth.signInWithPassword({ email, password: pw });

    if (error) {
      document.getElementById('lEPW').classList.add('show');
      btn.textContent = 'Log In →';
      btn.disabled = false;
      return;
    }

    await loadCurrentUser(data.user);
    closeAuth();
    enterApp();

  } catch (err) {
    alert('Login error: ' + err.message);
    btn.textContent = 'Log In →';
    btn.disabled = false;
  }
}

// ── LOG OUT ─────────────────────────────────────────────────
async function logout() {
  await db.auth.signOut();
  currentUser = null;
  showPage('homePage');
  document.getElementById('guestNav').style.display = 'flex';
  document.getElementById('userNav').style.display = 'none';
  if (typeof closeTrack === 'function') closeTrack();
}

// ── LOAD USER DATA ───────────────────────────────────────────
async function loadCurrentUser(authUser) {
  if (!authUser) return;

  const { data: profile, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single();

  if (error || !profile) return;

  currentUser = {
    id:            profile.id,
    email:         authUser.email,
    username:      profile.username,
    firstName:     profile.first_name,
    lastName:      profile.last_name,
    avatar:        profile.avatar,
    bio:           profile.bio,
    isSubscribed:  profile.is_subscribed,
    tier:          profile.subscription_tier,
    pipScore:      parseFloat(profile.pip_score) || 1.00000,
    streak:        profile.day_streak || 0,
    totalLessons:  profile.total_lessons || 0,
    totalCorrect:  profile.total_correct || 0,
    createdAt:     profile.created_at,
  };

  // Update streak (if last active was yesterday, increment; if today, keep; else reset)
  await checkAndUpdateStreak(profile);
  updateNavForLoggedInUser();
}

// ── RESTORE SESSION ON PAGE LOAD ────────────────────────────
async function restoreSession() {
  const { data: { session } } = await db.auth.getSession();
  if (session?.user) {
    await loadCurrentUser(session.user);
    // If user was mid-track, stay on home. Let them navigate.
    updateNavForLoggedInUser();
  }
}

// ── STRIPE REDIRECT HANDLER ──────────────────────────────────
async function checkStripeRedirect() {
  const params = new URLSearchParams(window.location.search);

  // ── Flutterwave redirect params ──
  const fwStatus = params.get('status');
  const fwTxRef  = params.get('tx_ref');

  if (fwStatus && fwTxRef) {
    window.history.replaceState({}, '', window.location.pathname);

    if (fwStatus === 'successful' || fwStatus === 'completed') {
      const plan = (fwTxRef.includes('Annual')) ? 'annual' : 'professional';
      if (currentUser?.id) {
        await db.from('profiles').update({
          is_subscribed: true,
          subscription_tier: plan
        }).eq('id', currentUser.id);
        currentUser.isSubscribed = true;
        currentUser.tier = plan;
      }
      document.getElementById('paymentContent').style.display = 'none';
      document.getElementById('paymentSuccess').classList.add('show');
      document.getElementById('paymentOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      alert('Payment was not completed. Please try again.');
    }
    return;
  }

  // ── Stripe-style redirect params (legacy / fallback) ──
  const sessionId = params.get('session_id');
  const success   = params.get('success');

  if (success === 'true' && sessionId) {
    // Clean the URL
    window.history.replaceState({}, '', window.location.pathname);
    // Mark user as subscribed in Supabase
    if (currentUser?.id) {
      await db.from('profiles').update({
        is_subscribed: true,
        subscription_tier: 'professional'
      }).eq('id', currentUser.id);
      if (currentUser) {
        currentUser.isSubscribed = true;
        currentUser.tier = 'professional';
      }
    }
    // Show success modal
    document.getElementById('paymentContent').style.display = 'none';
    document.getElementById('paymentSuccess').classList.add('show');
    document.getElementById('paymentOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ── STREAK LOGIC ─────────────────────────────────────────────
async function checkAndUpdateStreak(profile) {
  const today = new Date().toISOString().split('T')[0];
  const last  = profile.last_active_date;

  let newStreak = profile.day_streak || 0;

  if (!last) {
    newStreak = 1;
  } else {
    const diff = Math.floor((new Date(today) - new Date(last)) / 86400000);
    if (diff === 0) {
      // Already active today — keep streak
    } else if (diff === 1) {
      newStreak += 1;
    } else {
      newStreak = 1; // Reset
    }
  }

  await db.from('profiles').update({
    last_active_date: today,
    day_streak: newStreak
  }).eq('id', profile.id);

  if (currentUser) currentUser.streak = newStreak;
}

// ── UPDATE NAV FOR LOGGED-IN USER ───────────────────────────
function updateNavForLoggedInUser() {
  if (!currentUser) return;
  document.getElementById('guestNav').style.display = 'none';
  document.getElementById('userNav').style.display = 'flex';
  document.getElementById('navAvatar').textContent = currentUser.avatar;
  document.getElementById('navStreak').textContent = `🔥 ${currentUser.streak}`;
  if (document.getElementById('navPip')) {
    document.getElementById('navPip').textContent = currentUser.pipScore.toFixed(5);
  }
  const trialBadge = document.getElementById('navTrialBadge');
  if (trialBadge && typeof getAccessStatus === 'function') {
    const access = getAccessStatus();
    if (access.status === 'trial') {
      trialBadge.style.display = 'inline-block';
      trialBadge.textContent = access.daysLeft === 1 ? 'Trial: 1 day left' : `Trial: ${access.daysLeft} days left`;
    } else if (access.status === 'expired') {
      trialBadge.style.display = 'inline-block';
      trialBadge.textContent = 'Trial ended';
    } else {
      trialBadge.style.display = 'none';
    }
  }
}

// ── SAVE TRACK PROGRESS ──────────────────────────────────────
async function saveTrackProgress(trackKey, lessonIndex) {
  if (!currentUser) return;
  await db.from('track_progress').upsert({
    user_id:      currentUser.id,
    track_key:    trackKey,
    lesson_index: lessonIndex,
  }, { onConflict: 'user_id,track_key,lesson_index' });
}

// ── LOAD TRACK PROGRESS ──────────────────────────────────────
async function loadTrackProgress(trackKey) {
  if (!currentUser) return [];
  const { data } = await db
    .from('track_progress')
    .select('lesson_index')
    .eq('user_id', currentUser.id)
    .eq('track_key', trackKey);
  return (data || []).map(r => r.lesson_index);
}

// ── AWARD PIPS ───────────────────────────────────────────────
async function awardPips(delta, reason) {
  if (!currentUser) return;
  const newScore = parseFloat((currentUser.pipScore + delta).toFixed(5));

  await Promise.all([
    db.from('profiles').update({
      pip_score:     newScore,
      total_correct: currentUser.totalCorrect + 1,
      total_lessons: currentUser.totalLessons
    }).eq('id', currentUser.id),

    db.from('pip_history').insert({
      user_id:     currentUser.id,
      delta,
      score_after: newScore,
      reason
    })
  ]);

  currentUser.pipScore    = newScore;
  currentUser.totalCorrect += 1;

  // Update UI
  if (document.getElementById('navPip')) {
    document.getElementById('navPip').textContent = newScore.toFixed(5);
  }
  if (document.getElementById('dashPip')) {
    document.getElementById('dashPip').textContent = newScore.toFixed(5);
  }
}

// ── SUBMIT QUIZ ANSWER ───────────────────────────────────────
async function recordQuizAnswer(trackKey, lessonIndex, questionIndex, isCorrect, pipsEarned) {
  if (!currentUser) return;
  await db.from('quiz_answers').insert({
    user_id:        currentUser.id,
    track_key:      trackKey,
    lesson_index:   lessonIndex,
    question_index: questionIndex,
    is_correct:     isCorrect,
    pips_earned:    pipsEarned
  });
  if (isCorrect && pipsEarned > 0) {
    await awardPips(pipsEarned, 'quiz_correct');
  }
}

// ── COMMUNITY: LOAD POSTS ────────────────────────────────────
async function loadPosts(topic = 'all', limit = 20) {
  let query = db
    .from('posts')
    .select(`*, profiles(username, avatar)`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (topic !== 'all') query = query.eq('topic', topic);

  const { data, error } = await query;
  return error ? [] : data;
}

// ── COMMUNITY: CREATE POST ───────────────────────────────────
async function createPost(topic, body, title = '', isOpinion = false) {
  if (!currentUser) { openAuth('signup'); return null; }
  const { data, error } = await db.from('posts').insert({
    user_id:    currentUser.id,
    topic,
    title,
    body,
    is_opinion: isOpinion
  }).select().single();
  return error ? null : data;
}

// ── COMMUNITY: VOTE ON POST ──────────────────────────────────
async function votePost(postId, direction) {
  if (!currentUser) { openAuth('signup'); return; }
  // Toggle: if voted same direction, remove vote
  const { data: existing } = await db
    .from('post_votes')
    .select('id, direction')
    .eq('post_id', postId)
    .eq('user_id', currentUser.id)
    .maybeSingle();

  if (existing) {
    if (existing.direction === direction) {
      await db.from('post_votes').delete().eq('id', existing.id);
    } else {
      await db.from('post_votes').update({ direction }).eq('id', existing.id);
    }
  } else {
    await db.from('post_votes').insert({ post_id: postId, user_id: currentUser.id, direction });
  }
}

// ── COMMUNITY: LOAD REPLIES ──────────────────────────────────
async function loadReplies(postId) {
  const { data, error } = await db
    .from('replies')
    .select(`*, profiles(username, avatar)`)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  return error ? [] : data;
}

// ── COMMUNITY: CREATE REPLY ──────────────────────────────────
async function createReply(postId, body) {
  if (!currentUser) { openAuth('signup'); return null; }
  const { data, error } = await db.from('replies').insert({
    post_id: postId,
    user_id: currentUser.id,
    body
  }).select().single();
  return error ? null : data;
}

// ── LEADERBOARD ──────────────────────────────────────────────
async function loadLeaderboard(limit = 10) {
  const { data, error } = await db
    .from('leaderboard')
    .select('*')
    .limit(limit);
  return error ? [] : data;
}

// ── USER PROFILE ─────────────────────────────────────────────
async function loadUserProfile(username) {
  const { data: profile, error } = await db
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
  if (error) return null;

  const { data: posts } = await db
    .from('posts')
    .select('*')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false });

  return { profile, posts: posts || [] };
}

async function loadUserReplies(userId) {
  const { data: replies, error } = await db
    .from('replies')
    .select('id, post_id, body, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return error ? [] : (replies || []);
}

// ── NEWSLETTER SUBSCRIBE ─────────────────────────────────────
async function nlSubmit() {
  const emailEl = document.getElementById('nlEmail');
  const noteEl  = document.getElementById('nlNote');
  const email   = emailEl.value.trim();
  if (!email || !email.includes('@')) {
    noteEl.textContent = 'Please enter a valid email.';
    noteEl.style.color = 'var(--red, #e05)';
    return;
  }
  const { error } = await db.from('newsletter_subscribers').insert({ email });
  if (error && error.code === '23505') {
    noteEl.textContent = "You're already subscribed!";
  } else if (error) {
    noteEl.textContent = 'Something went wrong. Try again.';
    noteEl.style.color = 'var(--red, #e05)';
  } else {
    emailEl.value = '';
    noteEl.textContent = "You're in! Welcome to the Butterfly Dynamix Learning community.";
    noteEl.style.color = 'var(--green, #4caf50)';
  }
}

// ── DEFINITION SUGGESTION ────────────────────────────────────
async function submitSuggestedDefinition(idx) {
  if (!currentUser) { openAuth('signup'); return; }
  const text = document.getElementById('suggestDefText')?.value?.trim();
  if (!text) return;
  await db.from('definition_suggestions').insert({
    user_id:      currentUser.id,
    track_key:    activeTrackKey,
    lesson_index: idx,
    suggested_text: text
  });
  alert('Thank you! Your definition suggestion has been submitted for review.');
  document.getElementById('suggestDefOverlay')?.classList.remove('open');
}

// ── STRIPE CHECKOUT ──────────────────────────────────────────
async function initiateStripeCheckout() {
  // This calls your Stripe payment link or a Supabase Edge Function.
  // For now, opens Stripe checkout. Replace STRIPE_PAYMENT_LINK with your actual link.
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK';
  const email = currentUser?.email || document.getElementById('payEmail')?.value || '';
  const url = `${STRIPE_PAYMENT_LINK}?prefilled_email=${encodeURIComponent(email)}&client_reference_id=${currentUser?.id || ''}`;
  window.location.href = url;
}
