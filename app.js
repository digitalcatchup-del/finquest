// ============================================================
// app.js — Core application logic
// Butterfly Dynamix Learning Platform
// Depends on: supabase-config.js, auth.js, data.js
// ============================================================

// ── FLUTTERWAVE CONFIG ───────────────────────────────────────
// TEST MODE — switch to live public key once Flutterwave business
// verification (RC/BN number) is complete.
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK_TEST-d7a81c18068d8b0323e75325c070f81b-X';

const PLANS = {
  Professional: { amount: 500000, label: '$5/month', currency: 'USD' },  // in kobo (NGN) or cents
  Annual:       { amount: 4800000, label: '$48/year', currency: 'USD' },
};

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
  renderLoggedInHero();
}

function renderLoggedInHero() {
  if (!currentUser) return;
  document.getElementById('heroSection').style.display = 'none';
  document.getElementById('liHero').style.display = 'block';
  document.getElementById('liName').textContent = currentUser.firstName || currentUser.username;
  document.getElementById('liStreak').textContent = currentUser.streak;
  document.getElementById('liLessons').textContent = currentUser.totalLessons;
  document.getElementById('liCorrect').textContent = currentUser.totalCorrect;
  document.getElementById('dashPip').textContent = currentUser.pipScore.toFixed(5);

  const pct = Math.min(((currentUser.pipScore - 1) / 0.01) * 100, 100);
  document.getElementById('pipBarFill').style.width = pct + '%';

  renderLiTracks();
}

