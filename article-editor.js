// ============================================================
// article-editor.js — FULL-PAGE block editor (v3)
// Drives #editorPage. Self-contained: injects its own CSS,
// removes the stray light stylesheet + duplicate overlays.
// Uses the site's Supabase client `db`.
// ============================================================
let currentEditingArticle = null;
let currentBlocks = [];
let affiliateAssets = [];
let pendingCoverUrl = null;
let coverRemoved = false;

// ── RUNTIME SELF-HEAL + CSS INJECTION ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 1) Remove the stray LIGHT stylesheet that overrides the dark theme
  document.querySelectorAll('link[href*="styles.css"]').forEach(l => l.remove());
  // 2) Remove duplicate legacy overlays that steal the editor's element IDs
  document.querySelectorAll('#articleEditorOverlay').forEach(el => el.remove());
  // 3) Inject editor styles
  if (!document.getElementById('aeCss')) {
    const s = document.createElement('style');
    s.id = 'aeCss';
    s.textContent = `
#editorPage.active{display:flex;flex-direction:column;min-height:calc(100vh - 57px);}
.editor-topbar{display:flex;align-items:center;gap:12px;padding:12px 24px;border-bottom:1px solid var(--border);background:var(--surface);position:sticky;top:57px;z-index:120;flex-wrap:wrap;}
.editor-topbar-title{flex:1;text-align:center;font-size:1rem;font-weight:800;color:var(--white);}
.editor-topbar-actions{display:flex;gap:8px;}
#aePickExisting{background:var(--surface2);border:1px solid var(--border2);color:var(--off);border-radius:4px;padding:8px 10px;font-size:0.78rem;max-width:220px;}
.editor-workspace{display:flex;flex:1;min-height:0;}
.editor-canvas{flex:1;overflow-y:auto;padding:28px 32px;min-width:0;}
.editor-cover-section{margin-bottom:20px;}
.cover-placeholder{position:relative;border:2px dashed var(--border2);border-radius:8px;padding:34px;text-align:center;color:var(--muted);cursor:pointer;}
.cover-placeholder:hover{border-color:var(--gold);}
.cover-preview{width:100%;max-height:260px;object-fit:cover;border-radius:8px;}
.editor-meta-fields{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;}
.editor-title-input{font-size:2rem;font-weight:900;color:var(--white);background:transparent;border:none;border-bottom:1px solid transparent;outline:none;padding:6px 0;font-family:inherit;}
.editor-title-input:focus{border-bottom-color:var(--gold);}
.editor-slug-input{font-family:monospace;font-size:0.82rem;color:var(--muted);background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:9px 12px;outline:none;}
.editor-excerpt-input{background:var(--surface2);border:1px solid var(--border);border-radius:4px;color:var(--off);padding:12px;font-size:0.88rem;font-family:inherit;min-height:70px;resize:vertical;outline:none;}
.editor-blocks-container{display:flex;flex-direction:column;gap:16px;margin-bottom:20px;}
.editor-add-block{text-align:center;padding:26px;border:2px dashed var(--border2);border-radius:8px;color:var(--muted);cursor:pointer;}
.editor-add-block:hover{border-color:var(--gold);color:var(--gold);}
.editor-sidebar{width:340px;flex-shrink:0;border-left:1px solid var(--border);background:var(--surface);overflow-y:auto;}
.editor-tabs{display:flex;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--surface);z-index:5;}
.editor-tab{flex:1;padding:13px;background:none;border:none;border-bottom:2px solid transparent;color:var(--muted);font-weight:700;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;}
.editor-tab.active{color:var(--gold);border-bottom-color:var(--gold);}
.editor-panel{padding:20px;display:flex;flex-direction:column;gap:16px;}
.editor-panel .field label{display:block;font-size:0.68rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.editor-panel .field textarea,.editor-panel .field input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:4px;color:var(--white);padding:10px;font-size:0.84rem;font-family:inherit;outline:none;}
.field-checkbox{display:flex;align-items:center;gap:8px;font-size:0.84rem;color:var(--off);}
.field-checkbox input{width:16px;height:16px;}
.editor-danger-zone{margin-top:12px;padding-top:16px;border-top:1px solid var(--border);}
.editor-danger-zone h4{font-size:0.7rem;color:var(--red);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;}
.asset-upload-box h4,.asset-library-box h4{font-size:0.8rem;font-weight:700;color:var(--white);margin-bottom:10px;}
.asset-upload-box input[type=text]{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:4px;color:var(--white);padding:8px;font-size:0.78rem;margin-top:8px;outline:none;}
.asset-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.editor-block{position:relative;padding:15px;margin-bottom:15px;background:var(--surface);border-radius:6px;border:1px solid transparent;transition:all .2s;}
.editor-block:hover{border-color:var(--border2);}
.editor-block input,.editor-block textarea,.editor-block select{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:4px;color:var(--white);padding:8px;font-family:inherit;outline:none;}
#aeBlockMenu{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;padding:12px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;}
#aeBlockMenu button{padding:8px 12px;border:1px solid var(--border2);border-radius:4px;background:var(--surface);color:var(--off);font-size:0.8rem;cursor:pointer;}
#aeBlockMenu button:hover{border-color:var(--gold);color:var(--gold);}
#aeSpinner{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:none;align-items:center;justify-content:center;}
.ae-spin-box{background:#fff;color:#1a1a1a;padding:18px 26px;border-radius:8px;display:flex;align-items:center;gap:12px;font-size:.9rem;}
.ae-spin{width:22px;height:22px;border:3px solid rgba(0,0,0,.15);border-top-color:#c9a84c;border-radius:50%;animation:aespin .8s linear infinite;}
@keyframes aespin{to{transform:rotate(360deg)}}
@media(max-width:900px){.editor-workspace{flex-direction:column;}.editor-sidebar{width:100%;border-left:none;border-top:1px solid var(--border);}}`;
    document.head.appendChild(s);
  }
  // 4) Add the "Open existing article" picker into the topbar
  installArticlePicker();
  loadAffiliateAssets();
});

