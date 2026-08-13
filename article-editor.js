// Block-Style Article Editor with Affiliate Tools
// For Butterfly Dynamix Admin Panel

// Global state for current article being edited
let currentEditingArticle = null;
let currentBlocks = [];
let affiliateAssets = [];

// Initialize editor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Load affiliate assets if on admin page
  if (document.getElementById('articleEditorOverlay')) {
    loadAffiliateAssets();
  }
});

/**
 * Open the article editor for a specific article or create new
 */
async function openArticleEditor(articleSlug = null) {
  const overlay = document.getElementById('articleEditorOverlay');
  if (!overlay) return;
  
  // Reset form
  document.getElementById('editArticleTitle').value = '';
  document.getElementById('editArticleSlug').value = '';
  document.getElementById('editArticleExcerpt').value = '';
  document.getElementById('editArticleSeoDesc').value = '';
  document.getElementById('editArticleAuthor').value = '';
  document.getElementById('editArticlePublished').checked = true;
  document.getElementById('coverImageActual').style.display = 'none';
  document.getElementById('coverImagePlaceholder').style.display = 'block';
  document.getElementById('removeCoverBtn').style.display = 'none';
  document.getElementById('coverImageActual').src = '';
  
  currentBlocks = [];
  currentEditingArticle = null;
  
  if (articleSlug) {
    // Load existing article
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .single();
      
      if (error) throw error;
      
      currentEditingArticle = data;
      document.getElementById('articleEditorTitle').textContent = 'Edit Article';
      
      // Populate fields
      document.getElementById('editArticleTitle').value = data.title || '';
      document.getElementById('editArticleSlug').value = data.slug || '';
      document.getElementById('editArticleExcerpt').value = data.excerpt || '';
      document.getElementById('editArticleSeoDesc').value = data.seo_description || '';
      document.getElementById('editArticleAuthor').value = data.author || '';
      document.getElementById('editArticlePublished').checked = data.published !== false;
      
      // Load cover image if exists
      if (data.cover_image_url) {
        document.getElementById('coverImageActual').src = data.cover_image_url;
        document.getElementById('coverImageActual').style.display = 'block';
        document.getElementById('coverImagePlaceholder').style.display = 'none';
        document.getElementById('removeCoverBtn').style.display = 'block';
      }
      
      // Load blocks or migrate from old content
      if (data.content_blocks && Array.isArray(data.content_blocks)) {
        currentBlocks = data.content_blocks;
      } else if (data.content) {
        // Migrate old HTML content to a single block
        currentBlocks = [{ type: 'html', content: data.content }];
      }
      
      renderBlocks();
      
    } catch (err) {
      console.error('Error loading article:', err);
      alert('Failed to load article. Please try again.');
    }
  } else {
    // New article
    document.getElementById('articleEditorTitle').textContent = 'Create New Article';
    renderBlocks();
  }
  
  // Load affiliate assets
  loadAffiliateAssets();
  
  // Show overlay
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the article editor
 */