function renderLiTracks() {
  const el = document.getElementById('liTracks');
  if (!el) return;
  el.innerHTML = `
    <div class="li-track-card" onclick="openAccounting()" style="cursor:pointer;">
      <span>📘</span>
      <div>
        <div style="font-size:0.78rem;font-weight:700;color:var(--white);">Business Accounting Vol 1</div>
        <div style="font-size:0.68rem;color:var(--muted);">Continue learning →</div>
      </div>
    </div>`;
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
  document.getElementById('modalQuiz').innerHTML = `
    <div class="modal-quiz-q">${q.question}</div>
    <div class="modal-quiz-opts">
      ${q.options.map((o, i) => `
        <button class="modal-quiz-opt" onclick="answerNugget(${i},${q.correct},this)">
          ${o}
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
    fb.classList.add('show', 'correct');
    pr.innerHTML = '⚡ +0.00010 pips awarded';
    pr.classList.add('show');
    if (currentUser) awardPips(0.00010, 'quiz_correct');
  } else {
    fb.textContent = '✗ Not quite — review the definition above.';
    fb.classList.add('show', 'wrong');
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

// ── COMMUNITY ────────────────────────────────────────────────
let forumTopicFilter = 'all';
let currentForumPosts = [];
let currentThreadPost = null;

function openCommunity() {
  showPage('communityPage');
  loadAndRenderForum();
}

function closeCommunity() {
  showPage('homePage');
}

async function loadAndRenderForum() {
  const feed = document.getElementById('forumFeed');
  if (!feed) return;
  feed.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;padding:20px 0;">Loading discussions…</p>';

  try {
    // Step 1: Get posts
    let query = db
      .from('posts')
      .select('id, user_id, topic, title, body, upvotes, downvotes, reply_count, is_opinion, created_at')
      .eq('is_opinion', false)
      .order('created_at', { ascending: false })
      .limit(20);

    if (forumTopicFilter !== 'all') query = query.eq('topic', forumTopicFilter);
    const { data: posts, error } = await query;

    if (error) {
      feed.innerHTML = `<p style="color:var(--muted);font-size:0.82rem;">Error: ${error.message}</p>`;
      return;
    }

    if (!posts || posts.length === 0) {
      feed.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;padding:20px 0;">No posts yet — be the first to share your take.</p>';
      return;
    }

    // Step 2: Get profiles for those user_ids separately
    const userIds = [...new Set(posts.map(p => p.user_id))];
    const { data: profilesData } = await db
      .from('profiles')
      .select('id, username, avatar')
      .in('id', userIds);

    // Step 3: Merge profiles into posts
    const profileMap = {};
    (profilesData || []).forEach(p => { profileMap[p.id] = p; });
    const enriched = posts.map(p => ({
      ...p,
      profiles: profileMap[p.user_id] || { username: 'anonymous', avatar: '😎' }
    }));

    currentForumPosts = enriched;
    renderForumFeed(enriched);

  } catch (err) {
    feed.innerHTML = `<p style="color:var(--muted);font-size:0.82rem;">Error: ${err.message}</p>`;
  }
}

function renderForumFeed(posts) {
  const feed = document.getElementById('forumFeed');
  if (!posts.length) {
    feed.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;padding:20px 0;">No posts yet — be the first to share your take.</p>';
    return;
  }
  feed.innerHTML = posts.map(p => renderForumPost(p)).join('');
}

function renderForumPost(p) {
  const ago     = timeAgo(p.created_at);
  const avatar  = p.profiles?.avatar || '😎';
  const uname   = p.profiles?.username || 'anonymous';
  const ups     = p.upvotes || 0;
  const replies = p.reply_count || 0;
  return `
    <div class="forum-post-card" onclick="openForumThread('${p.id}')">
      <div class="forum-post-avatar">${avatar}</div>
      <div class="forum-post-body">
        <div class="forum-post-meta">
          <span class="forum-post-name" onclick="event.stopPropagation();openProfileByUsername('${uname}','communityPage')" style="cursor:pointer;">@${uname}</span>
          <span class="forum-post-dot">·</span>
          <span class="forum-post-time">${ago}</span>
          <span class="forum-post-dot">·</span>
          <span class="op-topic tt-${p.topic}">${topicLabel(p.topic)}</span>
        </div>
        ${p.title ? `<div class="forum-post-text" style="font-weight:700;color:var(--white);margin-bottom:4px;">${p.title}</div>` : ''}
        <div class="forum-post-text">${p.body}</div>
        <div class="forum-post-actions">
          <button class="forum-action-btn"
            onclick="event.stopPropagation();handlePostVote('${p.id}',1)">
            ▲ ${ups}
          </button>
          <button class="forum-action-btn"
            onclick="event.stopPropagation();openForumThread('${p.id}')">
            💬 ${replies} ${replies === 1 ? 'reply' : 'replies'}
          </button>
        </div>
      </div>
    </div>`;
}

async function handlePostVote(postId, direction) {
  await votePost(postId, direction);
  loadAndRenderForum();
}

function filterForumPosts(topic, btn) {
  forumTopicFilter = topic;
  document.querySelectorAll('.op-filter .pf').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  loadAndRenderForum();
}

// ── FORUM COMPOSER ───────────────────────────────────────────
let composerTopic = 'acc';

function updateForumCharCount() {
  const ta  = document.getElementById('forumComposerText');
  const el  = document.getElementById('forumCharCount');
  if (el) el.textContent = (280 - ta.value.length) + ' characters left';
}

function onComposerFocus() {
  if (!currentUser) openAuth('signup');
}

function onComposerOverlayClick() {
  if (!currentUser) { openAuth('signup'); return; }
  document.getElementById('forumComposerText').focus();
  document.getElementById('forumComposerClickLayer').style.display = 'none';
}

function syncComposerOverlay() {
  if (!currentUser) {
    document.getElementById('forumComposerClickLayer').style.display = 'block';
  }
}

async function submitForumPost() {
  if (!currentUser) { openAuth('signup'); return; }
  const ta   = document.getElementById('forumComposerText');
  const body = ta.value.trim();
  if (!body) return;
  const post = await createPost(composerTopic, body);
  if (post) {
    ta.value = '';
    updateForumCharCount();
    loadAndRenderForum();
  }
}

// ── FORUM THREAD ─────────────────────────────────────────────
async function openForumThread(postId) {
  // First try to find in cached posts
  let post = currentForumPosts.find(p => p.id === postId);

  // If not found, fetch from DB
  if (!post) {
    const { data } = await db
      .from('posts')
      .select('*, profiles(username, avatar)')
      .eq('id', postId)
      .single();
    post = data;
  }

  if (!post) return;
  currentThreadPost = post;
  document.getElementById('forumThreadPost').innerHTML = renderForumPost(post);
  showPage('forumThreadPage');
  loadAndRenderReplies(postId);
}

function closeForumThread() {
  showPage('communityPage');
}

async function loadAndRenderReplies(postId) {
  const el = document.getElementById('forumThreadReplies');
  if (!el) return;
  el.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;">Loading replies…</p>';

  // Fetch replies
  const { data: replies } = await db
    .from('replies')
    .select('id, user_id, body, upvotes, created_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (!replies || !replies.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;">No replies yet — share your take.</p>';
    return;
  }

  // Fetch profiles for reply authors
  const userIds = [...new Set(replies.map(r => r.user_id))];
  const { data: profilesData } = await db
    .from('profiles').select('id, username, avatar').in('id', userIds);
  const profileMap = {};
  (profilesData || []).forEach(p => { profileMap[p.id] = p; });

  el.innerHTML = replies.map(r => {
    const profile = profileMap[r.user_id] || { username: 'anonymous', avatar: '😎' };
    return `
      <div class="forum-post-card" style="cursor:default;">
        <div class="forum-post-avatar forum-reply-avatar">${profile.avatar}</div>
        <div class="forum-post-body">
          <div class="forum-post-meta">
          <span class="forum-post-name" onclick="event.stopPropagation();openProfileByUsername('${profile.username}','communityPage')" style="cursor:pointer;">@${profile.username}</span>
            <span class="forum-post-dot">·</span>
            <span class="forum-post-time">${timeAgo(r.created_at)}</span>
          </div>
          <div class="forum-post-text">${r.body}</div>
        </div>
      </div>`;
  }).join('');
}

function updateForumReplyCharCount() {
  const ta = document.getElementById('forumReplyText');
  const el = document.getElementById('forumReplyCharCount');
  if (el) el.textContent = (280 - ta.value.length) + ' characters left';
}

async function submitForumReply() {
  if (!currentUser) { openAuth('signup'); return; }
  if (!currentThreadPost) return;
  const ta   = document.getElementById('forumReplyText');
  const body = ta.value.trim();
  if (!body) return;
  await createReply(currentThreadPost.id, body);
  ta.value = '';
  updateForumReplyCharCount();
  loadAndRenderReplies(currentThreadPost.id);
}

// ── OPINIONS (home page) ─────────────────────────────────────
let opinionsFilter = 'all';

async function renderOpinions() {
  const grid = document.getElementById('opinionsGrid');
  if (!grid) return;
  let query = db.from('posts')
    .select('*, profiles(username, avatar)')
    .eq('is_opinion', true)
    .order('upvotes', { ascending: false })
    .limit(6);
  if (opinionsFilter !== 'all') query = query.eq('topic', opinionsFilter);
  const { data: ops } = await query;

  if (!ops || !ops.length) {
    renderStaticOpinions();
    return;
  }
  grid.innerHTML = ops.map((op, i) => `
    <div class="opinion-card ${i === 0 ? 'rank-1' : ''}" data-opinion-id="${op.id}"
         onclick="openCommunity()">
      <div class="op-rank">
        <span class="op-rank-num">#${i + 1}</span>
      </div>
      <div class="op-body">
        <div class="op-meta">
          <span class="op-avatar">${op.profiles?.avatar || '😎'}</span>
          <span class="op-username">@${op.profiles?.username || 'anonymous'}</span>
          <span class="op-topic tt-${op.topic}">${topicLabel(op.topic)}</span>
        </div>
        <div class="op-text">"${op.body}"</div>
      </div>
      <div class="op-votes">
        <button class="op-vote-btn up"
          onclick="event.stopPropagation();votePost('${op.id}',1);renderOpinions()">
          ▲
        </button>
        <span class="op-vote-count">${op.upvotes || 0}</span>
      </div>
    </div>`).join('');
}

function filterOpinions(topic, btn) {
  opinionsFilter = topic;
  document.querySelectorAll('.op-filter .pf').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderOpinions();
}

// ── POST OPINION OVERLAY ─────────────────────────────────────
let selectedOpinionTopic = '';

function openPostOpinion() {
  if (!currentUser) { openAuth('signup'); return; }
  document.getElementById('postOpinionOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePostOpinion() {
  document.getElementById('postOpinionOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function selectOpinionTopic(topic, el) {
  selectedOpinionTopic = topic;
  document.querySelectorAll('.poi-topic').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('eOpTopic').classList.remove('show');
}

async function submitOpinion() {
  let valid = true;
  if (!selectedOpinionTopic) { document.getElementById('eOpTopic').classList.add('show'); valid = false; }
  const title = document.getElementById('opTitle').value.trim();
  const body  = document.getElementById('opBody').value.trim();
  if (!title) { document.getElementById('eOpTitle').classList.add('show'); valid = false; }
  else document.getElementById('eOpTitle').classList.remove('show');
  if (!body)  { document.getElementById('eOpBody').classList.add('show'); valid = false; }
  else document.getElementById('eOpBody').classList.remove('show');
  if (!valid) return;

  const post = await createPost(selectedOpinionTopic, body, title, true);
  if (post) {
    closePostOpinion();
    renderOpinions();
    // Reset form
    document.getElementById('opTitle').value = '';
    document.getElementById('opBody').value  = '';
    document.getElementById('charCount').textContent = '0';
    selectedOpinionTopic = '';
    document.querySelectorAll('.poi-topic').forEach(t => t.classList.remove('selected'));
  }
}

// ── USER PROFILE PAGE ────────────────────────────────────────
let profileTab          = 'posts';
let viewingProfileData  = null;
let viewingIsOwnProfile = false;
let profileReturnPage   = 'communityPage';

async function openProfileByUsername(username, returnPage) {
  profileReturnPage = returnPage || 'communityPage';
  showPage('profilePage');
  document.getElementById('profileHeader').innerHTML =
    '<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:40px 0;">Loading profile…</p>';

  const data = await loadUserProfile(username);
  if (!data) {
    document.getElementById('profileHeader').innerHTML =
      '<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:40px 0;">Profile not found.</p>';
    return;
  }

  viewingProfileData  = data;
  viewingIsOwnProfile = currentUser?.username === data.profile.username;
  profileTab = 'posts';
  renderProfileHeader(data.profile);
  setProfileTab('posts');
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

async function setProfileTab(tab) {
  profileTab = tab;
  document.getElementById('profileTabPosts').classList.toggle('active', tab === 'posts');
  document.getElementById('profileTabReplies').classList.toggle('active', tab === 'replies');

  const el = document.getElementById('profileFeed');
  el.innerHTML = '<p class="profile-empty">Loading…</p>';

  if (tab === 'posts') {
    const posts = viewingProfileData?.posts || [];
    renderProfileFeed(posts);
  } else {
    const replies = await loadUserReplies(viewingProfileData.profile.id);
    renderProfileReplies(replies);
  }
}

function renderProfileFeed(posts) {
  const el = document.getElementById('profileFeed');
  if (!posts.length) {
    el.innerHTML = '<p class="profile-empty">No posts yet.</p>';
    return;
  }
  el.innerHTML = posts.map(p => renderForumPost({
    ...p,
    profiles: viewingProfileData.profile
  })).join('');
}

function renderProfileReplies(replies) {
  const el = document.getElementById('profileFeed');
  if (!replies.length) {
    el.innerHTML = '<p class="profile-empty">No replies yet.</p>';
    return;
  }
  el.innerHTML = replies.map(r => `
    <div class="forum-post-card" onclick="openForumThread('${r.post_id}')">
      <div class="forum-post-avatar">${viewingProfileData.profile.avatar}</div>
      <div class="forum-post-body">
        <div class="forum-post-meta">
          <span class="forum-post-name">@${viewingProfileData.profile.username}</span>
          <span class="forum-post-dot">·</span>
          <span class="forum-post-time">${timeAgo(r.created_at)}</span>
        </div>
        <div class="forum-post-text">${r.body}</div>
      </div>
    </div>`).join('');
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
function openPayment(planName, priceLabel, amount) {
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

  const plan     = window._payPlan || { name: 'Professional', amount: 5 };
  const NGN_RATE = 1600; // approximate USD→NGN rate — update before live launch
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

// ── SEARCH ───────────────────────────────────────────────────
function onSearch(val) {
  const box = document.getElementById('searchSuggestions');
  if (!val.trim() || !searchIndex) { box.classList.remove('open'); return; }
  const q   = val.toLowerCase();
  const hits = searchIndex.filter(s => s.toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) { box.classList.remove('open'); return; }
  box.innerHTML = hits.map(h =>
    `<div class="search-suggestion" onclick="selectSuggestion('${h}')">${h}</div>`
  ).join('');
  box.classList.add('open');
}

function onSearchKey(e) {
  if (e.key === 'Enter') doSearch();
  if (e.key === 'Escape') document.getElementById('searchSuggestions').classList.remove('open');
}

function selectSuggestion(text) {
  document.getElementById('searchInput').value = text;
  document.getElementById('searchSuggestions').classList.remove('open');
  doSearch();
}

function doSearch() {
  const val = document.getElementById('searchInput').value.trim();
  document.getElementById('searchSuggestions').classList.remove('open');
  if (!val) return;
  // Log search
  if (currentUser) {
    db.from('search_log').insert({ user_id: currentUser.id, query: val });
  }
  openAccounting();
}

function scrollToOpinion(opinionId) {
  document.getElementById('opinionsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── TOPIC LABEL HELPER ───────────────────────────────────────
function topicLabel(topic) {
  const map = { acc: '📊 Accounting', fin: '💰 Finance', econ: '🌍 Economics', trd: '📈 Trading' };
  return map[topic] || topic;
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

// ── TRENDING ─────────────────────────────────────────────────
function buildTrending() {
  const ticker = document.getElementById('trendingTicker');
  if (!ticker || !trendingItems) return;
  ticker.innerHTML = trendingItems.map(t =>
    `<div class="trend-chip" onclick="scrollToOpinion(${t.opinionId})" style="cursor:pointer;">
      <span class="trend-num">${t.num}</span>
      <span class="trend-text">${t.text}</span>
      <span class="trend-tag ${t.cls}">${t.tag}</span>
    </div>`
  ).join('');
  requestAnimationFrame(() => {
    const wrapWidth = ticker.parentElement.offsetWidth;
    const chips = ticker.querySelectorAll('.trend-chip');
    let used = 0;
    chips.forEach(chip => {
      const chipW = chip.offsetWidth + 10;
      if (used + chipW > wrapWidth) chip.remove();
      else used += chipW;
    });
  });
}

// ── STATIC OPINIONS FALLBACK ─────────────────────────────────
function renderStaticOpinions() {
  const grid = document.getElementById('opinionsGrid');
  if (!grid || !staticOpinions) return;
  const ops = opinionsFilter === 'all'
    ? staticOpinions
    : staticOpinions.filter(o => o.topic === opinionsFilter);
  grid.innerHTML = ops.slice(0, 6).map((op, i) => `
    <div class="opinion-card ${i === 0 ? 'rank-1' : ''} rc-${op.topic}"
         data-opinion-id="${op.id}" onclick="openCommunity()">
      <div class="op-rank">
        <span class="op-rank-num">#${i + 1}</span>
      </div>
      <div class="op-body">
        <div class="op-meta">
          <span class="op-avatar">${op.avatar}</span>
          <span class="op-username">@${op.username}</span>
          <span class="op-topic tt-${op.topic}">${topicLabel(op.topic)}</span>
        </div>
        <div class="op-text">"${op.body}"</div>
      </div>
      <div class="op-votes">
        <button class="op-vote-btn up"
          onclick="event.stopPropagation();openAuth('signup')">▲</button>
        <span class="op-vote-count">${op.upvotes}</span>
      </div>
    </div>`).join('');
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('homePage').classList.add('active');
  buildAvatarGrid();
  buildTrending();
  renderOpinions();
  initDailyTip();
  // Small delay to ensure data.js searchQuestionBatches is available
  setTimeout(() => {
    if (typeof startSearchPlaceholderRotation === 'function') {
      startSearchPlaceholderRotation();
    }
  }, 300);
});