// ── ADMIN GATE + OPEN / CLOSE ───────────────────────────────
async function openArticleEditor(articleSlug) {
  if (!currentUser || !['digitalcatchup'].includes((currentUser.username || '').toLowerCase())) {
    toast('This feature is only available for administrators.', 'error');
    return;
  }
  const page = document.getElementById('editorPage');
  if (!page) { console.warn('editorPage not found'); return; }

  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setChecked = (id, c) => { const el = document.getElementById(id); if (el) el.checked = c; };
  const setDisplay = (id, d) => { const el = document.getElementById(id); if (el) el.style.display = d; };

  setVal('editArticleTitle',''); setVal('editArticleSlug',''); setVal('editArticleExcerpt','');
  setVal('editArticleSeoDesc',''); setVal('editArticleAuthor','');
  setChecked('editArticlePublished', true);
  setDisplay('coverImageActual','none'); setDisplay('coverImagePlaceholder','block'); setDisplay('removeCoverBtn','none');
  const coverImg = document.getElementById('coverImageActual'); if (coverImg) coverImg.src = '';
  pendingCoverUrl = null; coverRemoved = false;
  currentBlocks = []; currentEditingArticle = null;

  if (articleSlug) {
    showSpinner('Loading article…');
    try {
      const { data, error } = await db.from('articles').select('*').eq('slug', articleSlug).single();
      if (error) throw error;
      currentEditingArticle = data;
      const t = document.getElementById('articleEditorTitle'); if (t) t.textContent = 'Edit Article';
      setVal('editArticleTitle', data.title || '');
      setVal('editArticleSlug', data.slug || '');
      setVal('editArticleExcerpt', data.excerpt || '');
      setVal('editArticleSeoDesc', data.seo_description || '');
      setVal('editArticleAuthor', data.author || '');
      setChecked('editArticlePublished', data.published !== false);
      if (data.cover_image_url) {
        pendingCoverUrl = data.cover_image_url;
        const ci = document.getElementById('coverImageActual');
        if (ci) { ci.src = data.cover_image_url; ci.style.display = 'block'; }
        setDisplay('coverImagePlaceholder','none'); setDisplay('removeCoverBtn','block');
      }
      if (data.content_blocks && Array.isArray(data.content_blocks)) currentBlocks = data.content_blocks;
      else if (data.content) currentBlocks = [{ type:'html', content:data.content }];
      else if (data.body) currentBlocks = [{ type:'html', content:data.body }];
      renderBlocks();
    } catch (err) {
      console.error('Error loading article:', err);
      toast('Failed to load article: ' + (err.message || err), 'error');
    } finally { hideSpinner(); }
  } else {
    const t = document.getElementById('articleEditorTitle'); if (t) t.textContent = 'Create New Article';
    renderBlocks();
  }
  const sel = document.getElementById('aePickExisting'); if (sel) sel.value = articleSlug || '';
  showPage('editorPage');
}
function closeArticleEditor() {
  currentEditingArticle = null; currentBlocks = []; pendingCoverUrl = null; coverRemoved = false;
  if (currentUser) showPage('profilePage', '/profile/' + currentUser.username);
  else showPage('homePage');
}

