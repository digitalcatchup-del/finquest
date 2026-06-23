// ============================================================
// app.js — Core application logic
// Butterfly Dynamix Learning Platform
// Depends on: supabase-config.js, auth.js, data.js
// ============================================================

// ── FLUTTERWAVE CONFIG ───────────────────────────────────────
// TEST MODE — switch to live public key once Flutterwave business
// verification (RC/BN number) is complete.
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-d7a81c18068d8b0323e75325c070f81b-X';

// ── PRICING CONFIG ───────────────────────────────────────────
// Professional pricing is a fixed journey for every subscriber, counted
// from their own signup date (currentUser.createdAt) — not a calendar
// cutoff tied to launch day. Every new person gets the same path:
// 7 days free, then the intro rate for 90 days, then the standard rate.
const PROFESSIONAL_TRIAL_DAYS = 7;
const PROFESSIONAL_INTRO_DAYS = 90;   // length of the $3 window, starting after the trial
const PROFESSIONAL_INTRO_PRICE = 3;
const PROFESSIONAL_STANDARD_PRICE = 5;
const EXPERT_PRICE = 15; // flat, no trial

// Returns { stage: 'trial' | 'intro' | 'standard', amount, daysLeft }
// daysLeft is days remaining in the *current* stage (trial or intro).
function getProfessionalBillingStage() {
  if (!currentUser || !currentUser.createdAt) {
    return { stage: 'trial', amount: 0, daysLeft: PROFESSIONAL_TRIAL_DAYS };
  }
  const daysSinceSignup = (Date.now() - new Date(currentUser.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceSignup < PROFESSIONAL_TRIAL_DAYS) {
    return { stage: 'trial', amount: 0, daysLeft: Math.ceil(PROFESSIONAL_TRIAL_DAYS - daysSinceSignup) };
  }
  const introEnd = PROFESSIONAL_TRIAL_DAYS + PROFESSIONAL_INTRO_DAYS;
  if (daysSinceSignup < introEnd) {
    return { stage: 'intro', amount: PROFESSIONAL_INTRO_PRICE, daysLeft: Math.ceil(introEnd - daysSinceSignup) };
  }
  return { stage: 'standard', amount: PROFESSIONAL_STANDARD_PRICE, daysLeft: 0 };
}

// Returns { status: 'guest' | 'paid' | 'trial' | 'expired', daysLeft }
// 'expired' means the free trial ended and they haven't paid — they fall
// back to the Free tier's limits (15 lessons / 4 mock exams monthly etc.)
function getAccessStatus() {
  if (!currentUser) return { status: 'guest', daysLeft: 0 };
  if (currentUser.isSubscribed) return { status: 'paid', daysLeft: 0 };
  const stage = getProfessionalBillingStage();
  return stage.stage === 'trial'
    ? { status: 'trial', daysLeft: stage.daysLeft }
    : { status: 'expired', daysLeft: 0 };
}

// True if the person should see full Professional-level access right now —
// either an active paid subscription, or still inside their 7-day trial.
// NOTE: this helper exists and is accurate, but is not yet wired into
// track.js to actually enforce the Free-tier limits (15 lessons / 4 mock
// exams monthly, novel chapters 1-3 only, Episode 1 only) for 'expired'
// users — nothing in the app currently restricts content at this level.
function hasFullAccess() {
  const s = getAccessStatus().status;
  return s === 'paid' || s === 'trial';
}

// The pricing cards' copy is now fixed marketing text (same words for
// every visitor), so there's nothing left to re-render dynamically on
// page load — kept as a no-op so the existing DOMContentLoaded call
// doesn't need to change. Real per-user pricing is resolved at the
// moment of checkout, in openPayment() below.
function renderPricingDisplay() {}

// ── PIP UTILITIES ────────────────────────────────────────────
const pipUnits = 0.00010;

function pipStr(units) {
  const base = currentUser ? currentUser.pipScore : 1.00000;
  return base.toFixed(5);
}

// ── PAGE NAVIGATION ──────────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function smoothScroll(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── MOBILE NAV ───────────────────────────────────────────────
function toggleMobileNav() {
  document.getElementById('mobileNavDropdown').classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNavDropdown').classList.remove('open');
}

// Click anywhere outside the open mobile menu (or its hamburger button) to
// close it, in addition to clicking the hamburger again.
document.addEventListener('click', (e) => {
  const dropdown  = document.getElementById('mobileNavDropdown');
  const hamburger = document.getElementById('navHamburger');
  if (!dropdown || !dropdown.classList.contains('open')) return;
  if (dropdown.contains(e.target) || (hamburger && hamburger.contains(e.target))) return;
  closeMobileNav();
});

// ── AUTH MODAL ───────────────────────────────────────────────
function openAuth(tab = 'signup') {
  switchAuthTab(tab);
  document.getElementById('authOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  document.getElementById('signupFlow').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('loginFlow').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
}

function showStep(step) {
  document.querySelectorAll('.auth-step').forEach(s => s.classList.remove('active'));
  if (step === 'welcome') {
    document.getElementById('sWelcome').classList.add('active');
  } else {
    document.getElementById(`sStep${step}`).classList.add('active');
  }
}

function goStep1() {
  const first = document.getElementById('sfirst').value.trim();
  const last  = document.getElementById('slast').value.trim();
  const email = document.getElementById('semail').value.trim();
  const pw    = document.getElementById('spw').value;
  let valid   = true;

  if (!first) { document.getElementById('eFirst').classList.add('show'); valid = false; }
  else document.getElementById('eFirst').classList.remove('show');
  if (!last)  { document.getElementById('eLast').classList.add('show'); valid = false; }
  else document.getElementById('eLast').classList.remove('show');
  if (!email || !email.includes('@')) { document.getElementById('eEmail').classList.add('show'); valid = false; }
  else document.getElementById('eEmail').classList.remove('show');
  if (pw.length < 8) { document.getElementById('ePW').classList.add('show'); valid = false; }
  else document.getElementById('ePW').classList.remove('show');

  if (valid) showStep(3);
}

function checkPW(input) {
  const fill = document.getElementById('pwFill');
  const len  = input.value.length;
  const pct  = Math.min((len / 12) * 100, 100);
  fill.style.width = pct + '%';
  fill.style.background = len < 8 ? '#e05' : len < 10 ? '#f90' : '#4caf50';
}

function togglePW(id, btn) {
  const input = document.getElementById(id);
  input.type  = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
}

// ── AVATAR GRID ──────────────────────────────────────────────
const avatars = ['😎','🚀','🧠','⚡','📈','📊','🌍','💡','🎯','🔥','💰','🦋','🏆','⭐','🎓','💼'];

function buildAvatarGrid() {
  const grid = document.getElementById('avatarGrid');
  if (!grid) return;
  grid.innerHTML = avatars.map(a =>
    `<div class="avatar-opt" onclick="selectAvatar('${a}',this)">${a}</div>`
  ).join('');
}

function selectAvatar(avatar, el) {
  window._selectedAvatar = avatar;
  document.querySelectorAll('.avatar-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

// ── ENTER APP (after login/signup) ───────────────────────────
function enterApp() {
  closeAuth();
  showPage('homePage');
}

// ── ACCOUNTING MODAL ─────────────────────────────────────────
function openAccounting() {
  const topics = accountingTopics || [];
  document.getElementById('modalTitle').textContent = 'Accounting';
  document.getElementById('modalTag').textContent = '';
  document.getElementById('modalBody').innerHTML = `
    <p style="font-size:0.82rem;color:var(--muted);margin-bottom:20px;">
      Choose a track to start learning.
    </p>
    <div style="display:grid;gap:10px;">
      ${topics.map(t => `
        <div onclick="event.stopPropagation();${t.status === 'available'
          ? `closeLessonOverlay();launchTrack('${t.key}')`
          : `alert('${t.name} is coming soon!')`
        }" style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;
          padding:14px;cursor:pointer;transition:border-color 0.15s;
          ${t.status === 'soon' ? 'opacity:0.5;' : ''}"
          onmouseover="this.style.borderColor='var(--gold)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.4rem;">${t.icon}</span>
            <div>
              <div style="font-size:0.82rem;font-weight:700;color:var(--white);">${t.name}</div>
              <div style="font-size:0.7rem;color:var(--muted);margin-top:2px;">${t.desc}</div>
              <div style="font-size:0.65rem;color:var(--muted2);margin-top:4px;">
                ${t.lessons} lessons
                ${t.status === 'soon' ? '· <span style="color:var(--gold)">Coming soon</span>' : ''}
              </div>
            </div>
          </div>
        </div>`
      ).join('')}
    </div>`;
  document.getElementById('modalQuiz').innerHTML = '';
  document.getElementById('lessonOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLessonOverlay() {
  document.getElementById('lessonOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SAMPLE NUGGET (free preview) ─────────────────────────────
let nuggetIdx   = 0;
let currentLesson = null;
let lessonAnswered = false;

function openSampleNugget(idx) {
  const nuggets = sampleLessons?.acc || [];
  nuggetIdx = (typeof idx === 'number') ? idx : Math.floor(Math.random() * nuggets.length);
  currentLesson  = 'acc';
  lessonAnswered = false;
  renderSampleNugget();
  document.getElementById('lessonOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderSampleNugget() {
  const nuggets = sampleLessons?.acc || [];
  const n = nuggets[nuggetIdx];
  if (!n) return;
  document.getElementById('modalTitle').textContent = n.term;
  document.getElementById('modalTag').textContent   = '📊 Accounting';
  document.getElementById('modalBody').innerHTML    = `
    <div class="nugget-def-card">
      <div class="nugget-def-label">Definition</div>
      <div class="nugget-def-text">${n.definition}</div>
    </div>
    <div class="nugget-scenario-card">
      <div class="nugget-scenario-label">Scenario</div>
      <div class="nugget-scenario-text">${n.scenario}</div>
    </div>`;
  renderNuggetQuiz(n);
}

function renderNuggetQuiz(n) {
  if (!n.quiz) return;
  const q = n.quiz;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  document.getElementById('modalQuiz').innerHTML = `
    <div class="modal-quiz-q">${q.question}</div>
    <div class="modal-quiz-opts">
      ${q.options.map((o, i) => `
        <button class="modal-quiz-opt" onclick="answerNugget(${i},${q.correct},this)">
          <span class="modal-quiz-opt-letter">${letters[i]}</span>
          <span class="modal-quiz-opt-text">${o}</span>
        </button>`).join('')}
    </div>
    <div class="modal-fb" id="modalFb"></div>
    <div class="pip-reward" id="pipReward"></div>
    <div class="signup-prompt" id="nuggetSignupPrompt"></div>`;
}

function answerNugget(idx, correct, btn) {
  if (lessonAnswered) return;
  lessonAnswered = true;
  const opts = document.querySelectorAll('.modal-quiz-opt');
  opts.forEach((o, i) => {
    o.disabled = true;
    if (i === correct) o.classList.add('correct');
    else if (i === idx) o.classList.add('wrong');
  });

  const fb = document.getElementById('modalFb');
  const pr = document.getElementById('pipReward');
  const sp = document.getElementById('nuggetSignupPrompt');

  if (idx === correct) {
    fb.textContent = '✓ Correct!';
    fb.classList.add('show', 'cfb');
    pr.innerHTML = '⚡ +0.00010 pips awarded';
    pr.classList.add('show');
    if (currentUser) awardPips(0.00010, 'quiz_correct');
  } else {
    fb.textContent = '✗ Not quite — review the definition above.';
    fb.classList.add('show', 'wfb');
  }

  if (!currentUser) {
    sp.innerHTML = `
      <p style="font-size:0.78rem;color:var(--muted);margin:16px 0 8px;">
        Create a free account to save your pip score and track your progress.
      </p>
      <button class="btn btn-gold btn-full" onclick="closeLessonOverlay();openAuth('signup')">
        Join Free →
      </button>`;
    sp.classList.add('show');
  }
}

function goToNewsletter() {
  showPage('homePage');
  setTimeout(() => {
    document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 250);
}

// ── ARTICLES ─────────────────────────────────────────────────
function openArticlesPage() {
  showPage('articlesPage');
  renderArticlesGrid();
}

// Generated gradient-and-icon cover treatment — no external images, so
// nothing to license or hotlink. Swap in real photography later by
// changing this one function.
function renderArticleCover(article) {
  return `<div class="article-cover" style="background:${article.cover}">
    <span class="article-cover-icon">${article.coverIcon}</span>
  </div>`;
}

function renderArticlesGrid() {
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;
  grid.innerHTML = articles.map(a => `
    <div class="article-card">
      <div class="article-card-link" onclick="openArticle('${a.slug}')">
        ${renderArticleCover(a)}
        <h3 class="article-card-title">${a.title}</h3>
      </div>
      <p class="article-card-excerpt">${a.excerpt}</p>
    </div>`).join('');
}

async function openArticle(slug) {
  showPage('articleDetailPage');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await renderArticleDetail(slug);
}

async function renderArticleDetail(slug) {
  const article = articles.find(a => a.slug === slug);
  const container = document.getElementById('articleDetailContent');
  if (!article) {
    container.innerHTML = '<p style="color:var(--muted);">Article not found.</p>';
    return;
  }

  container.innerHTML = `
    ${renderArticleCover(article)}
    <h1 class="article-detail-title">${article.title}</h1>
    <div class="article-detail-body">${article.body}</div>
    <div class="article-engage-row">
      <button class="article-like-btn" id="articleLikeBtn" onclick="handleArticleLikeClick('${slug}')">
        👍 <span id="articleLikeCount">…</span>
      </button>
    </div>
    <div class="article-comments-section">
      <h3 class="article-comments-heading">Comments</h3>
      <div class="article-comment-composer">
        <textarea id="articleCommentInput" maxlength="500" placeholder="Share your thoughts on this article..."></textarea>
        <button class="btn btn-gold" onclick="handleSubmitArticleComment('${slug}')">Comment</button>
      </div>
      <div id="articleCommentsList"><p style="color:var(--muted);font-size:0.82rem;">Loading comments…</p></div>
    </div>
    <div class="further-reading-section">
      <h3 class="further-reading-heading">Further Reading</h3>
      <div class="articles-grid" id="furtherReadingGrid"></div>
    </div>`;

  renderFurtherReading(slug);
  refreshArticleLikeState(slug);
  refreshArticleComments(slug);
}

function renderFurtherReading(currentSlug) {
  const grid = document.getElementById('furtherReadingGrid');
  if (!grid) return;
  const others = articles.filter(a => a.slug !== currentSlug).slice(0, 3);
  grid.innerHTML = others.map(a => `
    <div class="article-card">
      <div class="article-card-link" onclick="openArticle('${a.slug}')">
        ${renderArticleCover(a)}
        <h3 class="article-card-title">${a.title}</h3>
      </div>
    </div>`).join('');
}

async function refreshArticleLikeState(slug) {
  const { count, likedByMe } = await getArticleLikeState(slug);
  const btn = document.getElementById('articleLikeBtn');
  const countEl = document.getElementById('articleLikeCount');
  if (countEl) countEl.textContent = count;
  if (btn) btn.classList.toggle('liked', likedByMe);
}

async function handleArticleLikeClick(slug) {
  if (!currentUser) { openAuth('signup'); return; }
  await toggleArticleLike(slug);
  refreshArticleLikeState(slug);
}

async function refreshArticleComments(slug) {
  const comments = await loadArticleComments(slug);
  const list = document.getElementById('articleCommentsList');
  if (!list) return;
  if (!comments.length) {
    list.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;">No comments yet — be the first to share your thoughts.</p>';
    return;
  }
  list.innerHTML = comments.map(c => `
    <div class="article-comment-card">
      <div class="article-comment-avatar">${c.profiles.avatar}</div>
      <div class="article-comment-body">
        <div class="article-comment-meta">
          <span class="article-comment-name" style="cursor:pointer;" onclick="openProfileByUsername('${c.profiles.username}','articleDetailPage')">@${c.profiles.username}</span>
          <span class="forum-post-dot">·</span>
          <span class="article-comment-time">${timeAgo(c.created_at)}</span>
        </div>
        <div class="article-comment-text">${c.body}</div>
      </div>
    </div>`).join('');
}

async function handleSubmitArticleComment(slug) {
  const input = document.getElementById('articleCommentInput');
  if (!input) return;
  const body = input.value.trim();
  if (!body) return;
  const result = await submitArticleComment(slug, body);
  if (result) {
    input.value = '';
    refreshArticleComments(slug);
  }
}

// ── USER PROFILE PAGE ────────────────────────────────────────
let viewingProfileData  = null;
let viewingIsOwnProfile = false;
let profileReturnPage   = 'articlesPage';

async function openProfileByUsername(username, returnPage) {
  profileReturnPage = returnPage || 'articlesPage';
  showPage('profilePage');
  document.getElementById('profileHeader').innerHTML =
    '<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:40px 0;">Loading profile…</p>';
  document.getElementById('profileFeed').innerHTML = '';

  const data = await loadUserProfile(username);
  if (!data) {
    document.getElementById('profileHeader').innerHTML =
      '<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:40px 0;">Profile not found.</p>';
    return;
  }

  viewingProfileData  = data;
  viewingIsOwnProfile = currentUser?.username === data.profile.username;
  renderProfileHeader(data.profile);
  renderProfileComments(data.comments);
}

function openMyProfile() {
  if (!currentUser) { openAuth('login'); return; }
  // Opening from the nav avatar should return to wherever we already were —
  // simplest reliable default is home, since the nav is visible everywhere.
  openProfileByUsername(currentUser.username, 'homePage');
}

function renderProfileHeader(profile) {
  const joined = new Date(profile.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  document.getElementById('profileHeader').innerHTML = `
    <div class="profile-header-card">
      <div class="profile-avatar-large">${profile.avatar}</div>
      <div class="profile-name-large">@${profile.username}</div>
      ${profile.bio ? `<div class="profile-bio-text">${profile.bio}</div>` : ''}
      <div class="profile-joined">Joined ${joined}</div>
      <div class="profile-stats-row">
        <div><div class="profile-stat-val">${parseFloat(profile.pip_score).toFixed(5)}</div><div class="profile-stat-label">Pip Score</div></div>
        <div><div class="profile-stat-val">🔥 ${profile.day_streak}</div><div class="profile-stat-label">Day Streak</div></div>
        <div><div class="profile-stat-val">${profile.total_lessons}</div><div class="profile-stat-label">Lessons</div></div>
        <div><div class="profile-stat-val">${profile.total_correct}</div><div class="profile-stat-label">Correct</div></div>
      </div>
      ${viewingIsOwnProfile ? `<button class="profile-edit-btn" onclick="openEditProfile()">Edit Profile</button>` : ''}
    </div>`;
}

function renderProfileComments(comments) {
  const el = document.getElementById('profileFeed');
  if (!comments || !comments.length) {
    el.innerHTML = '<p class="profile-empty">No comments yet.</p>';
    return;
  }
  el.innerHTML = comments.map(c => {
    const article = articles.find(a => a.slug === c.article_id);
    return `
    <div class="forum-post-card" onclick="openArticle('${c.article_id}')">
      <div class="forum-post-avatar">${viewingProfileData.profile.avatar}</div>
      <div class="forum-post-body">
        <div class="forum-post-meta">
          <span class="forum-post-name">@${viewingProfileData.profile.username}</span>
          <span class="forum-post-dot">·</span>
          <span class="forum-post-time">${timeAgo(c.created_at)}</span>
          ${article ? `<span class="forum-post-dot">·</span><span class="forum-post-time">on “${article.title}”</span>` : ''}
        </div>
        <div class="forum-post-text">${c.body}</div>
      </div>
    </div>`;
  }).join('');
}

function closeProfile() {
  showPage(profileReturnPage);
}

// ── EDIT PROFILE ──────────────────────────────────────────────
function openEditProfile() {
  if (!currentUser) return;
  window._editSelectedAvatar = currentUser.avatar;
  buildEditAvatarGrid();
  document.getElementById('editBio').value = currentUser.bio || '';
  document.getElementById('editProfileOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEditProfile() {
  document.getElementById('editProfileOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function buildEditAvatarGrid() {
  const grid = document.getElementById('editAvatarGrid');
  if (!grid) return;
  grid.innerHTML = avatars.map(a =>
    `<div class="avatar-opt ${a === currentUser.avatar ? 'selected' : ''}" onclick="selectEditAvatar('${a}',this)">${a}</div>`
  ).join('');
}

function selectEditAvatar(avatar, el) {
  window._editSelectedAvatar = avatar;
  document.querySelectorAll('#editAvatarGrid .avatar-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

async function saveProfileEdits() {
  if (!currentUser) return;
  const btn    = document.getElementById('editProfileSaveBtn');
  const bio    = document.getElementById('editBio').value.trim();
  const avatar = window._editSelectedAvatar || currentUser.avatar;

  btn.textContent = 'Saving…';
  btn.disabled = true;

  const { error } = await db.from('profiles').update({ bio, avatar }).eq('id', currentUser.id);

  btn.textContent = 'Save Changes →';
  btn.disabled = false;

  if (error) {
    alert('Could not save changes: ' + error.message);
    return;
  }

  currentUser.bio    = bio;
  currentUser.avatar = avatar;
  document.getElementById('navAvatar').textContent = avatar;
  closeEditProfile();

  // Refresh the profile view if we're looking at our own profile right now
  if (viewingIsOwnProfile && viewingProfileData) {
    viewingProfileData.profile.bio    = bio;
    viewingProfileData.profile.avatar = avatar;
    renderProfileHeader(viewingProfileData.profile);
  }
}

// ── LEADERBOARD ──────────────────────────────────────────────
async function renderLeaderboard() {
  const el = document.getElementById('leaderboardList');
  if (!el) return;
  const rows = await loadLeaderboard(10);
  el.innerHTML = rows.map((r, i) => `
    <div class="lb-row ${i === 0 ? 'lb-top' : ''}">
      <span class="lb-rank">#${r.rank}</span>
      <span class="lb-avatar">${r.avatar}</span>
      <span class="lb-name">@${r.username}</span>
      <span class="lb-pip">${parseFloat(r.pip_score).toFixed(5)}</span>
      <span class="lb-streak">🔥 ${r.day_streak}</span>
    </div>`).join('');
}

// ── PAYMENT (Paystack) ───────────────────────────────────────
function openPayment(planKey) {
  // planKey: 'professional' or 'expert'.
  // Guests can't check out (there's no account yet to attach the payment
  // to) — send them to sign up first, which also starts their 7-day trial.
  if (!currentUser) { openAuth('signup'); return; }

  let planName, amount;
  if (planKey === 'expert') {
    planName = 'Expert';
    amount   = EXPERT_PRICE;
  } else {
    planName = 'Professional';
    const stage = getProfessionalBillingStage();
    // If someone clicks "Subscribe" while still mid-trial, treat it as
    // converting early — charge the intro rate rather than $0.
    amount = stage.stage === 'trial' ? PROFESSIONAL_INTRO_PRICE : stage.amount;
  }
  const priceLabel = `$${amount}/month`;

  document.getElementById('payPlanName').textContent  = planName;
  document.getElementById('payPlanPrice').innerHTML   = priceLabel.replace('/', ' <span>/</span> ');
  document.getElementById('paymentContent').style.display = 'block';
  document.getElementById('paymentSuccess').classList.remove('show');
  document.getElementById('paymentOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  window._payPlan = { name: planName, amount };
}

function closePayment() {
  document.getElementById('paymentOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initiateStripeCheckout() {
  // Using Flutterwave (function name kept for compatibility with HTML onclick)
  const email = currentUser?.email || document.getElementById('payEmail')?.value?.trim();
  const name  = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
    : document.getElementById('payName')?.value?.trim();

  if (!email) { alert('Please enter your email address.'); return; }

  const plan     = window._payPlan || { name: 'Professional', amount: PROFESSIONAL_STANDARD_PRICE };
  const NGN_RATE = 1360; // approximate USD→NGN rate as of June 2026 — naira is volatile,
                          // recheck this periodically (e.g. quarterly) before live launch
                          // and afterward, rather than letting it go stale for years.
  const amountNGN = plan.amount * NGN_RATE;

  if (typeof FlutterwaveCheckout === "undefined") {
    alert("Payment system loading — please try again.");
    return;
  }

  FlutterwaveCheckout({
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref:     'BDL_' + plan.name + '_' + Date.now(),
    amount:     amountNGN,
    currency:   'NGN',
    payment_options: 'card, banktransfer, ussd',
    redirect_url: window.location.origin + window.location.pathname,
    customer: {
      email,
      name: name || 'Butterfly Dynamix Learner',
    },
    customizations: {
      title:       'Butterfly Dynamix Learning',
      description: `${plan.name} Subscription`,
      logo:        '',
    },
    meta: {
      plan:    plan.name,
      user_id: currentUser?.id || '',
    },
    callback: function (response) {
      // Kept as a fallback in case the modal closes via callback before the
      // redirect fires. The redirect_url above is now the primary,
      // more reliable path for confirming payment.
      if (typeof closePaymentModal === 'function') closePaymentModal();
    },
    onclose: function () {
      // User closed payment modal — do nothing
    },
  });
}

async function handleFlutterwaveSuccess(plan, response) {
  if (currentUser?.id) {
    await db.from('profiles').update({
      is_subscribed:     true,
      subscription_tier: plan.name.toLowerCase()
    }).eq('id', currentUser.id);
    currentUser.isSubscribed = true;
    currentUser.tier = plan.name.toLowerCase();
  }
  document.getElementById('paymentContent').style.display = 'none';
  document.getElementById('paymentSuccess').classList.add('show');
}

// ── DAILY TIP ────────────────────────────────────────────────
function initDailyTip() {
  const tips = dailyTips || [];
  if (!tips.length) return;
  const idx  = new Date().getDate() % tips.length;
  const tip  = tips[idx];
  const dateEl   = document.getElementById('tipDate');
  const textEl   = document.getElementById('tipText');
  const sourceEl = document.getElementById('tipSource');
  if (dateEl)   dateEl.textContent   = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long' });
  if (textEl)   textEl.textContent   = tip.text;
  if (sourceEl) sourceEl.textContent = tip.source || '';
}

// ── AI CHAT INPUT HANDLING ────────────────────────────────────
function onSearch() { /* no-op in AI mode — no live suggestions */ }

function onSearchKey(e) {
  if (e.key === 'Enter') doSearch();
}

// ── ROTATING PLACEHOLDER ENGINE (type in / type out) ──────────
// Reusable engine: each instance (home search, composer, etc.)
// gets its own rotation state so they cycle independently.
// Text types in character by character. If the fully-typed text
// is too long for the box (it would underlap the search button,
// or run past the textarea edge), it scrolls left afterward to
// reveal the full text, holds, then types back out from the end.
const allSearchQuestions = searchQuestionBatches.flat();
const searchPlaceholderInstances = {};

const PLACEHOLDER_TYPE_SPEED   = 38;  // ms per character, typing in
const PLACEHOLDER_DELETE_SPEED = 22;  // ms per character, typing out
const PLACEHOLDER_HOLD_MS      = 5000; // pause once fully visible
const PLACEHOLDER_SCROLL_SPEED = 90;   // px / second, reveal-scroll

function startSearchPlaceholderRotation(wrapId, textId, inputId, questions) {
  if (searchPlaceholderInstances[wrapId]) {
    clearTimeout(searchPlaceholderInstances[wrapId].timer);
  }
  const pool = questions || allSearchQuestions;
  const state = { index: Math.floor(Math.random() * pool.length), timer: null, pool };
  searchPlaceholderInstances[wrapId] = state;
  runPlaceholderCycle(wrapId, textId, inputId, state);
}

function runPlaceholderCycle(wrapId, textId, inputId, state) {
  const input = document.getElementById(inputId);
  const el    = document.getElementById(textId);
  const wrap  = document.getElementById(wrapId);
  if (!el || !wrap) return;

  if (input && input.value) {
    state.timer = setTimeout(() => runPlaceholderCycle(wrapId, textId, inputId, state), 600);
    return;
  }

  const text = state.pool[state.index % state.pool.length];
  state.index++;
  state.currentText = text;

  el.style.transition = 'none';
  el.style.transform  = 'translateX(0)';
  el.textContent = '';

  typeInStep(wrapId, textId, inputId, state, text, 0);
}

function typeInStep(wrapId, textId, inputId, state, text, count) {
  const input = document.getElementById(inputId);
  const el    = document.getElementById(textId);
  if (!el) return;

  if (input && input.value) {
    state.timer = setTimeout(() => runPlaceholderCycle(wrapId, textId, inputId, state), 600);
    return;
  }

  count++;
  el.textContent = text.slice(0, count);

  if (count < text.length) {
    state.timer = setTimeout(() => typeInStep(wrapId, textId, inputId, state, text, count), PLACEHOLDER_TYPE_SPEED);
  } else {
    afterTypeIn(wrapId, textId, inputId, state, text);
  }
}

function afterTypeIn(wrapId, textId, inputId, state, text) {
  const el   = document.getElementById(textId);
  const wrap = document.getElementById(wrapId);
  if (!el || !wrap) return;

  // If the fully-typed text underlaps the button / runs past the box,
  // scroll left afterward so the full text becomes readable.
  const overflow = el.scrollWidth - wrap.clientWidth;
  if (overflow > 0) {
    const scrollDuration = Math.max(0.4, overflow / PLACEHOLDER_SCROLL_SPEED);
    state.timer = setTimeout(() => {
      el.style.transition = `transform ${scrollDuration}s linear`;
      el.style.transform  = `translateX(-${overflow + 4}px)`;
      state.timer = setTimeout(() => {
        typeOutStep(wrapId, textId, inputId, state, text, text.length);
      }, scrollDuration * 1000 + PLACEHOLDER_HOLD_MS);
    }, 350);
  } else {
    state.timer = setTimeout(() => {
      typeOutStep(wrapId, textId, inputId, state, text, text.length);
    }, PLACEHOLDER_HOLD_MS);
  }
}

function typeOutStep(wrapId, textId, inputId, state, text, count) {
  const input = document.getElementById(inputId);
  const el    = document.getElementById(textId);
  if (!el) return;

  if (input && input.value) {
    el.style.transition = 'none';
    el.style.transform  = 'translateX(0)';
    el.textContent = '';
    state.timer = setTimeout(() => runPlaceholderCycle(wrapId, textId, inputId, state), 600);
    return;
  }

  count--;
  el.textContent = text.slice(0, Math.max(0, count));

  if (count > 0) {
    state.timer = setTimeout(() => typeOutStep(wrapId, textId, inputId, state, text, count), PLACEHOLDER_DELETE_SPEED);
  } else {
    state.timer = setTimeout(() => runPlaceholderCycle(wrapId, textId, inputId, state), 250);
  }
}

function updateFakePlaceholder(val, wrapId) {
  const wrap = document.getElementById(wrapId || 'searchFakePlaceholder');
  if (wrap) wrap.style.display = val ? 'none' : 'flex';
}

function hideFakePlaceholder(wrapId) {
  const wrap = document.getElementById(wrapId || 'searchFakePlaceholder');
  if (wrap) wrap.style.display = 'none';
}

function showFakePlaceholder(wrapId, inputId) {
  const input = document.getElementById(inputId || 'searchInput');
  const wrap  = document.getElementById(wrapId || 'searchFakePlaceholder');
  if (wrap && input && !input.value) wrap.style.display = 'flex';
}

// ── AI CHAT ───────────────────────────────────────────────────
// The search bar is now an AI accounting tutor. Each conversation is
// held in memory for the session (aiChatHistory) so follow-up
// questions work naturally. Calls go to a Supabase Edge Function
// (ai-chat) which holds the Anthropic API key server-side so it
// never appears in the page source.
//
// TO WIRE UP: deploy the Edge Function from the /supabase/functions/
// folder (see README), then set ANTHROPIC_API_KEY in Supabase secrets.
// Until the function is deployed, the chat shows a friendly setup note.

let aiChatHistory = []; // { role: 'user'|'assistant', content: string }[]
let aiChatActive  = false;

const AI_SYSTEM_PROMPT = `You are an expert financial education tutor for Butterfly Dynamix Learning, a professional education platform. You help students and professionals understand any topic related to money, finance, and business.

Your areas of expertise:
- Accounting: double entry, accruals, prudence, going concern, depreciation, trial balance, P&L accounts, balance sheets, working capital, bad debts, IFRS, financial statements
- Personal finance: budgeting, saving, debt management, emergency funds, net worth, financial planning
- Investment: stocks, bonds, ETFs, mutual funds, portfolio construction, valuation (P/E, DCF, book value), dividends, compounding, risk vs return
- Trading: technical analysis, chart patterns, candlesticks, support and resistance, moving averages, risk management, position sizing, order types (market, limit, stop-loss)
- Economics: inflation, interest rates, monetary policy, fiscal policy, GDP, supply and demand, exchange rates, economic cycles
- Banking and credit: loans, mortgages, interest calculations, credit scores, overdrafts, central banking
- Business finance: cash flow, fundraising, startup valuation, business models, profit margins, break-even analysis
- Crypto and digital assets: how blockchain works, Bitcoin, Ethereum, DeFi concepts — explained factually and educationally
- Tax concepts: VAT, income tax, corporate tax, capital gains tax — general principles (always clarify you are not giving jurisdiction-specific tax advice)
- Professional exams: ICAN, ACCA, CFA, CPA topics and exam technique

Your personality: warm, encouraging, and precise. You use real-world examples relevant to Nigerian and global business contexts to make abstract ideas concrete. You celebrate curiosity and meet learners at their level — whether they are a complete beginner or an advanced professional.

Keep answers clear and well-structured. Not too short (unhelpful), not an essay (overwhelming). Use paragraph breaks. When it helps clarity, use a simple numbered or bulleted list. Do not use heavy markdown headers. End with a short follow-up invitation if there is a natural next question to explore. If someone asks something outside money, finance, or business, gently redirect them back to those topics.`;

function doSearch() {
  const val = document.getElementById('searchInput').value.trim();
  if (!val) return;
  askAI(val);
}

function onSearch() {
  // No live suggestions in AI mode — input is free-form question
}

async function askAI(question) {
  // Log the query (keeps search_log table useful as an analytics signal)
  if (currentUser) {
    db.from('search_log').insert({ user_id: currentUser.id, query: question }).then(() => {});
  }

  // Show the chat panel, hide homepage content
  document.getElementById('homeDefaultContent').style.display = 'none';
  const panel = document.getElementById('homeSearchResults');
  panel.style.display = 'block';
  aiChatActive = true;

  // Add the user's message to history and render it
  aiChatHistory.push({ role: 'user', content: question });
  document.getElementById('searchInput').value = '';
  showFakePlaceholder('searchFakePlaceholder', 'searchInput');
  renderChatPanel(true); // true = show typing indicator

  // Call the Supabase Edge Function
  let reply = '';
  try {
    const { data: { session } } = await db.auth.getSession();
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/ai-chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: aiChatHistory,
          system:   AI_SYSTEM_PROMPT,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || res.statusText);
    }

    const json = await res.json();
    reply = json.reply || json.content || '';
  } catch (err) {
    console.error('AI chat error:', err);
    // Check if the function simply isn't deployed yet
    if (err.message?.includes('Failed to fetch') || err.message?.includes('404') || err.message?.includes('Function not found')) {
      reply = `⚙️ **Almost there!** The AI tutor needs one small setup step — the Edge Function isn't deployed yet. Ask your developer to follow the instructions in \`/supabase/functions/ai-chat/index.ts\` (included in your repo) to get it live. Once deployed, this will answer any accounting question instantly.`;
    } else {
      reply = `Sorry, I ran into a problem answering that. Please try again in a moment.`;
    }
  }

  aiChatHistory.push({ role: 'assistant', content: reply });
  renderChatPanel(false);
}

function renderChatPanel(isLoading) {
  const panel = document.getElementById('homeSearchResults');

  const messagesHtml = aiChatHistory.map(msg => {
    if (msg.role === 'user') {
      return `<div class="ai-msg ai-msg-user">
        <div class="ai-msg-bubble ai-msg-bubble-user">${escapeHtml(msg.content)}</div>
      </div>`;
    } else {
      return `<div class="ai-msg ai-msg-assistant">
        <div class="ai-msg-avatar">✨</div>
        <div class="ai-msg-bubble ai-msg-bubble-assistant">${formatAIText(msg.content)}</div>
      </div>`;
    }
  }).join('');

  const typingHtml = isLoading ? `
    <div class="ai-msg ai-msg-assistant">
      <div class="ai-msg-avatar">✨</div>
      <div class="ai-msg-bubble ai-msg-bubble-assistant ai-typing">
        <span></span><span></span><span></span>
      </div>
    </div>` : '';

  panel.innerHTML = `
    <div class="ai-chat-header">
      <span style="font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);">✨ AI Tutor</span>
      <button onclick="clearAIChat()" style="background:none;border:none;color:var(--muted);font-size:0.78rem;font-weight:700;cursor:pointer;padding:0;">✕ New chat</button>
    </div>
    <div class="ai-chat-messages" id="aiMessages">
      ${messagesHtml}
      ${typingHtml}
    </div>
    <div class="ai-chat-composer">
      <input class="ai-composer-input" id="aiFollowUpInput" type="text"
        placeholder="Ask a follow-up…"
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendFollowUp();}"
        ${isLoading ? 'disabled' : ''} />
      <button class="ai-send-btn" onclick="sendFollowUp()" ${isLoading ? 'disabled' : ''}>›</button>
    </div>`;

  // Scroll to bottom of messages
  requestAnimationFrame(() => {
    const msgs = document.getElementById('aiMessages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
    if (!isLoading) {
      const inp = document.getElementById('aiFollowUpInput');
      if (inp) inp.focus();
    }
  });
}

function sendFollowUp() {
  const inp = document.getElementById('aiFollowUpInput');
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;
  inp.value = '';
  askAI(val);
}

function clearAIChat() {
  aiChatHistory = [];
  aiChatActive  = false;
  document.getElementById('homeSearchResults').style.display = 'none';
  document.getElementById('homeSearchResults').innerHTML = '';
  document.getElementById('homeDefaultContent').style.display = '';
  document.getElementById('searchInput').value = '';
  showFakePlaceholder('searchFakePlaceholder', 'searchInput');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Very light formatting: converts **bold** and newlines to HTML.
// Deliberately avoids a full markdown parser — keeps the bundle tiny
// and prevents any accidental XSS from AI output.
function formatAIText(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function clearHomeSearch() { clearAIChat(); }

// ── CLICK-TO-ASK (rotating search bar questions) ──────────────
// Clicking the question currently typed in the search bar shows its
// full answer, scenario, and a knowledge check — all sourced from
// searchQuestionAnswers, completely separate from trackData. None
// of this links or navigates into actual lesson content.
function onSearchQuestionClick() {
  const state = searchPlaceholderInstances['searchFakePlaceholder'];
  if (!state || !state.currentText) return;
  askSearchQuestion(state.currentText);
}

function askSearchQuestion(question) {
  if (currentUser) {
    db.from('search_log').insert({ user_id: currentUser.id, query: question });
  }
  document.getElementById('searchInput').value = question;
  hideFakePlaceholder('searchFakePlaceholder');
  document.getElementById('homeDefaultContent').style.display = 'none';
  const panel = document.getElementById('homeSearchResults');
  panel.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const entry = searchQuestionAnswers[question];
  if (!entry) {
    panel.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
        <h2 class="section-heading" style="font-size:1.1rem;margin:0;">"${question}"</h2>
        <button class="link-btn" onclick="clearHomeSearch()" style="background:none;border:none;color:var(--muted);font-size:0.78rem;font-weight:700;cursor:pointer;">✕ Clear</button>
      </div>
      <div class="sr-empty">That answer is on its way — check back soon.</div>`;
    return;
  }

  panel.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
      <h2 class="section-heading" style="font-size:1.1rem;margin:0;">${question}</h2>
      <button class="link-btn" onclick="clearHomeSearch()" style="background:none;border:none;color:var(--muted);font-size:0.78rem;font-weight:700;cursor:pointer;">✕ Clear</button>
    </div>
    <div class="lesson-widget" style="padding:24px;">
      <div class="nugget-def-card">
        <div class="nugget-def-label">Answer</div>
        <div class="nugget-def-text">${entry.answer}</div>
      </div>
      <div class="nugget-scenario-card">
        <div class="nugget-scenario-label">Scenario</div>
        <div class="nugget-scenario-text">${entry.scenario}</div>
      </div>
      <div class="track-divider"></div>
      <div class="track-quiz-section">
        <div class="track-quiz-header">
          <div class="track-quiz-eyebrow">Knowledge Check</div>
          <div class="track-quiz-title">Test Your Understanding</div>
        </div>
        <div class="track-q-block">
          <div class="track-q-text">${entry.quiz.q}</div>
          <div class="track-q-opts">
            ${entry.quiz.opts.map((o, oi) => `
              <button class="track-q-opt" onclick="answerSearchQuiz(this, ${oi}, ${entry.quiz.ans}, '${escStr(entry.quiz.exp)}')">
                ${o}
              </button>`).join('')}
          </div>
          <div class="track-q-feedback" id="searchQuizFeedback"></div>
        </div>
      </div>
    </div>`;
}

// Self-contained — no pip score, no lesson progress, just right/wrong feedback.
function answerSearchQuiz(btn, selectedIdx, correctIdx, explanation) {
  const block = btn.closest('.track-q-block');
  if (block.dataset.answered) return;
  block.dataset.answered = '1';

  const opts = block.querySelectorAll('.track-q-opt');
  opts.forEach((o, oi) => {
    o.classList.add('disabled');
    if (oi === correctIdx) o.classList.add('correct');
    else if (oi === selectedIdx) o.classList.add('wrong');
  });

  const isCorrect = selectedIdx === correctIdx;
  const fb = block.querySelector('.track-q-feedback');
  fb.innerHTML = isCorrect
    ? `<span class="fb-correct">✓ Correct!</span><span class="fb-exp">${explanation}</span>`
    : `<span class="fb-wrong">✗ Not quite.</span><span class="fb-exp">${explanation}</span>`;
  fb.classList.add('show', isCorrect ? 'cfb' : 'wfb');
}

// ── TOPIC LABEL HELPER ───────────────────────────────────────
// 'acc' returns empty for now since Accounting is the only topic —
// showing the badge on every single post is just noise. Once other
// topics exist, this automatically starts showing labels again.
function topicLabel(topic) {
  const map = { acc: '', fin: '💰 Finance', econ: '🌍 Economics', trd: '📈 Trading' };
  return map[topic] ?? topic;
}

// ── TIME AGO HELPER ──────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

// ── FLAVOUR WORD (static) ────────────────────────────────────
// Kept static per design decision — no cycling

// ── ARTICLES TICKER (homepage) ────────────────────────────────
function buildArticlesTicker() {
  const ticker = document.getElementById('trendingTicker');
  if (!ticker || !articles) return;
  ticker.style.width = '';
  ticker.innerHTML = articles.map((a, i) =>
    `<div class="trend-chip" onclick="openArticle('${a.slug}')" style="cursor:pointer;">
      <span class="trend-num">#${i + 1}</span>
      <span class="trend-text">${a.title}</span>
    </div>`
  ).join('');

  const wrap = document.getElementById('trendingTickerWrap');
  // Match the same breakpoint the CSS uses to turn on horizontal scrolling
  // (≤1024px = phones + tablets). The previous check also treated any
  // touch-capable screen as "scrollable," which caught wide touchscreen
  // laptops/desktops (>1024px) too — JS would size the row to overflow,
  // but the CSS at that width still has overflow:hidden with no scroll
  // enabled, so the last chip just sat there clipped in half with no way
  // to reach it. Using the same width check as the CSS keeps both in sync.
  const isScrollable = window.innerWidth <= 1024;

  if (wrap) wrap.scrollLeft = 0;

  if (isScrollable) {
    // Phones + tablets: every chip has flex-shrink:0 and the row uses
    // flex-wrap:nowrap, so the browser's own overflow/scrollWidth
    // calculation already covers the full #1–#10 range — no need to
    // calculate and set a pixel width by hand. (A previous version did
    // that by hand and any small error in the measurement capped the
    // scrollable range short of one end, which is what was cutting off
    // #1 and #10.) Just make sure we land on #1 at rest, and re-check
    // once more on the next frame in case layout shifts slightly after
    // the chips are inserted.
    requestAnimationFrame(() => { if (wrap) wrap.scrollLeft = 0; });
    return;
  }

  // Desktop: show only what fully fits, never cut a chip off mid-text.
  requestAnimationFrame(() => {
    const wrapWidth = ticker.parentElement.offsetWidth;
    const chips = ticker.querySelectorAll('.trend-chip');
    let used = 0;
    let stop = false;
    chips.forEach(chip => {
      const chipW = chip.offsetWidth + 10; // include the row gap
      if (stop || used + chipW > wrapWidth) {
        stop = true;
        chip.remove();
      } else {
        used += chipW;
      }
    });
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('homePage').classList.add('active');
  buildAvatarGrid();
  buildArticlesTicker();
  initDailyTip();
  // Small delay to ensure data.js searchQuestionBatches is available
  setTimeout(() => {
    if (typeof startSearchPlaceholderRotation === 'function') {
      startSearchPlaceholderRotation('searchFakePlaceholder', 'searchFakePlaceholderText', 'searchInput');
    }
  }, 300);
});

// Re-fit trending chips on resize/orientation change (debounced).
// Only rebuild when WIDTH actually changes — on mobile, the address bar
// showing/hiding as you scroll fires resize events for HEIGHT changes
// only, and rebuilding on those was wiping the ticker's scroll position
// mid-scroll, making chip #1 appear to "flash" then vanish.
let trendingResizeTimer = null;
let lastTrendingWidth = window.innerWidth;
window.addEventListener('resize', () => {
  clearTimeout(trendingResizeTimer);
  trendingResizeTimer = setTimeout(() => {
    if (window.innerWidth !== lastTrendingWidth) {
      lastTrendingWidth = window.innerWidth;
      buildArticlesTicker();
    }
  }, 200);
});

// Safety net: re-measure once everything (images, fonts) has fully
// loaded, in case anything shifted the layout after the initial
// DOMContentLoaded measurement.
window.addEventListener('load', buildArticlesTicker);

// Safety net: if the browser restores this page from back-forward cache
// (e.g. tapping the phone's back button after visiting a lesson) instead
// of doing a real reload, neither DOMContentLoaded nor load fire again —
// so without this, the ticker would stay wherever it was scrolled to
// before you navigated away.
window.addEventListener('pageshow', (e) => { if (e.persisted) buildArticlesTicker(); });
