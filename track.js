// ============================================================
// track.js — Track player: lesson navigation, sidebar,
// quiz handling, exam. All lessons unlocked.
// Depends on: data.js (trackData), app.js, auth.js
// ============================================================

let activeTrackKey      = null;
let trackStage          = 'lessons';
let trackCompletedLessons = [];
let trackCurrentLessonIdx = 0;
let trackQuizAnswers    = {};
let trackExamAnswers    = {};
let trackExamCompleted  = false;
let trackExamLastScore  = null;
let trackCourseStarted  = false;

// ── USER-TOGGLEABLE FEATURES ──────────────────────────────────
let keywordLinksEnabled      = false;
let nuggetVotesFeatureEnabled = false;

// Keyword targets for "What Is Accounting?" lesson
const trackKeywordTargets = {
  'identifying': 'Identifying',
  'measuring':   'Measuring',
  'recording':   'Recording',
  'classifying': 'Classifying',
  'summarising': 'Summarising',
  'presenting':  'Presenting',
  'interpreting':'Interpreting',
};

// ── LAUNCH TRACK ─────────────────────────────────────────────
async function launchTrack(key) {
  if (!trackData[key]) {
    alert("This track's full content is being added now — check back shortly!");
    return;
  }
  closeLessonOverlay();
  activeTrackKey        = key;
  trackCompletedLessons = [];
  trackCurrentLessonIdx = 0;
  trackQuizAnswers      = {};
  trackExamAnswers      = {};
  trackExamCompleted    = false;
  trackExamLastScore    = null;
  trackCourseStarted    = false;

  const track = trackData[key];
  document.getElementById('trackTitle').textContent = track.title;
  document.getElementById('trackSub').textContent   = `Beginner Track · ${track.lessons.length} Lessons`;
  document.getElementById('trackPip').textContent   =
    currentUser ? currentUser.pipScore.toFixed(5) : '1.00000';

  showPage('trackPage');

  // Restore progress from Supabase if logged in
  if (currentUser?.id && typeof loadTrackProgress === 'function') {
    trackCompletedLessons = await loadTrackProgress(key);
  }

  setTrackStage('lessons');
}

function closeTrack() {
  activeTrackKey = null;
  showPage('homePage');
}

// ── SIDEBAR COLLAPSE ─────────────────────────────────────────
let trackSidebarVisible = null;

function toggleTrackSidebar() {
  const app    = document.getElementById('trackApp');
  const btn    = document.getElementById('trackSbToggle');
  const mobile = window.matchMedia('(max-width:700px)').matches;

  if (mobile) {
    const isOpen = app.classList.contains('sidebar-open');
    app.classList.toggle('sidebar-open', !isOpen);
    btn.textContent = isOpen ? '☰' : '✕';
    return;
  }

  const isCollapsed = app.classList.contains('sidebar-collapsed');
  app.classList.toggle('sidebar-collapsed', !isCollapsed);
  trackSidebarVisible = isCollapsed;
  btn.textContent     = isCollapsed ? '‹' : '›';
}

// Tap the backdrop (the dimmed area behind the sidebar) to close it
function closeTrackSidebar() {
  const app = document.getElementById('trackApp');
  const btn = document.getElementById('trackSbToggle');
  if (!app.classList.contains('sidebar-open')) return;
  app.classList.remove('sidebar-open');
  if (btn) btn.textContent = '☰';
}

// ── SWIPE GESTURE (mobile) ───────────────────────────────────
// Swipe left anywhere on the open sidebar to close it.
(function initTrackSidebarSwipe() {
  let touchStartX = 0;
  let touchStartY = 0;
  let tracking = false;

  document.addEventListener('touchstart', (e) => {
    const app = document.getElementById('trackApp');
    if (!app || !app.classList.contains('sidebar-open')) return;
    const sidebar = document.getElementById('trackSidebar');
    if (!sidebar || !sidebar.contains(e.target)) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    // Swipe left: horizontal movement dominant, leftward, and far enough
    if (dx < -50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      closeTrackSidebar();
    }
  }, { passive: true });
})();

