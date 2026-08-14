// ============================================================
// article-editor.js — Full-page block-style article editor (v3)
// Uses the site's Supabase client `db` (from supabase-config.js)
// ============================================================

let currentEditingArticle = null;
let currentBlocks = [];
let affiliateAssets = [];
let pendingCoverUrl = null;
let coverRemoved = false;

// ── SELF-CONTAINED STYLES (injected once) ───────────────────
function injectEditorCss() {
  if (document.getElementById('aeCss')) return;
  const s = document.createElement('style');
  s.id = 'aeCss';
  s.textContent = `
    #aeSpinner{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:none;align-items:center;justify-content:center;}
    .ae-spin-box{background:#fff;color:#1a1a1a;padding:18px 26px;border-radius:8px;display:flex;align-items:center;gap:12px;font-size:.9rem;box-shadow:0 8px 30px rgba(0,0,0,.3);}
    .ae-spin{width:22px;height:22px;border:3px solid rgba(0,0,0,.15);border-top-color:#c9a84c;border-radius:50%;animation:aespin .8s linear infinite;}
    @keyframes aespin{to{transform:rotate(360deg)}}
    #aeBlockMenu{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;padding:12px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;}
    #aeBlockMenu button{padding:8px 12px;border:1px solid var(--border2);border-radius:4px;background:var(--surface);color:var(--off);font-size:.8rem;cursor:pointer;}
    #aeBlockMenu button:hover{border-color:var(--gold);color:var(--gold);}
    #addBlockPrompt{cursor:pointer;}
  `;
  document.head.appendChild(s);
}

// ── LOADING SPINNER ─────────────────────────────────────────
function showSpinner(msg) {
  let s = document.getElementById('aeSpinner');
  if (!s) { s = document.createElement('div'); s.id = 'aeSpinner'; document.body.appendChild(s); }
  s.innerHTML = '<div class="ae-spin-box"><div class="ae-spin"></div><span>' + (msg || 'Working…') + '</span></div>';
  s.style.display = 'flex';
}
function hideSpinner() { const s = document.getElementById('aeSpinner'); if (s) s.style.display = 'none'; }

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectEditorCss();
  if (document.getElementById('editorPage')) loadAffiliateAssets();
});

// ── OPEN EDITOR ─────────────────────────────────────────────
async function openArticleEditor(articleSlug = null) {
  injectEditorCss();
  const page = document.getElementById('editorPage');
  if (!page) { console.warn('Editor page not found'); return; }

  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setChecked = (id, c) => { const el = document.getElementById(id); if (el) el.checked = c; };
  const setDisplay = (id, d) => { const el = document.getElementById(id); if (el) el.style.display = d; };

  // reset
  setVal('editArticleTitle',''); setVal('editArticleSlug',''); setVal('editArticleExcerpt','');
  setVal('editArticleSeoDesc',''); setVal('editArticleAuthor','');
  setChecked('editArticlePublished', true);
  setDisplay('coverImageActual','none'); setDisplay('coverImagePlaceholder','flex'); setDisplay('removeCoverBtn','none');
  const coverImg = document.getElementById('coverImageActual'); if (coverImg) coverImg.src = '';
  pendingCoverUrl = null; coverRemoved = false;
  currentBlocks = []; currentEditingArticle = null;

  if (articleSlug) {
    showSpinner('Loading article...');
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
        if (ci) { ci.src = data.cover_image_url; ci.style.display='block'; }
        setDisplay('coverImagePlaceholder','none'); setDisplay('removeCoverBtn','block');
      }
      if (data.content_blocks && Array.isArray(data.content_blocks)) currentBlocks = data.content_blocks;
      else if (data.content) currentBlocks = [{ type:'html', content:data.content }];
      else if (data.body) currentBlocks = [{ type:'html', content:data.body }];
      renderBlocks();
    } catch (err) {
      console.error('Error loading article:', err);
      toast('Failed to load article: ' + (err.message || err), 'error');
    } finally {
      hideSpinner();
    }
  } else {
    const t = document.getElementById('articleEditorTitle'); if (t) t.textContent = 'Create New Article';
    renderBlocks();
  }

  loadAffiliateAssets();
  
  // Route to the editor page
  const url = articleSlug ? '/editor/' + articleSlug : '/editor';
  showPage('editorPage', url);
  
  installArticlePicker();
  wireBlockPrompt();
}