// ── EXISTING-ARTICLE PICKER ─────────────────────────────────
function installArticlePicker() {
  const bar = document.querySelector('#editorPage .editor-topbar');
  if (!bar || document.getElementById('aePickExisting')) return;
  const sel = document.createElement('select');
  sel.id = 'aePickExisting';
  sel.innerHTML = '<option value="">＋ New article</option>';
  sel.onchange = () => openArticleEditor(sel.value || null);
  bar.insertBefore(sel, bar.firstChild);
  refreshPicker();
}
function refreshPicker() {
  const sel = document.getElementById('aePickExisting');
  if (!sel) return;
  db.from('articles').select('slug,title').order('updated_at', { ascending:false }).then(({ data, error }) => {
    if (error) { console.error(error); return; }
    sel.innerHTML = '<option value="">＋ New article</option>' +
      (data || []).map(a => `<option value="${a.slug}">${escapeHtml(a.title)}</option>`).join('');
    if (currentEditingArticle) sel.value = currentEditingArticle.slug;
  });
}

// ── PANEL TABS ──────────────────────────────────────────────
function switchEditorPanel(panel) {
  const sp = document.getElementById('panelSettings'), ap = document.getElementById('panelAssets');
  const st = document.getElementById('tabSettings'), at = document.getElementById('tabAssets');
  if (panel === 'settings') {
    if (sp) sp.style.display='flex'; if (ap) ap.style.display='none';
    if (st) st.classList.add('active'); if (at) at.classList.remove('active');
  } else {
    if (sp) sp.style.display='none'; if (ap) ap.style.display='flex';
    if (st) st.classList.remove('active'); if (at) at.classList.add('active');
  }
}