function closeArticleEditor() {
  const overlay = document.getElementById('articleEditorOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentEditingArticle = null;
  currentBlocks = [];
}

/**
 * Switch between Settings and Assets panels
 */
function switchEditorPanel(panel) {
  const settingsPanel = document.getElementById('panelSettings');
  const assetsPanel = document.getElementById('panelAssets');
  const settingsTab = document.getElementById('tabSettings');
  const assetsTab = document.getElementById('tabAssets');
  
  if (panel === 'settings') {
    settingsPanel.style.display = 'block';
    assetsPanel.style.display = 'none';
    settingsTab.style.borderBottomColor = 'var(--gold)';
    assetsTab.style.borderBottomColor = 'transparent';
  } else {
    settingsPanel.style.display = 'none';
    assetsPanel.style.display = 'block';
    settingsTab.style.borderBottomColor = 'transparent';
    assetsTab.style.borderBottomColor = 'var(--gold)';
  }
}

/**
 * Add a new block to the editor
 */
function addBlock(type, data = {}) {
  const newBlock = {
    id: 'block_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    type: type,
    content: '',
    ...data
  };
  
  // Set default content based on type
  switch(type) {
    case 'heading':
      newBlock.content = 'New Heading';
      break;
    case 'subheading':
      newBlock.content = 'New Subheading';
      break;
    case 'paragraph':
      newBlock.content = 'Start writing your paragraph here...';
      break;
    case 'quote':
      newBlock.content = 'Enter quote text...';
      newBlock.citation = '';
      break;
    case 'ctaBlock':
      newBlock.content = 'Special Offer!';
      newBlock.ctaText = 'Learn More';
      newBlock.ctaLink = '#';
      newBlock.backgroundColor = 'var(--gold-dim)';
      break;
    case 'image':
      newBlock.url = '';
      newBlock.alt = '';
      newBlock.caption = '';
      break;
    case 'affiliateGif':
    case 'affiliateBanner':
      newBlock.assetId = '';
      newBlock.align = 'center';
      break;
    case 'divider':
      newBlock.style = 'solid';
      break;
    case 'html':
      newBlock.content = '<p>Your custom HTML here</p>';
      break;
  }
  
  currentBlocks.push(newBlock);
  renderBlocks();
  hideAddBlockPrompt();
}

/**
 * Hide the "Add Block" prompt
 */
function hideAddBlockPrompt() {
  const prompt = document.getElementById('addBlockPrompt');
  if (prompt) prompt.style.display = 'none';
}

/**
 * Show block picker (for future enhancement)
 */
function showBlockPicker() {
  // For now, just add a paragraph by default
  addBlock('paragraph');
}

/**
 * Render all blocks in the canvas
 */
function renderBlocks() {
  const container = document.getElementById('blocksContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  currentBlocks.forEach((block, index) => {
    const blockEl = createBlockElement(block, index);
    container.appendChild(blockEl);
  });
  
  if (currentBlocks.length === 0) {
    document.getElementById('addBlockPrompt').style.display = 'block';
  } else {
    document.getElementById('addBlockPrompt').style.display = 'none';
  }
}

/**
 * Create DOM element for a single block
 */