// ── EXISTING-ARTICLE PICKER ─────────────────────────────────
function installArticlePicker() {
  const topbar = document.querySelector('.editor-topbar');
  if (!topbar) return;
  const old = document.getElementById('aePickerBar'); if (old) old.remove();
  
  const bar = document.createElement('div');
  bar.id = 'aePickerBar';
  bar.style.cssText = 'display:flex;align-items:center;gap:8px;';
  bar.innerHTML = '<label style="font-size:0.75rem;color:var(--muted);margin:0;">Open:</label><select id="aePickExisting" style="padding:6px 8px;border-radius:4px;border:1px solid var(--border);background:var(--surface2);color:var(--white);font-size:0.8rem;max-width:200px;"><option value="">＋ New article</option></select>';
  
  const backBtn = topbar.querySelector('.btn-ghost');
  if (backBtn) backBtn.after(bar);
  else topbar.prepend(bar);

  const sel = document.getElementById('aePickExisting');
  db.from('articles').select('slug,title').order('updated_at', { ascending:false }).then(({ data, error }) => {
    if (error) { console.error(error); return; }
    const rows = data || [];
    rows.forEach(a => { const o = document.createElement('option'); o.value = a.slug; o.textContent = a.title; sel.appendChild(o); });
    if (rows.length === 0) {
      const btn = document.createElement('button');
      btn.id = 'aeImportBtn'; btn.type = 'button';
      btn.textContent = '⬇ Import starters';
      btn.style.cssText = 'padding:6px 10px;font-size:0.75rem;border:1px solid var(--gold);background:transparent;color:var(--gold);border-radius:4px;cursor:pointer;';
      btn.onclick = importStarterArticles;
      bar.appendChild(btn);
    }
    if (currentEditingArticle) sel.value = currentEditingArticle.slug;
  });
  sel.addEventListener('change', e => { const slug = e.target.value; openArticleEditor(slug || null); });
}

async function importStarterArticles() {
  const src = (typeof articles !== 'undefined') ? articles : [];
  if (!src.length) { toast('No starter articles found.', 'error'); return; }
  showSpinner('Importing starter articles…');
  try {
    const rows = src.map(a => ({
      slug: a.slug, title: a.title, excerpt: a.excerpt,
      content: a.body || '', content_blocks: null,
      cover_image_url: null, seo_description: null,
      author: 'Butterfly Dynamix', published: true
    }));
    const { error } = await db.from('articles').insert(rows);
    if (error) throw error;
    hideSpinner();
    toast('Imported ' + rows.length + ' articles.', 'success');
    installArticlePicker();
  } catch (err) {
    hideSpinner(); console.error(err);
    toast('Import failed: ' + (err.message || err), 'error');
  }
}