// ── BLOCKS ──────────────────────────────────────────────────
function addBlock(type, data) {
  data = data || {};
  const b = Object.assign({ id:'block_' + Date.now() + '_' + Math.random().toString(36).substr(2,9), type:type, content:'' }, data);
  switch (type) {
    case 'heading': b.content='New Heading'; break;
    case 'subheading': b.content='New Subheading'; break;
    case 'paragraph': b.content='Start writing your paragraph here...'; break;
    case 'quote': b.content='Enter quote text...'; b.citation=''; break;
    case 'ctaBlock': b.content='Special Offer!'; b.ctaText='Learn More'; b.ctaLink='#'; b.backgroundColor='var(--gold-dim)'; break;
    case 'image': b.url=''; b.alt=''; b.caption=''; break;
    case 'affiliateGif': case 'affiliateBanner': b.assetId=''; break;
    case 'divider': b.style='solid'; break;
    case 'html': b.content='<p>Your custom HTML here</p>'; break;
  }
  currentBlocks.push(b);
  renderBlocks(); hideAddBlockPrompt();
}
function hideAddBlockPrompt() { const p = document.getElementById('addBlockPrompt'); if (p) p.style.display='none'; }
function showBlockPicker() {
  let menu = document.getElementById('aeBlockMenu');
  if (menu) { menu.remove(); return; }
  menu = document.createElement('div'); menu.id = 'aeBlockMenu';
  const types = [
    ['heading','H1 Heading'],['subheading','H2 Subheading'],['paragraph','¶ Paragraph'],
    ['image','🖼️ Image'],['affiliateGif','🎬 Affiliate GIF'],['affiliateBanner','📢 Affiliate Banner'],
    ['ctaBlock','⚡ CTA Block'],['quote','❝ Quote'],['divider','― Divider'],['html','</> Custom HTML']
  ];
  menu.innerHTML = types.map(t => `<button type="button" onclick="addBlock('${t[0]}');document.getElementById('aeBlockMenu').remove();">${t[1]}</button>`).join('');
  const prompt = document.getElementById('addBlockPrompt');
  if (prompt) { prompt.style.display='block'; prompt.appendChild(menu); }
}
function renderBlocks() {
  const container = document.getElementById('blocksContainer');
  if (!container) return;
  container.innerHTML = '';
  currentBlocks.forEach((b,i) => container.appendChild(createBlockElement(b,i)));
  const p = document.getElementById('addBlockPrompt');
  if (p) p.style.display = currentBlocks.length === 0 ? 'block' : 'none';
}
function createBlockElement(block, index) {
  const div = document.createElement('div');
  div.className = 'editor-block'; div.dataset.blockId = block.id;
  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute;top:-10px;right:10px;display:flex;gap:5px;opacity:0;transition:opacity .2s;';
  controls.innerHTML = `<button class="btn btn-ghost" onclick="moveBlockUp(${index})" style="padding:4px 8px;font-size:.7rem;">↑</button> <button class="btn btn-ghost" onclick="moveBlockDown(${index})" style="padding:4px 8px;font-size:.7rem;">↓</button> <button class="btn btn-ghost" onclick="duplicateBlock(${index})" style="padding:4px 8px;font-size:.7rem;">⧉</button> <button class="btn btn-ghost" onclick="deleteBlock(${index})" style="padding:4px 8px;font-size:.7rem;color:var(--red);">🗑</button>`;
  div.onmouseenter = () => controls.style.opacity = '1';
  div.onmouseleave = () => controls.style.opacity = '0';
  div.appendChild(controls);
  let h = '';
  switch (block.type) {
    case 'heading':
      h = `<input type="text" value="${escapeHtml(block.content)}" onchange="updateBlock(${index},'content',this.value)" style="font-size:1.8rem;font-weight:700;background:transparent;border:none;color:var(--white);outline:none;"/>`;
      break;
    case 'subheading':
      h = `<input type="text" value="${escapeHtml(block.content)}" onchange="updateBlock(${index},'content',this.value)" style="font-size:1.3rem;font-weight:600;background:transparent;border:none;color:var(--off);outline:none;"/>`;
      break;
    case 'paragraph':
      h = `<textarea onchange="updateBlock(${index},'content',this.value)" style="min-height:80px;background:transparent;border:none;color:var(--off);outline:none;resize:vertical;line-height:1.6;">${escapeHtml(block.content)}</textarea>`;
      break;
    case 'quote':
      h = `<div style="border-left:3px solid var(--gold);padding-left:15px;">
        <textarea onchange="updateBlock(${index},'content',this.value)" style="min-height:60px;background:transparent;border:none;color:var(--muted);outline:none;resize:vertical;font-style:italic;">${escapeHtml(block.content)}</textarea>
        <input type="text" value="${escapeHtml(block.citation||'')}" onchange="updateBlockProperty(${index},'citation',this.value)" placeholder="— Author" style="margin-top:8px;background:transparent;border:none;color:var(--muted2);outline:none;font-size:.85rem;"/>
      </div>`;
      break;
    case 'ctaBlock':
      h = `<div style="background:${block.backgroundColor||'var(--gold-dim)'};padding:20px;border-radius:6px;text-align:center;">
        <input type="text" value="${escapeHtml(block.content)}" onchange="updateBlock(${index},'content',this.value)" style="font-size:1.2rem;font-weight:600;background:transparent;border:none;color:var(--white);outline:none;text-align:center;margin-bottom:10px;"/>
        <div style="display:flex;gap:10px;justify-content:center;align-items:center;">
          <input type="text" value="${escapeHtml(block.ctaText||'Learn More')}" onchange="updateBlockProperty(${index},'ctaText',this.value)" style="flex:1;max-width:150px;"/>
          <input type="text" value="${escapeHtml(block.ctaLink||'#')}" onchange="updateBlockProperty(${index},'ctaLink',this.value)" placeholder="CTA Link" style="flex:2;max-width:250px;font-family:monospace;"/>
        </div></div>`;
      break;
    case 'image':
      h = block.url
        ? `<img src="${escapeHtml(block.url)}" alt="${escapeHtml(block.alt||'')}" style="max-width:100%;border-radius:4px;"/>${block.caption ? `<p style="text-align:center;color:var(--muted2);font-size:.8rem;margin-top:8px;">${escapeHtml(block.caption)}</p>` : ''}`
        : `<div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">
            <p style="color:var(--muted2);">Add an image URL</p>
            <input type="text" onchange="updateBlockProperty(${index},'url',this.value)" placeholder="Image URL" style="margin-top:10px;"/>
            <input type="text" onchange="updateBlockProperty(${index},'alt',this.value)" placeholder="Alt text" style="margin-top:8px;"/>
          </div>`;
      break;
    case 'affiliateGif': case 'affiliateBanner': {
      const asset = affiliateAssets.find(a => a.id === block.assetId);
      h = asset
        ? `<img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" style="max-width:100%;border-radius:4px;"/>
           <p style="text-align:center;color:var(--muted2);font-size:.75rem;margin-top:8px;">${asset.type.toUpperCase()}: ${escapeHtml(asset.name)}</p>`
        : `<div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">
            <p style="color:var(--muted2);margin-bottom:10px;">No asset selected</p>
            <select onchange="updateBlockProperty(${index},'assetId',this.value)">
              <option value="">Select an asset…</option>
              ${affiliateAssets.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join('')}
            </select></div>`;
      break;
    }
    case 'divider':
      h = `<hr style="border:none;border-top:1px ${block.style||'solid'} var(--border);margin:20px 0;"/>`;
      break;
    case 'html':
      h = `<textarea onchange="updateBlock(${index},'content',this.value)" style="min-height:100px;font-family:monospace;font-size:.85rem;">${escapeHtml(block.content)}</textarea>
           <p style="font-size:.7rem;color:var(--muted2);margin-top:5px;">Custom HTML block</p>`;
      break;
  }
  div.innerHTML += h;
  return div;
}
function updateBlock(i,p,v){ if(currentBlocks[i]){currentBlocks[i][p]=v; renderBlocks();} }
function updateBlockProperty(i,p,v){ if(currentBlocks[i]){currentBlocks[i][p]=v; renderBlocks();} }
function moveBlockUp(i){ if(i===0)return; [currentBlocks[i-1],currentBlocks[i]]=[currentBlocks[i],currentBlocks[i-1]]; renderBlocks(); }
function moveBlockDown(i){ if(i===currentBlocks.length-1)return; [currentBlocks[i],currentBlocks[i+1]]=[currentBlocks[i+1],currentBlocks[i]]; renderBlocks(); }
function duplicateBlock(i){ const d={...currentBlocks[i],id:'block_'+Date.now()}; currentBlocks.splice(i+1,0,d); renderBlocks(); }
function deleteBlock(i){ if(confirm('Delete this block?')){ currentBlocks.splice(i,1); renderBlocks(); if(!currentBlocks.length){const p=document.getElementById('addBlockPrompt'); if(p)p.style.display='block';} } }