function createBlockElement(block, index) {
  const div = document.createElement('div');
  div.className = 'editor-block';
  div.dataset.blockId = block.id;
  div.style.cssText = 'position:relative;padding:15px;margin-bottom:15px;background:var(--surface);border-radius:6px;border:1px solid transparent;transition:all 0.2s;';
  div.onmouseenter = () => div.style.borderColor = 'var(--border2)';
  div.onmouseleave = () => div.style.borderColor = 'transparent';
  
  // Block controls
  const controls = document.createElement('div');
  controls.style.cssText = 'position:absolute;top:-10px;right:10px;display:flex;gap:5px;opacity:0;transition:opacity 0.2s;';
  controls.innerHTML = `
    <button class="btn btn-ghost" onclick="moveBlockUp(${index})" style="padding:4px 8px;font-size:0.7rem;" title="Move Up">↑</button>
    <button class="btn btn-ghost" onclick="moveBlockDown(${index})" style="padding:4px 8px;font-size:0.7rem;" title="Move Down">↓</button>
    <button class="btn btn-ghost" onclick="duplicateBlock(${index})" style="padding:4px 8px;font-size:0.7rem;" title="Duplicate">⧉</button>
    <button class="btn btn-ghost" onclick="deleteBlock(${index})" style="padding:4px 8px;font-size:0.7rem;color:var(--red);" title="Delete">🗑</button>
  `;
  div.onmouseenter = () => { 
    div.style.borderColor = 'var(--border2)';
    controls.style.opacity = '1';
  };
  div.onmouseleave = () => { 
    div.style.borderColor = 'transparent';
    controls.style.opacity = '0';
  };
  div.appendChild(controls);
  
  // Block content based on type
  let contentHtml = '';
  
  switch(block.type) {
    case 'heading':
      contentHtml = `
        <input type="text" value="${escapeHtml(block.content)}" 
          onchange="updateBlock(${index}, 'content', this.value)"
          style="width:100%;font-size:1.8rem;font-weight:700;background:transparent;border:none;color:var(--white);outline:none;"/>
      `;
      break;
      
    case 'subheading':
      contentHtml = `
        <input type="text" value="${escapeHtml(block.content)}" 
          onchange="updateBlock(${index}, 'content', this.value)"
          style="width:100%;font-size:1.3rem;font-weight:600;background:transparent;border:none;color:var(--off);outline:none;"/>
      `;
      break;
      
    case 'paragraph':
      contentHtml = `
        <textarea onchange="updateBlock(${index}, 'content', this.value)"
          style="width:100%;min-height:80px;background:transparent;border:none;color:var(--off);outline:none;resize:vertical;line-height:1.6;">${escapeHtml(block.content)}</textarea>
      `;
      break;
      
    case 'quote':
      contentHtml = `
        <div style="border-left:3px solid var(--gold);padding-left:15px;">
          <textarea onchange="updateBlock(${index}, 'content', this.value)"
            style="width:100%;min-height:60px;background:transparent;border:none;color:var(--muted);outline:none;resize:vertical;font-style:italic;">${escapeHtml(block.content)}</textarea>
          <input type="text" value="${escapeHtml(block.citation || '')}" 
            onchange="updateBlockProperty(${index}, 'citation', this.value)"
            placeholder="— Author"
            style="margin-top:8px;width:100%;background:transparent;border:none;color:var(--muted2);outline:none;font-size:0.85rem;"/>
        </div>
      `;
      break;
      
    case 'ctaBlock':
      const ctaBg = block.backgroundColor || 'var(--gold-dim)';
      contentHtml = `
        <div style="background:${ctaBg};padding:20px;border-radius:6px;text-align:center;">
          <input type="text" value="${escapeHtml(block.content)}" 
            onchange="updateBlock(${index}, 'content', this.value)"
            style="width:100%;font-size:1.2rem;font-weight:600;background:transparent;border:none;color:var(--white);outline:none;text-align:center;margin-bottom:10px;"/>
          <div style="display:flex;gap:10px;justify-content:center;align-items:center;">
            <input type="text" value="${escapeHtml(block.ctaText || 'Learn More')}" 
              onchange="updateBlockProperty(${index}, 'ctaText', this.value)"
              style="flex:1;max-width:150px;background:transparent;border:1px solid var(--border);color:var(--white);padding:6px 12px;border-radius:3px;outline:none;"/>
            <input type="text" value="${escapeHtml(block.ctaLink || '#')}" 
              onchange="updateBlockProperty(${index}, 'ctaLink', this.value)"
              placeholder="CTA Link"
              style="flex:2;max-width:250px;background:transparent;border:1px solid var(--border);color:var(--white);padding:6px 12px;border-radius:3px;outline:none;font-family:monospace;"/>
          </div>
        </div>
      `;
      break;
      
    case 'image':
      if (block.url) {
        contentHtml = `
          <img src="${escapeHtml(block.url)}" alt="${escapeHtml(block.alt || '')}" style="max-width:100%;border-radius:4px;"/>
          ${block.caption ? `<p style="text-align:center;color:var(--muted2);font-size:0.8rem;margin-top:8px;">${escapeHtml(block.caption)}</p>` : ''}
        `;
      } else {
        contentHtml = `
          <div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">
            <p style="color:var(--muted2);">Click edit to add image URL</p>
            <input type="text" value="" onchange="updateBlockProperty(${index}, 'url', this.value)" placeholder="Image URL" style="margin-top:10px;width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;"/>
            <input type="text" value="" onchange="updateBlockProperty(${index}, 'alt', this.value)" placeholder="Alt text" style="margin-top:8px;width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;"/>
          </div>
        `;
      }
      break;
      
    case 'affiliateGif':
    case 'affiliateBanner':
      const asset = affiliateAssets.find(a => a.id === block.assetId);
      if (asset) {
        const linkWrap = asset.affiliate_link ? `<a href="${escapeHtml(asset.affiliate_link)}" target="_blank" rel="nofollow sponsored">` : '';
        const linkEnd = asset.affiliate_link ? '</a>' : '';
        contentHtml = `
          ${linkWrap}<img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" style="max-width:100%;border-radius:4px;"/>${linkEnd}
          <p style="text-align:center;color:var(--muted2);font-size:0.75rem;margin-top:8px;">${asset.type.toUpperCase()}: ${escapeHtml(asset.name)}</p>
        `;
      } else {
        contentHtml = `
          <div style="text-align:center;padding:30px;background:var(--surface2);border-radius:4px;">
            <p style="color:var(--muted2);margin-bottom:10px;">No asset selected</p>
            <select onchange="updateBlockProperty(${index}, 'assetId', this.value)" style="width:100%;background:var(--surface);border:1px solid var(--border);color:var(--white);padding:8px;border-radius:3px;">
              <option value="">Select an asset...</option>
              ${affiliateAssets.map(a => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join('')}
            </select>
          </div>
        `;
      }
      break;
      
    case 'divider':
      contentHtml = `<hr style="border:none;border-top:1px ${block.style || 'solid'} var(--border);margin:20px 0;"/>`;
      break;
      
    case 'html':
      contentHtml = `
        <textarea onchange="updateBlock(${index}, 'content', this.value)"
          style="width:100%;min-height:100px;background:var(--surface);border:1px solid var(--border);color:var(--off);outline:none;resize:vertical;font-family:monospace;font-size:0.85rem;padding:10px;">${escapeHtml(block.content)}</textarea>
        <p style="font-size:0.7rem;color:var(--muted2);margin-top:5px;">Custom HTML block</p>
      `;
      break;
  }
  
  div.innerHTML += contentHtml;
  return div;
}