// ── CLOSE ───────────────────────────────────────────────────
function closeArticleEditor() {
  currentEditingArticle = null; currentBlocks = []; pendingCoverUrl = null; coverRemoved = false;
  if (currentUser) {
    showPage('profilePage', '/profile/' + currentUser.username);
  } else {
    history.back();
  }
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
function wireBlockPrompt() {
  const prompt = document.getElementById('addBlockPrompt');
  if (prompt) prompt.onclick = showBlockPicker;
}

function addBlock(type, data = {}) {
  const newBlock = { id:'block_' + Date.now() + '_' + Math.random().toString(36).substr(2,9), type, content:'', ...data };
  switch (type) {
    case 'heading': newBlock.content='New Heading'; break;
    case 'subheading': newBlock.content='New Subheading'; break;
    case 'paragraph': newBlock.content='Start writing…'; break;
    case 'quote': newBlock.content='Enter quote…'; newBlock.citation=''; break;
    case 'ctaBlock': newBlock.content='Special Offer!'; newBlock.ctaText='Learn More'; newBlock.ctaLink='#'; newBlock.backgroundColor='var(--gold-dim)'; break;
    case 'image': newBlock.url=''; newBlock.alt=''; newBlock.caption=''; break;
    case 'affiliateGif': case 'affiliateBanner': newBlock.assetId=''; newBlock.align='center'; break;
    case 'divider': newBlock.style='solid'; break;
    case 'html': newBlock.content='<p>Your custom HTML here</p>'; break;
  }
  currentBlocks.push(newBlock);
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
  menu.innerHTML = types.map(([t,l]) => '<button type="button" onclick="addBlock(\''+t+'\');document.getElementById(\'aeBlockMenu\').remove();">'+l+'</button>').join('');
  const prompt = document.getElementById('addBlockPrompt');
  if (prompt) { prompt.style.display='block'; prompt.appendChild(menu); }
}

function renderBlocks() {
  const container = document.getElementById('blocksContainer');
  if (!container) return;
  container.innerHTML = '';
  currentBlocks.forEach((b,i) => container.appendChild(createBlockElement(b,i)));
  const p = document.getElementById('addBlockPrompt');
  if (p) p.style.display = currentBlocks.length === 0 ? 'flex' : 'block';
}

function createBlockElement(block, index) {
  const div = document.createElement('div');
  div.className = 'editor-block'; div.dataset.blockId = block.id;
  div.style.cssText = 'position:relative;padding:15px;margin-bottom:15px;background:var(--surface);border-radius:6px;border:1px solid transparent;transition:all .2s;';
  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute;top:-10px;right:10px;display:flex;gap:5px;opacity:0;transition:opacity .2s;';
  controls.innerHTML = '<button class="btn btn-ghost" onclick="moveBlockUp('+index+')" style="padding:4px 8px;font-size:.7rem;">↑</button> <button class="btn btn-ghost" onclick="moveBlockDown('+index+')" style="padding:4px 8px;font-size:.7rem;">↓</button> <button class="btn btn-ghost" onclick="duplicateBlock('+index+')" style="padding:4px 8px;font-size:.7rem;">⧉</button> <button class="btn btn-ghost" onclick="deleteBlock('+index+')" style="padding:4px 8px;font-size:.7rem;color:var(--red);">🗑</button>';
  div.onmouseenter = () => { div.style.borderColor='var(--border2)'; controls.style.opacity='1'; };
  div.onmouseleave = () => { div.style.borderColor='transparent'; controls.style.opacity='0'; };
  div.appendChild(controls);
  let contentHtml = '';
  switch (block.type) {
    case 'heading':
      contentHtml = '<input type="text" value="'+escapeHtml(block.content)+'" onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;font-size:1.8rem;font-weight:700;background:transparent;border:none;color:var(--white);outline:none;"/>';
      break;
    case 'subheading':
      contentHtml = '<input type="text" value="'+escapeHtml(block.content)+'" onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;font-size:1.3rem;font-weight:600;background:transparent;border:none;color:var(--off);outline:none;"/>';
      break;
    case 'paragraph':
      contentHtml = '<textarea onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;min-height:80px;background:transparent;border:none;color:var(--off);outline:none;resize:vertical;line-height:1.6;">'+escapeHtml(block.content)+'</textarea>';
      break;
    case 'quote':
      contentHtml = '<div style="border-left:3px solid var(--gold);padding-left:15px;">'
        + '<textarea onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;min-height:60px;background:transparent;border:none;color:var(--muted);outline:none;resize:vertical;font-style:italic;">'+escapeHtml(block.content)+'</textarea>'
        + '<input type="text" value="'+escapeHtml(block.citation||'')+'" onchange="updateBlockProperty('+index+',\'citation\',this.value)" placeholder="— Author" style="margin-top:8px;width:100%;background:transparent;border:none;color:var(--muted2);outline:none;font-size:.85rem;"/>'
        + '</div>';
      break;
    case 'ctaBlock':
      const ctaBg = block.backgroundColor || 'var(--gold-dim)';
      contentHtml = '<div style="background:'+ctaBg+';padding:20px;border-radius:6px;text-align:center;">'
        + '<input type="text" value="'+escapeHtml(block.content)+'" onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;font-size:1.2rem;font-weight:600;background:transparent;border:none;color:var(--white);outline:none;text-align:center;margin-bottom:10px;"/>'
        + '<div style="display:flex;gap:10px;justify-content:center;align-items:center;">'
        + '<input type="text" value="'+escapeHtml(block.ctaText||'Learn More')+'" onchange="updateBlockProperty('+index+',\'ctaText\',this.value)" style="flex:1;max-width:150px;background:transparent;border:1px solid var(--border);color:var(--white);padding:6px 12px;border-radius:3px;outline:none;"/>'
        + '<input type="text" value="'+escapeHtml(block.ctaLink||'#')+'" onchange="updateBlockProperty('+index+',\'ctaLink\',this.value)" placeholder="CTA Link" style="flex:2;max-width:250px;background:transparent;border:1px solid var(--border);color:var(--white);padding:6px 12px;border-radius:3px;outline:none;font-family:monospace;"/>'
        + '</div></div>';
      break;
    case 'image':
      if (block.url) {
        contentHtml = '<img src="'+escapeHtml(block.url)+'" alt="'+escapeHtml(block.alt||'')+'" style="max-width:100%;border-radius:4px;"/>'
          + (block.caption ? '<p style="text-align:center;color:var(--muted2);font-size:.8rem;margin-top:8px;">'+escapeHtml(block.caption)+'</p>' : '');
      } else {
        contentHtml = '<div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">'
          + '<p style="color:var(--muted2);">Add an image URL</p>'
          + '<input type="text" onchange="updateBlockProperty('+index+',\'url\',this.value)" placeholder="Image URL" style="margin-top:10px;width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;"/>'
          + '<input type="text" onchange="updateBlockProperty('+index+',\'alt\',this.value)" placeholder="Alt text" style="margin-top:8px;width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;"/>'
          + '</div>';
      }
      break;
    case 'affiliateGif': case 'affiliateBanner':
      const asset = affiliateAssets.find(a => a.id === block.assetId);
      if (asset) {
        const lw = asset.affiliate_link ? '<a href="'+escapeHtml(asset.affiliate_link)+'" target="_blank" rel="nofollow sponsored">' : '';
        const le = asset.affiliate_link ? '</a>' : '';
        contentHtml = lw + '<img src="'+escapeHtml(asset.url)+'" alt="'+escapeHtml(asset.name)+'" style="max-width:100%;border-radius:4px;"/>' + le
          + '<p style="text-align:center;color:var(--muted2);font-size:.75rem;margin-top:8px;">'+asset.type.toUpperCase()+': '+escapeHtml(asset.name)+'</p>';
      } else {
        contentHtml = '<div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">'
          + '<p style="color:var(--muted2);margin-bottom:10px;">No asset selected</p>'
          + '<select onchange="updateBlockProperty('+index+',\'assetId\',this.value)" style="width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;">'
          + '<option value="">Select an asset…</option>'
          + affiliateAssets.map(a => '<option value="'+a.id+'">'+escapeHtml(a.name)+'</option>').join('')
          + '</select></div>';
      }
      break;
    case 'divider':
      contentHtml = '<hr style="border:none;border-top:1px '+(block.style||'solid')+' var(--border);margin:20px 0;"/>';
      break;
    case 'html':
      contentHtml = '<textarea onchange="updateBlock('+index+',\'content\',this.value)" style="width:100%;min-height:100px;background:var(--surface);border:1px solid var(--border);color:var(--off);outline:none;resize:vertical;font-family:monospace;font-size:.85rem;padding:10px;">'+escapeHtml(block.content)+'</textarea>'
        + '<p style="font-size:.7rem;color:var(--muted2);margin-top:5px;">Custom HTML block</p>';
      break;
  }
  div.innerHTML += contentHtml;
  return div;
}

function updateBlock(i,p,v){ if(currentBlocks[i]){currentBlocks[i][p]=v; renderBlocks();} }
function updateBlockProperty(i,p,v){ if(currentBlocks[i]){currentBlocks[i][p]=v; renderBlocks();} }
function moveBlockUp(i){ if(i===0)return; [currentBlocks[i-1],currentBlocks[i]]=[currentBlocks[i],currentBlocks[i-1]]; renderBlocks(); }
function moveBlockDown(i){ if(i===currentBlocks.length-1)return; [currentBlocks[i],currentBlocks[i+1]]=[currentBlocks[i+1],currentBlocks[i]]; renderBlocks(); }
function duplicateBlock(i){ const d={...currentBlocks[i],id:'block_'+Date.now()}; currentBlocks.splice(i+1,0,d); renderBlocks(); }
function deleteBlock(i){ if(confirm('Delete this block?')){ currentBlocks.splice(i,1); renderBlocks(); if(!currentBlocks.length){const p=document.getElementById('addBlockPrompt'); if(p)p.style.display='flex';} } }

// ── COVER IMAGE (upload to storage + save) ──────────────────
async function handleCoverImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please select an image file', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const ci = document.getElementById('coverImageActual');
    if (ci) { ci.src = e.target.result; ci.style.display='block'; }
    const ph = document.getElementById('coverImagePlaceholder'); if (ph) ph.style.display='none';
    const rb = document.getElementById('removeCoverBtn'); if (rb) rb.style.display='block';
  };
  reader.readAsDataURL(file);
  showSpinner('Uploading cover image…');
  try {
    const fileName = 'cover_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const { error: upErr } = await db.storage.from('articles').upload('covers/' + fileName, file, { upsert:true });
    if (upErr) throw upErr;
    const { data: { publicUrl } } = db.storage.from('articles').getPublicUrl('covers/' + fileName);
    pendingCoverUrl = publicUrl; coverRemoved = false;
  } catch (err) {
    console.error('Cover upload error:', err);
    toast('Cover preview shown, but upload failed: ' + (err.message || err), 'error');
  } finally { hideSpinner(); }
}