// ── COVER IMAGE (upload to storage) ─────────────────────────
function handleCoverImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please select an image file','error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const ci = document.getElementById('coverImageActual');
    if (ci) { ci.src = e.target.result; ci.style.display='block'; }
    const ph = document.getElementById('coverImagePlaceholder'); if (ph) ph.style.display='none';
    const rb = document.getElementById('removeCoverBtn'); if (rb) rb.style.display='block';
  };
  reader.readAsDataURL(file);
  showSpinner('Uploading cover image…');
  const fileName = 'cover_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g,'_');
  db.storage.from('articles').upload('covers/' + fileName, file, { upsert:true })
    .then(res => {
      if (res.error) throw res.error;
      const pub = db.storage.from('articles').getPublicUrl('covers/' + fileName);
      pendingCoverUrl = pub.data.publicUrl; coverRemoved = false;
      hideSpinner(); toast('Cover image uploaded.','success');
    })
    .catch(err => { hideSpinner(); console.error(err); toast('Cover preview shown, but upload failed: ' + (err.message||err),'error'); });
}
function removeCoverImage() {
  const inp = document.getElementById('coverImageInput'); if (inp) inp.value='';
  const ci = document.getElementById('coverImageActual'); if (ci){ ci.src=''; ci.style.display='none'; }
  const ph = document.getElementById('coverImagePlaceholder'); if (ph) ph.style.display='block';
  const rb = document.getElementById('removeCoverBtn'); if (rb) rb.style.display='none';
  pendingCoverUrl = null; coverRemoved = true;
}