/**
 * Update block content
 */
function updateBlock(index, property, value) {
  currentBlocks[index][property] = value;
  renderBlocks();
}

/**
 * Update block property (for complex blocks)
 */
function updateBlockProperty(index, property, value) {
  if (!currentBlocks[index]) return;
  currentBlocks[index][property] = value;
  renderBlocks();
}

/**
 * Move block up
 */
function moveBlockUp(index) {
  if (index === 0) return;
  [currentBlocks[index - 1], currentBlocks[index]] = [currentBlocks[index], currentBlocks[index - 1]];
  renderBlocks();
}

/**
 * Move block down
 */
function moveBlockDown(index) {
  if (index === currentBlocks.length - 1) return;
  [currentBlocks[index], currentBlocks[index + 1]] = [currentBlocks[index + 1], currentBlocks[index]];
  renderBlocks();
}

/**
 * Duplicate block
 */
function duplicateBlock(index) {
  const duplicate = { ...currentBlocks[index], id: 'block_' + Date.now() };
  currentBlocks.splice(index + 1, 0, duplicate);
  renderBlocks();
}

/**
 * Delete block
 */
function deleteBlock(index) {
  if (confirm('Delete this block?')) {
    currentBlocks.splice(index, 1);
    renderBlocks();
    if (currentBlocks.length === 0) {
      document.getElementById('addBlockPrompt').style.display = 'block';
    }
  }
}

/**
 * Handle cover image upload
 */
async function handleCoverImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }
  
  // Show preview
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('coverImageActual').src = e.target.result;
    document.getElementById('coverImageActual').style.display = 'block';
    document.getElementById('coverImagePlaceholder').style.display = 'none';
    document.getElementById('removeCoverBtn').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

/**
 * Remove cover image
 */
function removeCoverImage() {
  document.getElementById('coverImageInput').value = '';
  document.getElementById('coverImageActual').src = '';
  document.getElementById('coverImageActual').style.display = 'none';
  document.getElementById('coverImagePlaceholder').style.display = 'block';
  document.getElementById('removeCoverBtn').style.display = 'none';
}

/**
 * Load affiliate assets from database
 */
async function loadAffiliateAssets() {
  try {
    const { data, error } = await supabase
      .from('affiliate_assets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    affiliateAssets = data || [];
    renderAffiliateAssetsGrid();
    
  } catch (err) {
    console.error('Error loading affiliate assets:', err);
  }
}

/**
 * Render affiliate assets grid
 */
function renderAffiliateAssetsGrid() {
  const grid = document.getElementById('affiliateAssetsGrid');
  if (!grid) return;
  
  if (affiliateAssets.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted2);font-size:0.8rem;">No assets yet. Upload your first GIF or banner!</p>';
    return;
  }
  
  grid.innerHTML = affiliateAssets.map(asset => `
    <div style="position:relative;background:var(--surface2);border-radius:4px;overflow:hidden;cursor:pointer;" onclick="insertAssetInEditor('${asset.id}')">
      <img src="${escapeHtml(asset.url)}" alt="${escapeHtml(asset.name)}" style="width:100%;height:80px;object-fit:cover;"/>
      <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.7);padding:4px 6px;">
        <div style="font-size:0.65rem;color:var(--white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(asset.name)}</div>
        <div style="font-size:0.6rem;color:var(--muted2);text-transform:uppercase;">${asset.type}</div>
      </div>
      <button onclick="event.stopPropagation();deleteAffiliateAsset('${asset.id}')" style="position:absolute;top:4px;right:4px;background:rgba(224,73,95,0.9);border:none;color:white;border-radius:50%;width:20px;height:20px;font-size:0.7rem;cursor:pointer;">×</button>
    </div>
  `).join('');
}