function removeCoverImage() {
  const inp = document.getElementById('coverImageInput'); if (inp) inp.value='';
  const ci = document.getElementById('coverImageActual'); if (ci){ ci.src=''; ci.style.display='none'; }
  const ph = document.getElementById('coverImagePlaceholder'); if (ph) ph.style.display='flex';
  const rb = document.getElementById('removeCoverBtn'); if (rb) rb.style.display='none';
  pendingCoverUrl = null; coverRemoved = true;
}

// ── AFFILIATE ASSETS ────────────────────────────────────────
async function loadAffiliateAssets() {
  try {
    const { data, error } = await db.from('affiliate_assets').select('*').order('created_at',{ascending:false});
    if (error) throw error;
    affiliateAssets = data || [];
    renderAffiliateAssetsGrid();
  } catch (err) { console.error('Error loading affiliate assets:', err); }
}

function renderAffiliateAssetsGrid() {
  const grid = document.getElementById('affiliateAssetsGrid');
  if (!grid) return;
  if (!affiliateAssets.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted2);font-size:.8rem;">No assets yet. Upload your first GIF or banner!</p>';
    return;
  }
  grid.innerHTML = affiliateAssets.map(asset =>
    '<div style="position:relative;background:var(--surface2);border-radius:4px;overflow:hidden;cursor:pointer;" onclick="insertAssetInEditor(\''+asset.id+'\')">'
    + '<img src="'+escapeHtml(asset.url)+'" alt="'+escapeHtml(asset.name)+'" style="width:100%;height:80px;object-fit:cover;"/>'
    + '<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);padding:4px 6px;">'
    + '<div style="font-size:.65rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+escapeHtml(asset.name)+'</div>'
    + '<div style="font-size:.6rem;color:#bbb;text-transform:uppercase;">'+asset.type+'</div>'
    + '</div>'
    + '<button onclick="event.stopPropagation();deleteAffiliateAsset(\''+asset.id+'\')" style="position:absolute;top:4px;right:4px;background:rgba(224,73,95,.9);border:none;color:#fff;border-radius:50%;width:20px;height:20px;font-size:.7rem;cursor:pointer;">×</button>'
    + '</div>'
  ).join('');
}