// ── AFFILIATE ASSETS ────────────────────────────────────────
function loadAffiliateAssets() {
  db.from('affiliate_assets').select('*').order('created_at',{ascending:false})
    .then(({ data, error }) => { if (error) throw error; affiliateAssets = data || []; renderAffiliateAssetsGrid(); })
    .catch(err => console.error('Error loading affiliate assets:', err));
}
function renderAffiliateAssetsGrid() {
  const grid = document.getElementById('affiliateAssetsGrid');
  if (!grid) return;
  if (!affiliateAssets.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted2);font-size:.8rem;">No assets yet. Upload your first GIF or banner!</p>';
    return;
  }
  grid.innerHTML = affiliateAssets.map(asset =>
    `<div style="position:relative;background:var(--surface2);border-radius:4px;overflow:hidden;cursor:pointer;" onclick="insertAssetInEditor('${asset.id}')">
      <img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" style="width:100%;height:80px;object-fit:cover;"/>
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);padding:4px 6px;">
        <div style="font-size:.65rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(asset.name)}</div>
        <div style="font-size:.6rem;color:#bbb;text-transform:uppercase;">${asset.type}</div>
      </div>
      <button onclick="event.stopPropagation();deleteAffiliateAsset('${asset.id}')" style="position:absolute;top:4px;right:4px;background:rgba(224,73,95,.9);border:none;color:#fff;border-radius:50%;width:20px;height:20px;font-size:.7rem;cursor:pointer;">×</button>
    </div>`).join('');
}
function handleAffiliateAssetUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const linkEl = document.getElementById('newAssetAffiliateLink');
  const affiliateLink = linkEl ? linkEl.value.trim() : '';
  if (!file.type.startsWith('image/')) { toast('Please select an image file','error'); return; }
  const type = /\.(png|jpe?g)$/i.test(file.name) ? 'banner' : 'gif';
  const fileName = 'asset_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g,'_');
  showSpinner('Uploading asset…');
  db.storage.from('articles').upload('affiliate/' + fileName, file, { upsert:true })
    .then(res => {
      if (res.error) throw res.error;
      const pub = db.storage.from('articles').getPublicUrl('affiliate/' + fileName);
      return db.from('affiliate_assets').insert({ name: file.name.replace(/\.[^/.]+$/,''), url: pub.data.publicUrl, type: type, affiliate_link: affiliateLink || null });
    })
    .then(res => {
      if (res && res.error) throw res.error;
      const ai = document.getElementById('affiliateAssetInput'); if (ai) ai.value='';
      if (linkEl) linkEl.value='';
      loadAffiliateAssets(); hideSpinner(); toast('Asset uploaded successfully!','success');
    })
    .catch(err => { hideSpinner(); console.error(err); toast('Failed to upload asset: ' + (err.message||err),'error'); });
}
function insertAssetInEditor(assetId) {
  const asset = affiliateAssets.find(a => a.id === assetId);
  if (!asset) return;
  addBlock(asset.type === 'gif' ? 'affiliateGif' : 'affiliateBanner', { assetId: assetId });
  switchEditorPanel('settings');
}
function deleteAffiliateAsset(assetId) {
  if (!confirm('Delete this asset? Existing uses in articles will remain.')) return;
  showSpinner('Deleting asset…');
  db.from('affiliate_assets').delete().eq('id', assetId)
    .then(({ error }) => { if (error) throw error; loadAffiliateAssets(); hideSpinner(); })
    .catch(err => { hideSpinner(); console.error(err); toast('Failed to delete asset: ' + (err.message||err),'error'); });
}