/**
 * Handle affiliate asset upload
 */
async function handleAffiliateAssetUpload(input) {
  const file = input.files[0];
  if (!file) return;
  
  const affiliateLink = document.getElementById('newAssetAffiliateLink').value.trim();
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file');
    return;
  }
  
  // Determine type
  let type = 'gif';
  if (file.name.toLowerCase().endsWith('.png') || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
    type = 'banner';
  }
  
  // Upload to Supabase Storage
  const fileName = `asset_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('articles')
      .upload(`affiliate/${fileName}`, file, { upsert: true });
    
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('articles')
      .getPublicUrl(`affiliate/${fileName}`);
    
    // Insert record
    const { error: insertError } = await supabase
      .from('affiliate_assets')
      .insert({
        name: file.name.replace(/\.[^/.]+$/, ''),
        url: publicUrl,
        type: type,
        affiliate_link: affiliateLink || null
      });
    
    if (insertError) throw insertError;
    
    // Clear input and reload
    document.getElementById('affiliateAssetInput').value = '';
    document.getElementById('newAssetAffiliateLink').value = '';
    loadAffiliateAssets();
    alert('Asset uploaded successfully!');
    
  } catch (err) {
    console.error('Error uploading asset:', err);
    alert('Failed to upload asset. Please try again.');
  }
}

/**
 * Insert asset into editor at current position
 */
function insertAssetInEditor(assetId) {
  const asset = affiliateAssets.find(a => a.id === assetId);
  if (!asset) return;
  
  const blockType = asset.type === 'gif' ? 'affiliateGif' : 'affiliateBanner';
  addBlock(blockType, { assetId: assetId });
  
  // Switch to content panel
  switchEditorPanel('settings');
}

/**
 * Delete affiliate asset
 */
async function deleteAffiliateAsset(assetId) {
  if (!confirm('Delete this asset? This will remove it from the library but existing uses in articles will remain.')) return;
  
  try {
    const { error } = await supabase
      .from('affiliate_assets')
      .delete()
      .eq('id', assetId);
    
    if (error) throw error;
    
    loadAffiliateAssets();
    
  } catch (err) {
    console.error('Error deleting asset:', err);
    alert('Failed to delete asset.');
  }
}

/**
 * Preview article
 */
function previewArticle() {
  const title = document.getElementById('editArticleTitle').value;
  const excerpt = document.getElementById('editArticleExcerpt').value;
  const coverImage = document.getElementById('coverImageActual').src;
  
  // Generate HTML from blocks
  const htmlContent = generateHtmlFromBlocks();
  
  // Create preview window
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(title)} - Preview</title>
      <style>
        body { font-family: 'Lora', Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; background: #0b0d12; color: #d4d8e0; }
        h1 { font-size: 2.5rem; margin-bottom: 10px; color: #f4f5f7; }
        .excerpt { color: #8a93a6; font-style: italic; margin-bottom: 30px; }
        .cover-image { width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 30px; }
        .content { line-height: 1.8; }
        .cta-block { background: rgba(201,168,76,0.1); padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
        blockquote { border-left: 3px solid #c9a84c; padding-left: 15px; font-style: italic; color: #8a93a6; }
        img { max-width: 100%; border-radius: 4px; }
        hr { border: none; border-top: 1px solid #262b38; margin: 30px 0; }
      </style>
    </head>
    <body>
      ${coverImage ? `<img src="${coverImage}" class="cover-image"/>` : ''}
      <h1>${escapeHtml(title)}</h1>
      ${excerpt ? `<p class="excerpt">${escapeHtml(excerpt)}</p>` : ''}
      <div class="content">${htmlContent}</div>
    </body>
    </html>
  `);
  previewWindow.document.close();
}

/**
 * Generate HTML from blocks for saving/preview
 */