async function handleAffiliateAssetUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const affiliateLink = (document.getElementById('newAssetAffiliateLink')?.value || '').trim();
  if (!file.type.startsWith('image/')) { toast('Please select an image file', 'error'); return; }
  let type = 'gif';
  if (/\.(png|jpe?g)$/i.test(file.name)) type = 'banner';
  const fileName = 'asset_' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  showSpinner('Uploading asset…');
  try {
    const { error: upErr } = await db.storage.from('articles').upload('affiliate/' + fileName, file, { upsert:true });
    if (upErr) throw upErr;
    const { data: { publicUrl } } = db.storage.from('articles').getPublicUrl('affiliate/' + fileName);
    const { error: insErr } = await db.from('affiliate_assets').insert({
      name: file.name.replace(/\.[^/.]+$/, ''), url: publicUrl, type, affiliate_link: affiliateLink || null
    });
    if (insErr) throw insErr;
    const ai = document.getElementById('affiliateAssetInput'); if (ai) ai.value='';
    const al = document.getElementById('newAssetAffiliateLink'); if (al) al.value='';
    await loadAffiliateAssets();
    hideSpinner();
    toast('Asset uploaded successfully!', 'success');
  } catch (err) {
    hideSpinner(); console.error('Error uploading asset:', err);
    toast('Failed to upload asset: ' + (err.message || err), 'error');
  }
}