// ── PREVIEW + HTML GEN ──────────────────────────────────────
function generateHtmlFromBlocks() {
  return currentBlocks.map(block => {
    switch (block.type) {
      case 'heading': return `<h1>${block.content}</h1>`;
      case 'subheading': return `<h2>${block.content}</h2>`;
      case 'paragraph': return `<p>${block.content}</p>`;
      case 'quote': return `<blockquote>${block.content}${block.citation ? `<footer>— ${block.citation}</footer>` : ''}</blockquote>`;
      case 'ctaBlock': return `<div class="cta-block" style="background:${block.backgroundColor||'var(--gold-dim)'};padding:20px;border-radius:6px;text-align:center;margin:20px 0;"><h3>${block.content}</h3><a href="${block.ctaLink||'#'}" style="display:inline-block;margin-top:10px;padding:10px 20px;background:var(--gold);color:#fff;text-decoration:none;border-radius:3px;font-weight:600;">${block.ctaText||'Learn More'}</a></div>`;
      case 'image': return `<figure><img src="${block.url}" alt="${block.alt||''}"/><figcaption>${block.caption||''}</figcaption></figure>`;
      case 'affiliateGif': case 'affiliateBanner': {
        const asset = affiliateAssets.find(a => a.id === block.assetId);
        if (!asset) return '';
        const lw = asset.affiliate_link ? `<a href="${asset.affiliate_link}" target="_blank" rel="nofollow sponsored">` : '';
        const le = asset.affiliate_link ? '</a>' : '';
        return `${lw}<img src="${asset.url}" alt="${asset.name}"/>${le}`;
      }
      case 'divider': return `<hr/>`;
      case 'html': return block.content;
      default: return '';
    }
  }).join('\n');
}
function previewArticle() {
  const title = document.getElementById('editArticleTitle')?.value || '';
  const excerpt = document.getElementById('editArticleExcerpt')?.value || '';
  const coverImage = pendingCoverUrl || document.getElementById('coverImageActual')?.src || '';
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><title>${escapeHtml(title)} - Preview</title><style>
    body{font-family:'Lora',Georgia,serif;max-width:800px;margin:0 auto;padding:40px 20px;background:#0b0d12;color:#d4d8e0;}
    h1{font-size:2.5rem;margin-bottom:10px;color:#f4f5f7;}.excerpt{color:#8a93a6;font-style:italic;margin-bottom:30px;}
    .cover-image{width:100%;height:300px;object-fit:cover;border-radius:8px;margin-bottom:30px;}
    .content{line-height:1.8;}img{max-width:100%;border-radius:4px;}hr{border:none;border-top:1px solid #262b38;margin:30px 0;}
  </style></head><body>
  ${coverImage ? `<img src="${coverImage}" class="cover-image"/>` : ''}
  <h1>${escapeHtml(title)}</h1>
  ${excerpt ? `<p class="excerpt">${escapeHtml(excerpt)}</p>` : ''}
  <div class="content">${generateHtmlFromBlocks()}</div></body></html>`);
  w.document.close();
}

// ── SAVE / DELETE ───────────────────────────────────────────
async function saveArticleFromEditor() {
  const title = document.getElementById('editArticleTitle').value.trim();
  const slug = document.getElementById('editArticleSlug').value.trim().toLowerCase().replace(/[^a-z0-9-]/g,'-');
  const excerpt = document.getElementById('editArticleExcerpt').value.trim();
  if (!title) { toast('Please enter a title','error'); return; }
  if (!slug) { toast('Please enter a slug','error'); return; }
  if (!excerpt) { toast('Please enter an excerpt','error'); return; }
  if (!currentBlocks.length) { toast('Please add at least one content block','error'); return; }
  const html = generateHtmlFromBlocks();
  const articleData = {
    title, slug, excerpt,
    content_blocks: currentBlocks,
    content: html,
    body: html,
    cover_image_url: coverRemoved ? null : (pendingCoverUrl || (currentEditingArticle ? currentEditingArticle.cover_image_url : null)),
    seo_description: document.getElementById('editArticleSeoDesc').value.trim() || null,
    author: document.getElementById('editArticleAuthor').value.trim() || null,
    published: document.getElementById('editArticlePublished').checked,
    updated_at: new Date().toISOString()
  };
  showSpinner('Saving article…');
  try {
    if (currentEditingArticle && currentEditingArticle.id) {
      const { error } = await db.from('articles').update(articleData).eq('id', currentEditingArticle.id);
      if (error) throw error;
    } else {
      articleData.created_at = new Date().toISOString();
      const { error } = await db.from('articles').insert([articleData]);
      if (error) throw error;
    }
    hideSpinner(); toast('Article saved successfully!','success');
    if (typeof loadArticlesFromDb === 'function') loadArticlesFromDb();
    refreshPicker();
  } catch (err) {
    hideSpinner(); console.error(err); toast('Failed to save article: ' + (err.message||err),'error');
  }
}
async function deleteCurrentArticle() {
  if (!currentEditingArticle || !currentEditingArticle.id) { toast('No article selected for deletion','error'); return; }
  if (!confirm(`Are you sure you want to delete "${currentEditingArticle.title}"? This cannot be undone.`)) return;
  showSpinner('Deleting article…');
  try {
    const { error } = await db.from('articles').delete().eq('id', currentEditingArticle.id);
    if (error) throw error;
    hideSpinner(); toast('Article deleted successfully','success');
    if (typeof loadArticlesFromDb === 'function') loadArticlesFromDb();
    refreshPicker(); closeArticleEditor();
  } catch (err) {
    hideSpinner(); console.error(err); toast('Failed to delete article: ' + (err.message||err),'error');
  }
}

// ── SPINNER + TOAST ─────────────────────────────────────────
function showSpinner(msg) {
  let s = document.getElementById('aeSpinner');
  if (!s) { s = document.createElement('div'); s.id = 'aeSpinner'; document.body.appendChild(s); }
  s.innerHTML = `<div class="ae-spin-box"><div class="ae-spin"></div><span>${msg || 'Working…'}</span></div>`;
  s.style.display = 'flex';
}
function hideSpinner() { const s = document.getElementById('aeSpinner'); if (s) s.style.display = 'none'; }
function toast(message, type, title) {
  type = type || 'info';
  let container = document.getElementById('toastContainer');
  if (!container) { container = document.createElement('div'); container.id='toastContainer'; container.className='toast-container'; document.body.appendChild(container); }
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.innerHTML = `<button class="toast-close" onclick="this.parentElement.remove()">×</button>`
    + (title ? `<div class="toast-title">${escapeHtml(title)}</div>` : '')
    + `<div class="toast-msg">${escapeHtml(message)}</div>`;
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, type === 'error' ? 6000 : 3500);
}
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