// ── STAGE TABS ───────────────────────────────────────────────
function setTrackStage(stage) {
  trackStage = stage;
  renderStageTabs();
  renderTrackSidebar();
  if (stage === 'lessons') {
    if (trackCourseStarted || trackCurrentLessonIdx > 0) {
      renderLessonContent(trackCurrentLessonIdx);
    } else {
      renderCourseStartGate();
    }
  } else if (stage === 'exam') {
    loadTrackExam();
  }
}

function renderStageTabs() {
  const el = document.getElementById('trackStageTabs');
  if (!el) return;
  el.innerHTML = ['lessons', 'exam'].map(s => `
    <button class="track-stage-tab ${trackStage === s ? 'active' : ''}"
      onclick="setTrackStage('${s}')">
      ${s === 'lessons' ? '📖 Lessons' : '📝 Exam'}
    </button>`).join('');
}

// ── SIDEBAR ──────────────────────────────────────────────────
function renderTrackSidebar() {
  const el    = document.getElementById('trackSbLessons');
  const track = trackData[activeTrackKey];
  if (!el || !track) return;

  // Progress bar
  const done = trackCompletedLessons.length;
  const total = track.lessons.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;
  const progText = document.getElementById('trackProgText');
  const progFill = document.getElementById('trackProgFill');
  if (progText) progText.textContent = `${done} / ${total}`;
  if (progFill)  progFill.style.width = pct + '%';

  // Pip score
  const pipEl = document.getElementById('trackPip');
  if (pipEl && currentUser) pipEl.textContent = currentUser.pipScore.toFixed(5);

  el.innerHTML = track.lessons.map((l, i) => {
    const active = i === trackCurrentLessonIdx && trackStage === 'lessons';
    const done   = trackCompletedLessons.includes(i);
    return `
      <div class="track-sb-lesson ${active ? 'active' : ''}"
           onclick="loadTrackLesson(${i})">
        <div class="track-sb-num ${done ? 'tsn-done' : active ? 'tsn-active' : ''}">
          ${done ? '✓' : i + 1}
        </div>
        <div class="track-sb-lesson-info">
          <div class="track-sb-lesson-name">${l.term}</div>
          <div class="track-sb-lesson-meta">
            ${l.duration} · <span class="track-sb-pip-badge">+${l.pips} pips</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── COURSE START GATE ────────────────────────────────────────
function renderCourseStartGate() {
  const track = trackData[activeTrackKey];
  document.getElementById('trackMainContent').innerHTML = `
    <div class="lesson-gate">
      <h1 class="track-lesson-title">Business Accounting Volume 1</h1>
      <p class="lesson-gate-sub">
        Begin your learning journey through double entry, trading &amp; profit and loss
        accounts, balance sheets and accounting concepts.
      </p>
      <button class="btn btn-gold" onclick="startCourse()"
        style="font-size:1rem;padding:14px 40px;">
        Start Lesson →
      </button>
    </div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startCourse() {
  trackCourseStarted = true;
  renderLessonContent(0);
}

// ── LOAD LESSON ──────────────────────────────────────────────
function loadTrackLesson(idx) {
  trackStage            = 'lessons';
  trackCurrentLessonIdx = idx;
  trackQuizAnswers      = {};
  renderTrackSidebar();
  renderLessonContent(idx);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // On mobile, tapping a lesson should close the sidebar so the
  // content is immediately visible, rather than overlapping it.
  if (window.matchMedia('(max-width:700px)').matches) {
    closeTrackSidebar();
  }
}

// ── RENDER LESSON CONTENT ────────────────────────────────────
function renderLessonContent(idx) {
  const track   = trackData[activeTrackKey];
  const l       = track.lessons[idx];
  const isLast  = idx === track.lessons.length - 1;
  const votes   = l.votes || { up: 0, down: 0 };

  document.getElementById('trackMainContent').innerHTML = `
    <div class="track-lesson-eyebrow">
      ${track.title} · Lesson ${idx + 1} of ${track.lessons.length}
    </div>
    <h1 class="track-lesson-title">${renderKeywordLinks(l.term, idx)}</h1>
    <div class="track-lesson-meta-row">
      <span class="track-meta-tag beginner">Beginner</span>
      <span class="track-meta-tag">⏱ ${l.duration}</span>
      <span class="track-meta-tag">⚡ +${l.pips} pips on completion</span>
    </div>

    <div class="nugget-def-card">
      <div class="nugget-def-label">Definition</div>
      <div class="nugget-def-text">${renderKeywordLinks(l.definition, idx)}</div>
      ${nuggetVotesFeatureEnabled ? `
        <div class="nugget-votes-toggle"
          onclick="toggleNuggetVotes(${idx})">
          <span id="nuggetVotesToggleLabel_${idx}">
            Show community votes on this definition ▾
          </span>
        </div>
        <div class="nugget-votes-panel" id="nuggetVotesPanel_${idx}" style="display:none;">
          <div class="nugget-votes-row">
            <button class="nugget-vote-btn up"
              onclick="voteOnDefinition(${idx},1)">
              👍 <span id="nuggetUp_${idx}">${votes.up}</span>
            </button>
            <button class="nugget-vote-btn down"
              onclick="voteOnDefinition(${idx},-1)">
              👎 <span id="nuggetDown_${idx}">${votes.down}</span>
            </button>
          </div>
        </div>` : ''}
      <button class="nugget-suggest-btn"
        onclick="openSuggestDefinition(${idx})">
        ✏️ Suggest your own definition
      </button>
    </div>

    <div class="nugget-scenario-card">
      <div class="nugget-scenario-label">Scenario</div>
      <div class="nugget-scenario-text">
        ${renderKeywordLinks(l.scenario, idx)}
      </div>
    </div>

    ${l.content ? `<div class="track-lesson-content">${l.content}</div>` : ''}

    <div class="track-divider"></div>
    <div class="track-quiz-section">
      <div class="track-quiz-header">
        <div class="track-quiz-eyebrow">Knowledge Check</div>
        <div class="track-quiz-title">Test Your Understanding</div>
        <div class="track-quiz-pip-info">
          Answer correctly to earn +${l.pips} pips
        </div>
      </div>
      ${renderQuizQuestions(l, idx)}
    </div>

    <div class="track-quiz-result" id="trackQuizResult"></div>

    <div class="track-lesson-nav">
      ${idx > 0
        ? `<button class="btn btn-ghost"
             onclick="loadTrackLesson(${idx - 1})">← Previous</button>`
        : '<div></div>'}
      ${!isLast
        ? `<button class="btn btn-gold"
             onclick="loadTrackLesson(${idx + 1})">Next Lesson →</button>`
        : `<button class="btn btn-gold"
             onclick="setTrackStage('exam')">Take the Exam →</button>`}
    </div>`;

  renderTrackSidebar();
}

function renderQuizQuestions(l, idx) {
  if (!l.quiz) return '';
  const q = l.quiz;
  const opts = q.opts || q.options || [];
  return `
    <div class="track-q-block" id="trackQ_${idx}_0">
      <div class="track-q-text">${q.q || q.question}</div>
      <div class="track-q-opts">
        ${opts.map((o, oi) => `
          <button class="track-q-opt"
            onclick="answerTrackQ(0, ${oi}, ${q.ans !== undefined ? q.ans : q.correct}, '${escStr(q.exp || q.explanation || '')}', ${idx})">
            ${o}
          </button>`).join('')}
      </div>
      <div class="track-q-feedback" id="trackFb_${idx}_0"></div>
    </div>`;
}

function escStr(s) {
  return s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ── ANSWER QUIZ QUESTION ─────────────────────────────────────
function answerTrackQ(qi, oi, correct, explanation, lessonIdx) {
  if (trackQuizAnswers[qi] !== undefined) return;
  trackQuizAnswers[qi] = oi;

  const block = document.getElementById(`trackQ_${lessonIdx}_${qi}`);
  if (!block) return;

  const opts = block.querySelectorAll('.track-q-opt');
  opts.forEach((o, i) => {
    o.disabled = true;
    if (i === correct) o.classList.add('correct');
    else if (i === oi)  o.classList.add('wrong');
  });

  const fb = document.getElementById(`trackFb_${lessonIdx}_${qi}`);
  const isCorrect = oi === correct;

  if (fb) {
    fb.innerHTML = isCorrect
      ? `<span class="fb-correct">✓ Correct!</span>
         <span class="fb-exp">${explanation}</span>`
      : `<span class="fb-wrong">✗ Not quite.</span>
         <span class="fb-exp">${explanation}</span>`;
    fb.classList.add('show');
  }

  if (isCorrect) {
    const track = trackData[activeTrackKey];
    const l     = track.lessons[lessonIdx];
    const pips  = (l.pips || 1) * 0.00010;

    // Save pip to Supabase
    if (typeof awardPips === 'function') {
      awardPips(pips, 'quiz_correct');
    }

    // Mark lesson complete
    if (!trackCompletedLessons.includes(lessonIdx)) {
      trackCompletedLessons.push(lessonIdx);
      if (currentUser?.id && typeof saveTrackProgress === 'function') {
        saveTrackProgress(activeTrackKey, lessonIdx);
      }
    }

    // Flash pip in sidebar
    const pipEl = document.getElementById('trackPip');
    if (pipEl) {
      pipEl.classList.add('pip-flash');
      setTimeout(() => pipEl.classList.remove('pip-flash'), 600);
    }

    showTrackQuizResult(lessonIdx);
  }
}

function showTrackQuizResult(lessonIdx) {
  const track = trackData[activeTrackKey];
  const total  = Object.keys(trackQuizAnswers).length;
  const result = document.getElementById('trackQuizResult');
  if (!result) return;
  result.innerHTML = `
    <div class="track-qr-icon">⚡</div>
    <div class="track-qr-label">Pip Earned</div>
    <div style="font-size:2.5rem;font-weight:900;color:var(--green);
      font-variant-numeric:tabular-nums;margin-bottom:4px">
      ${currentUser ? currentUser.pipScore.toFixed(5) : '1.00000'}
    </div>
    <div class="track-qr-sub">Keep answering correctly to move your pip upward.</div>`;
  result.classList.add('show');
}

// ── KEYWORD LINKS ─────────────────────────────────────────────
function renderKeywordLinks(text, currentIdx) {
  if (!keywordLinksEnabled || !text) return text;
  let out = text;
  Object.entries(trackKeywordTargets).forEach(([word, targetTerm]) => {
    const track    = trackData[activeTrackKey];
    const targetIdx = track.lessons.findIndex(l => l.term === targetTerm);
    if (targetIdx === -1 || targetIdx === currentIdx) return;
    const re = new RegExp(`\\b(${word})\\b`, 'gi');
    out = out.replace(re,
      `<span class="track-keyword-link"
         onclick="event.stopPropagation();loadTrackLesson(${targetIdx})">$1</span>`);
  });
  return out;
}

// ── NUGGET VOTES ─────────────────────────────────────────────
function toggleNuggetVotes(idx) {
  const panel = document.getElementById(`nuggetVotesPanel_${idx}`);
  const label = document.getElementById(`nuggetVotesToggleLabel_${idx}`);
  if (!panel) return;
  const open = panel.style.display !== 'none';
  panel.style.display = open ? 'none' : 'block';
  if (label) label.textContent = open
    ? 'Show community votes on this definition ▾'
    : 'Hide community votes ▴';
}

function voteOnDefinition(idx, direction) {
  const l = trackData[activeTrackKey]?.lessons[idx];
  if (!l) return;
  if (!l.votes) l.votes = { up: 0, down: 0 };
  if (direction === 1)  l.votes.up++;
  else l.votes.down--;
  const upEl   = document.getElementById(`nuggetUp_${idx}`);
  const downEl = document.getElementById(`nuggetDown_${idx}`);
  if (upEl)   upEl.textContent   = l.votes.up;
  if (downEl) downEl.textContent = l.votes.down;
}

// ── SUGGEST DEFINITION ───────────────────────────────────────
function openSuggestDefinition(idx) {
  const l = trackData[activeTrackKey]?.lessons[idx];
  if (!l) return;
  document.getElementById('trackMainContent').insertAdjacentHTML('beforeend', `
    <div class="suggest-def-overlay" id="suggestDefOverlay"
      onclick="if(event.target===this)closeSuggestDef()">
      <div class="suggest-def-modal">
        <button class="modal-close-btn" onclick="closeSuggestDef()">✕</button>
        <h3 style="color:var(--white);margin-bottom:8px;">
          Suggest a definition for: <em>${l.term}</em>
        </h3>
        <p style="font-size:0.75rem;color:var(--muted);margin-bottom:12px;">
          Your suggestion will be reviewed by the Butterfly Dynamix Learning team.
        </p>
        <textarea id="suggestDefText" rows="5"
          style="width:100%;background:var(--surface2);border:1px solid var(--border2);
            border-radius:6px;padding:12px;font-size:0.85rem;color:var(--white);
            font-family:inherit;resize:vertical;box-sizing:border-box;"
          placeholder="Write your definition here..."></textarea>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn btn-gold" style="flex:1"
            onclick="submitSuggestedDefinition(${idx})">
            Submit →
          </button>
          <button class="btn btn-ghost" onclick="closeSuggestDef()">
            Cancel
          </button>
        </div>
      </div>
    </div>`);
}

function closeSuggestDef() {
  document.getElementById('suggestDefOverlay')?.remove();
}

// ── FEATURE SETTINGS ─────────────────────────────────────────
function openFeatureSettings() {
  document.getElementById('trackMainContent').insertAdjacentHTML('beforeend', `
    <div class="suggest-def-overlay" id="featureSettingsOverlay"
      onclick="if(event.target===this)this.remove()">
      <div class="suggest-def-modal">
        <button class="modal-close-btn" onclick="document.getElementById('featureSettingsOverlay').remove()">✕</button>
        <h3 style="color:var(--white);margin-bottom:16px;">Lesson Display Settings</h3>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <div>
            <div style="font-size:0.82rem;font-weight:700;color:var(--white);">Keyword Links</div>
            <div style="font-size:0.72rem;color:var(--muted);">Highlight related terms in lessons</div>
          </div>
          <label class="feature-switch">
            <input type="checkbox" ${keywordLinksEnabled ? 'checked' : ''}
              onchange="setKeywordLinksEnabled(this.checked)">
            <span class="feature-slider"></span>
          </label>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-size:0.82rem;font-weight:700;color:var(--white);">Community Votes</div>
            <div style="font-size:0.72rem;color:var(--muted);">Show votes on definitions</div>
          </div>
          <label class="feature-switch">
            <input type="checkbox" ${nuggetVotesFeatureEnabled ? 'checked' : ''}
              onchange="setVotesFeatureEnabled(this.checked)">
            <span class="feature-slider"></span>
          </label>
        </div>
      </div>
    </div>`);
}

function setKeywordLinksEnabled(on) {
  keywordLinksEnabled = on;
  renderLessonContent(trackCurrentLessonIdx);
}

function setVotesFeatureEnabled(on) {
  nuggetVotesFeatureEnabled = on;
  renderLessonContent(trackCurrentLessonIdx);
}

// ── EXAM ─────────────────────────────────────────────────────
function loadTrackExam() {
  const track = trackData[activeTrackKey];
  if (!track.exam) {
    document.getElementById('trackMainContent').innerHTML = `
      <div class="lesson-gate">
        <div style="font-size:2rem;">📝</div>
        <h2 class="track-lesson-title" style="margin-top:12px;">Exam Coming Soon</h2>
        <p class="lesson-gate-sub">
          Complete all lessons first — the exam will be available shortly.
        </p>
        <button class="btn btn-gold" onclick="setTrackStage('lessons')">
          Back to Lessons
        </button>
      </div>`;
    return;
  }

  trackExamAnswers   = {};
  trackExamCompleted = false;
  renderStageTabs();

  const exam = track.exam;
  document.getElementById('trackMainContent').innerHTML = `
    <div class="track-lesson-eyebrow">${track.title} · Exam</div>
    <h1 class="track-lesson-title">${exam.title || 'Beginner Exam'}</h1>
    <p style="font-size:0.82rem;color:var(--muted);margin-bottom:24px;">
      ${exam.questions.length} questions ·
      Pass mark: ${exam.passMark || 70}% ·
      ⚡ Up to ${exam.pips} pips
    </p>
    <div id="examQuestions">
      ${exam.questions.map((q, qi) => `
        <div class="track-q-block" id="examQ_${qi}" style="margin-bottom:24px;">
          <div class="track-q-text">
            <strong>Q${qi + 1}.</strong> ${q.q}
          </div>
          <div class="track-q-opts">
            ${q.opts.map((o, oi) => `
              <button class="track-q-opt"
                onclick="answerExamQ(${qi}, ${oi})">
                ${o}
              </button>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <button class="btn btn-gold" style="margin-top:8px;width:100%"
      onclick="submitTrackExam()">
      Submit Exam →
    </button>`;
}

function answerExamQ(qi, oi) {
  if (trackExamCompleted) return;
  trackExamAnswers[qi] = oi;
  const block = document.getElementById(`examQ_${qi}`);
  if (!block) return;
  block.querySelectorAll('.track-q-opt').forEach((o, i) => {
    o.classList.toggle('selected', i === oi);
  });
}

function submitTrackExam() {
  const track  = trackData[activeTrackKey];
  const exam   = track.exam;
  const total  = exam.questions.length;
  const answered = Object.keys(trackExamAnswers).length;

  if (answered < total) {
    alert(`Please answer all ${total} questions before submitting.`);
    return;
  }

  trackExamCompleted = true;
  let correct = 0;

  exam.questions.forEach((q, qi) => {
    const block = document.getElementById(`examQ_${qi}`);
    if (!block) return;
    const userAns = trackExamAnswers[qi];
    const isRight = userAns === q.ans;
    if (isRight) correct++;
    block.querySelectorAll('.track-q-opt').forEach((o, i) => {
      o.disabled = true;
      if (i === q.ans)      o.classList.add('correct');
      else if (i === userAns) o.classList.add('wrong');
    });
  });

  const score     = Math.round((correct / total) * 100);
  const passed    = score >= (exam.passMark || 70);
  trackExamLastScore = score;

  if (passed && typeof awardPips === 'function') {
    awardPips(exam.pips * 0.00010 * correct, 'exam_pass');
  }

  showExamResult(score, correct, total, passed, exam);
}

function showExamResult(score, correct, total, passed, exam) {
  const el = document.getElementById('trackMainContent');
  el.insertAdjacentHTML('beforeend', `
    <div class="track-complete-screen show" style="margin-top:32px;">
      <div style="font-size:2.4rem;">${passed ? '🏆' : '📚'}</div>
      <h2 style="font-size:1.4rem;font-weight:800;color:${passed ? 'var(--green)' : 'var(--white)'};margin:12px 0 4px;">
        ${passed ? 'Exam Passed!' : 'Not quite — keep studying'}
      </h2>
      <div style="font-size:2.8rem;font-weight:900;color:${passed ? 'var(--green)' : 'var(--gold)'};margin:8px 0;">
        ${score}%
      </div>
      <p style="font-size:0.82rem;color:var(--muted);margin-bottom:20px;">
        ${correct} of ${total} correct · Pass mark: ${exam.passMark || 70}%
      </p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-gold"
          onclick="setTrackStage('lessons')">
          Review Lessons →
        </button>
        ${!passed ? `
          <button class="btn btn-outline"
            onclick="loadTrackExam()">
            Retry Exam
          </button>` : ''}
      </div>
    </div>`);
  el.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