function insertAssetInEditor(assetId) {
  const asset = affiliateAssets.find(a => a.id === assetId);
  if (!asset) return;
  addBlock(asset.type === 'gif' ? 'affiliateGif' : 'affiliateBanner', { assetId });
  switchEditorPanel('settings');
}

async function deleteAffiliateAsset(assetId) {
  if (!confirm('Delete this asset? Existing uses in articles will remain.')) return;
  showSpinner('Deleting asset…');
  try {
    const { error } = await db.from('affiliate_assets').delete().eq('id', assetId);
    if (error) throw error;
    await loadAffiliateAssets();
  } catch (err) { console.error(err); toast('Failed to delete asset: ' + (err.message||err), 'error'); }
  finally { hideSpinner(); }
}

// ── PREVIEW + HTML GEN ──────────────────────────────────────
function previewArticle() {
  const title = document.getElementById('editArticleTitle')?.value || '';
  const excerpt =  document.getElementById('editArticleExcerpt')?.value || '';
  const coverImage = pendingCoverUrl || document.getElementById('coverImageActual')?.src || '';
  const htmlContent = generateHtmlFromBlocks();
  const w = window.open('', '_blank');
  w.document.write('<!DOCTYPE html><html><head><title>'+escapeHtml(title)+' - Preview</title><style>'
    + 'body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:40px 20px;background:#0b0d12;color:#d4d8e0;}'
    + 'h1{font-size:2.5rem;margin-bottom:10px;color:#f4f5f7;}.excerpt{color:#8a93a6;font-style:italic;margin-bottom:30px;}'
    + '.cover-image{width:100%;height:300px;object-fit:cover;border-radius:8px;margin-bottom:30px;}'
    + '.content{line-height:1.8;}img{max-width:100%;border-radius:4px;}hr{border:none;border-top:1px solid #262b38;margin:30px 0;}'
    + '</style></head><body>'
    + (coverImage ? '<img src="'+coverImage+'" class="cover-image"/>' : '')
    + '<h1>'+escapeHtml(title)+'</h1>'
    + (excerpt ? '<p class="excerpt">'+escapeHtml(excerpt)+'</p>' : '')
    + '<div class="content">'+htmlContent+'</div></body></html>');
  w.document.close();
}

function generateHtmlFromBlocks() {
  return currentBlocks.map(block => {
    switch (block.type) {
      case 'heading': return '<h1>'+block.content+'</h1>';
      case 'subheading': return '<h2>'+block.content+'</h2>';
      case 'paragraph': return '<p>'+block.content+'</p>';
      case 'quote': return '<blockquote>'+block.content+(block.citation?'<footer>— '+block.citation+'</footer>':'')+'</blockquote>';
      case 'ctaBlock': return '<div class="cta-block" style="background:'+(block.backgroundColor||'var(--gold-dim)')+';padding:20px;border-radius:6px;text-align:center;margin:20px 0;"><h3>'+block.content+'</h3><a href="'+(block.ctaLink||'#')+'" style="display:inline-block;margin-top:10px;padding:10px 20px;background:var(--gold);color:#fff;text-decoration:none;border-radius:3px;font-weight:600;">'+(block.ctaText||'Learn More')+'</a></div>';
      case 'image': return '<figure><img src="'+block.url+'" alt="'+(block.alt||'')+'"/><figcaption>'+(block.caption||'')+'</figcaption></figure>';
      case 'affiliateGif': case 'affiliateBanner': {
        const asset = affiliateAssets.find(a => a.id === block.assetId);
        if (!asset) return '';
        const lw = asset.affiliate_link ? '<a href="'+asset.affiliate_link+'" target="_blank" rel="nofollow sponsored">' : '';
        const le = asset.affiliate_link ? '</a>' : '';
        return lw + '<img src="'+asset.url+'" alt="'+asset.name+'"/>' + le;
      }
      case 'divider': return '<hr/>';
      case 'html': return block.content;
      default: return '';
    }
  }).join('\n');
}