function generateHtmlFromBlocks() {
  return currentBlocks.map(block => {
    switch(block.type) {
      case 'heading':
        return `<h1>${block.content}</h1>`;
      case 'subheading':
        return `<h2>${block.content}</h2>`;
      case 'paragraph':
        return `<p>${block.content}</p>`;
      case 'quote':
        return `<blockquote>${block.content}${block.citation ? `<footer>— ${block.citation}</footer>` : ''}</blockquote>`;
      case 'ctaBlock':
        return `<div class="cta-block" style="background:${block.backgroundColor || 'var(--gold-dim)'};"><h3>${block.content}</h3><a href="${block.ctaLink || '#'}" style="display:inline-block;margin-top:10px;padding:10px 20px;background:var(--gold);color:var(--accent-on);text-decoration:none;border-radius:3px;font-weight:600;">${block.ctaText || 'Learn More'}</a></div>`;
      case 'image':
        return `<figure><img src="${block.url}" alt="${block.alt || ''}"/><figcaption>${block.caption || ''}</figcaption></figure>`;
      case 'affiliateGif':
      case 'affiliateBanner':
        const asset = affiliateAssets.find(a => a.id === block.assetId);
        if (asset) {
          const linkWrap = asset.affiliate_link ? `<a href="${asset.affiliate_link}" target="_blank" rel="nofollow sponsored">` : '';
          const linkEnd = asset.affiliate_link ? '</a>' : '';
          return `${linkWrap}<img src="${asset.url}" alt="${asset.name}"/>${linkEnd}`;
        }
        return '';
      case 'divider':
        return `<hr/>`;
      case 'html':
        return block.content;
      default:
        return '';
    }
  }).join('\n');
}

/**
 * Save article from editor
 */
async function saveArticleFromEditor() {
  // Validate required fields
  const title = document.getElementById('editArticleTitle').value.trim();
  const slug = document.getElementById('editArticleSlug').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const excerpt = document.getElementById('editArticleExcerpt').value.trim();
  
  if (!title) {
    alert('Please enter a title');
    return;
  }
  if (!slug) {
    alert('Please enter a slug');
    return;
  }
  if (!excerpt) {
    alert('Please enter an excerpt');
    return;
  }
  if (currentBlocks.length === 0) {
    alert('Please add at least one content block');
    return;
  }
  
  // Get cover image URL (if uploaded, we need to handle this differently in production)
  const coverImageSrc = document.getElementById('coverImageActual').src;
  let coverImageUrl = null;
  
  // If it's a data URL (from local upload), we'd need to upload to storage
  // For now, we'll skip this step and you can implement storage upload
  
  const seoDesc = document.getElementById('editArticleSeoDesc').value.trim();
  const author = document.getElementById('editArticleAuthor').value.trim();
  const published = document.getElementById('editArticlePublished').checked;
  
  const articleData = {
    title,
    slug,
    excerpt,
    content_blocks: currentBlocks,
    content: generateHtmlFromBlocks(), // Keep HTML for backward compatibility
    cover_image_url: coverImageUrl,
    seo_description: seoDesc || null,
    author: author || null,
    published,
    updated_at: new Date().toISOString()
  };
  
  try {
    if (currentEditingArticle && currentEditingArticle.id) {
      // Update existing
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', currentEditingArticle.id);
      
      if (error) throw error;
      alert('Article updated successfully!');
    } else {
      // Create new
      articleData.created_at = new Date().toISOString();
      const { error } = await supabase
        .from('articles')
        .insert([articleData]);
      
      if (error) throw error;
      alert('Article created successfully!');
    }
    
    closeArticleEditor();
    // Reload articles list if on articles page
    if (typeof loadArticlesFromDb === 'function') {
      loadArticlesFromDb();
    }
    
  } catch (err) {
    console.error('Error saving article:', err);
    alert('Failed to save article. Please try again.');
  }
}

/**
 * Delete current article
 */
async function deleteCurrentArticle() {
  if (!currentEditingArticle || !currentEditingArticle.id) {
    alert('No article selected for deletion');
    return;
  }
  
  if (!confirm(`Are you sure you want to delete "${currentEditingArticle.title}"? This cannot be undone.`)) {
    return;
  }
  
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', currentEditingArticle.id);
    
    if (error) throw error;
    
    alert('Article deleted successfully');
    closeArticleEditor();
    
    // Reload articles list if on articles page
    if (typeof loadArticlesFromDb === 'function') {
      loadArticlesFromDb();
    }
    
  } catch (err) {
    console.error('Error deleting article:', err);
    alert('Failed to delete article.');
  }
}

/**
 * Utility: Escape HTML
 */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