// ── SAVE / DELETE ───────────────────────────────────────────
async function saveArticleFromEditor() {
  const title = document.getElementById('editArticleTitle').value.trim();
  const slug = document.getElementById('editArticleSlug').value.trim().toLowerCase().replace(/[^a-z0-9-]/g,'-');
  const excerpt = document.getElementById('editArticleExcerpt').value.trim();
  if (!title) { toast('Please enter a title', 'error'); return; }
  if (!slug) { toast('Please enter a slug', 'error'); return; }
  if (!excerpt) { toast('Please enter an excerpt', 'error'); return; }
  if (!currentBlocks.length) { toast('Please add at least one content block', 'error'); return; }
  const seoDesc = document.getElementById('editArticleSeoDesc').value.trim();
  const author = document.getElementById('editArticleAuthor').value.trim();
  const published = document.getElementById('editArticlePublished').checked;
  let coverUrl = null;
  if (coverRemoved) coverUrl = null;
  else if (pendingCoverUrl) coverUrl = pendingCoverUrl;
  else if (currentEditingArticle) coverUrl = currentEditingArticle.cover_image_url || null;
  
  const htmlContent = generateHtmlFromBlocks();
  const articleData = {
    title, slug, excerpt,
    content_blocks: currentBlocks,
    content: htmlContent,
    body: htmlContent, // Ensure public page reads the content
    cover_image_url: coverUrl,
    seo_description: seoDesc || null,
    author: author || null,
    published,
    updated_at: new Date().toISOString()
  };
  showSpinner('Saving article…');
  try {
    if (currentEditingArticle && currentEditingArticle.id && currentEditingArticle.id !== 'new') {
      const { error } = await db.from('articles').update(articleData).eq('id', currentEditingArticle.id);
      if (error) throw error;
    } else {
      articleData.created_at = new Date().toISOString();
      const { error } = await db.from('articles').insert([articleData]);
      if (error) throw error;
    }
    hideSpinner();
    toast('Article saved successfully!', 'success');
    if (typeof loadArticlesFromDb === 'function') loadArticlesFromDb();
    
    // Update URL if it was a new article
    if (!currentEditingArticle || currentEditingArticle.id === 'new') {
       currentEditingArticle = { slug: slug, id: 'new', title: title }; 
       history.replaceState(null, '', '/editor/' + slug);
       document.getElementById('articleEditorTitle').textContent = 'Edit Article';
    }
  } catch (err) {
    hideSpinner(); console.error('Error saving article:', err);
    toast('Failed to save article: ' + (err.message || err), 'error');
  }
}

async function deleteCurrentArticle() {
  if (!currentEditingArticle || !currentEditingArticle.id || currentEditingArticle.id === 'new') { toast('No article selected for deletion', 'error'); return; }
  if (!confirm('Delete "'+currentEditingArticle.title+'"? This cannot be undone.')) return;
  showSpinner('Deleting article…');
  try {
    const { error } = await db.from('articles').delete().eq('id', currentEditingArticle.id);
    if (error) throw error;
    hideSpinner();
    toast('Article deleted successfully', 'success');
    if (typeof loadArticlesFromDb === 'function') loadArticlesFromDb();
    closeArticleEditor();
  } catch (err) {
    hideSpinner(); console.error(err); toast('Failed to delete article: ' + (err.message||err), 'error');
  }
}

// ── TOAST NOTIFICATION SYSTEM ─────────────────────────
function toast(message, type = 'info', title = '') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.innerHTML = '<button class="toast-close" onclick="this.parentElement.remove()">×</button>'
    + (title ? '<div class="toast-title">' + escapeHtml(title) + '</div>' : '')
    + '<div class="toast-msg">' + escapeHtml(message) + '</div>';
  container.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  const duration = type === 'error' ? 6000 : 3500;
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 350);
  }, duration);
}

// ── UTIL ────────────────────────────────────────────────────
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
