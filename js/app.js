import { sections } from './categories.js';
import { renderMarkdown } from './markdown-renderer.js';

// DOM Elements
const sidebarNav = document.getElementById('sidebarNav');
const mainContent = document.getElementById('mainContent');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const backToTop = document.getElementById('backToTop');

// Search keyboard state
let searchActiveIndex = -1;
let searchMatches = [];
let searchDebounce = null;

// Helper to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to escape selector query strings
function escapeSelector(str) {
  return CSS.escape(str);
}

// Category id from hash (#14) or query (?cat=14) — query form is SEO-indexable
function getCategoryId() {
  const hashId = parseInt(window.location.hash.substring(1), 10);
  if (hashId && !isNaN(hashId)) return hashId;
  try {
    const q = new URLSearchParams(window.location.search).get('cat');
    const qId = parseInt(q, 10);
    if (qId && !isNaN(qId)) return qId;
  } catch (e) { /* ignore */ }
  return null;
}

function findCategory(id) {
  for (const s of sections) {
    const cat = s.categories.find(c => c.id === id);
    if (cat) return { category: cat, section: s };
  }
  return { category: null, section: null };
}

function getSectionId() {
  const hash = window.location.hash.substring(1);
  if (hash.startsWith('section-')) {
    const n = parseInt(hash.replace('section-', ''), 10);
    if (n && !isNaN(n)) return n;
  }
  try {
    const q = new URLSearchParams(window.location.search).get('section');
    const n = parseInt(q, 10);
    if (n && !isNaN(n)) return n;
  } catch (e) { /* ignore */ }
  return null;
}

function findSection(id) {
  return sections.find(s => s.id === id) || null;
}

// Flat registry order for prev/next chapter flow
function flatCategories() {
  const out = [];
  sections.forEach(s => s.categories.forEach(c => out.push({ cat: c, sec: s })));
  return out;
}

function siblingChapters(id) {
  const flat = flatCategories();
  const i = flat.findIndex(e => e.cat.id === id);
  if (i < 0) return { prev: null, next: null };
  return { prev: flat[i - 1] || null, next: flat[i + 1] || null };
}

// Command-level entry index: parsed lazily from fetched markdown, cached
const entryIndex = new Map(); // catId -> [{text, anchor}]
let entrySearchCache = null;

function slugifyText(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

async function getEntriesFor(cat) {
  if (entryIndex.has(cat.id)) return entryIndex.get(cat.id);
  try {
    const res = await fetch(`content/${cat.file}`);
    if (!res.ok) throw new Error('fetch failed');
    const md = (await res.text()).replace(/^---\n[\s\S]*?\n---\n/, '');
    const entries = [];
    const seen = new Set();
    for (const m of md.matchAll(/^#{1,4}\s+(.+)$/gm)) {
      const raw = m[1].replace(/`([^`]+)`/g, '$1').trim();
      if (!raw) continue;
      const anchor = slugifyText(raw);
      if (!anchor || seen.has(anchor)) continue;
      seen.add(anchor);
      entries.push({ text: raw.slice(0, 80), anchor });
      if (entries.length >= 12) break;
    }
    entryIndex.set(cat.id, entries);
    return entries;
  } catch (e) {
    entryIndex.set(cat.id, []);
    return [];
  }
}

async function buildEntrySearchCache() {
  if (entrySearchCache) return entrySearchCache;
  const jobs = [];
  sections.forEach(s => s.categories.forEach(c => jobs.push(getEntriesFor(c).then(es => ({ c, s, es })))));
  const settled = await Promise.all(jobs);
  entrySearchCache = [];
  settled.forEach(({ c, s, es }) => es.forEach(e => entrySearchCache.push({ c, s, entry: e })));
  return entrySearchCache;
}

// Initialize
function init() {
  renderSidebar();
  setupEventListeners();
  loadTheme();
  handleRouting();
}

// Render Sidebar (no inline onclick — delegated toggle for CSP-friendliness)
function renderSidebar() {
  if (!sidebarNav) return;

  const activeId = getCategoryId();
  // Note: production 308-redirects .html → extensionless (/tools, /category),
  // so never treat "no dot in pathname" as home — that misfires on /tools & /category.
  const path = window.location.pathname;
  const onHome = path === '' || path.endsWith('/') || path.endsWith('index.html');
  const onTools = path.endsWith('tools.html') || path === '/tools' || path.endsWith('/tools');

  let html = `
    <a href="index.html" class="nav-item ${onHome ? 'active' : ''}">
      <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      Home Directory
    </a>
    <a href="tools.html" class="nav-item ${onTools ? 'active' : ''}">
      <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      Interactive Tools
    </a>
    <div style="margin: var(--space-sm) var(--space-lg); border-top: 1px solid var(--border-light)"></div>
  `;
  sections.forEach(section => {
    const hasActiveCategory = activeId && section.categories.some(cat => cat.id === activeId);
    const collapsedClass = hasActiveCategory ? '' : 'collapsed';
    const ariaExpanded = hasActiveCategory ? 'true' : 'false';

    html += `
      <div class="nav-section ${collapsedClass}">
        <button class="nav-section-title" data-section-toggle aria-expanded="${ariaExpanded}">
          <span>${section.title}</span>
          <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="nav-items">
    `;

    section.categories.forEach(cat => {
      html += `
        <a href="category.html#${cat.id}" class="nav-item" data-id="${cat.id}">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          ${cat.title}
        </a>
      `;
    });

    html += `</div></div>`;
  });

  sidebarNav.innerHTML = html;

  // Highlight active item
  if (activeId) {
    try {
      const activeItem = sidebarNav.querySelector(`[data-id="${escapeSelector(String(activeId))}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// Update <title>, meta description, OG/Twitter + canonical per category (SEO)
function updateCategoryMeta(category) {
  const pageUrl = `https://termtux.pages.dev/category.html?cat=${category.id}`;
  const title = `${category.title} — TermTux`;
  const desc = category.description || 'Linux command guide with one-click copy.';
  document.title = title;
  const setMeta = (sel, attr, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', 'content', desc);
  setMeta('#ogTitle', 'content', title);
  setMeta('#ogDesc', 'content', desc);
  setMeta('#ogUrl', 'content', pageUrl);
  setMeta('#twTitle', 'content', title);
  setMeta('#twDesc', 'content', desc);
  setMeta('#canonicalLink', 'href', pageUrl);
}

// Handle Routing (chapter pages + section landing pages)
async function handleRouting() {
  if (!window.location.pathname.includes('category')) return;

  const sectionId = getSectionId();
  const id = getCategoryId();

  // Section landing: category.html?section=N lists every chapter in the section
  if (!id && sectionId) {
    renderSectionLanding(findSection(sectionId));
    renderSidebar();
    return;
  }

  if (!id || isNaN(id)) {
    window.location.href = 'index.html';
    return;
  }

  const { category, section } = findCategory(id);

  if (!category) {
    document.title = 'Not found — TermTux';
    hideChapterChrome();
    if (mainContent) {
      mainContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">🔍</div>
        <h3>Category not found</h3>
        <p>The page you are looking for does not exist.</p>
        <a href="index.html" class="github-link mt-md" style="display: inline-flex;">Go home</a>
      </div>
    `;
    }
    return;
  }

  // Render breadcrumbs (section links to its chapter index)
  const bSection = document.getElementById('breadcrumbSection');
  const bCategory = document.getElementById('breadcrumbCategory');
  if (bSection) {
    bSection.innerHTML = '';
    const a = document.createElement('a');
    a.href = `category.html?section=${section.id}`;
    a.textContent = section.title;
    bSection.appendChild(a);
  }
  if (bCategory) bCategory.textContent = category.title;

  updateCategoryMeta(category);
  renderChapterNav(id, section);

  // Render tags
  const tagsContainer = document.getElementById('categoryTags');
  if (tagsContainer) {
    if (category.tags && category.tags.length > 0) {
      tagsContainer.innerHTML = category.tags.map(tag => `<span class="tag">#${escapeHTML(tag)}</span>`).join('');
      tagsContainer.style.display = 'flex';
    } else {
      tagsContainer.style.display = 'none';
    }
  }

  // Fetch and render markdown
  try {
    if (mainContent) {
      mainContent.innerHTML = `
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-line" style="width: 80%"></div>
      <div class="skeleton skeleton-line" style="width: 60%"></div>
      <div class="skeleton skeleton-block"></div>
    `;
    }
    const response = await fetch(`content/${category.file}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const md = await response.text();
    if (mainContent) {
      mainContent.innerHTML = renderMarkdown(md);
      buildOutline();
      // Prime entry cache in background for command-level search
      getEntriesFor(category);
      // Deep-link scroll: entry click or #slug URL
      let anchor = null;
      try { anchor = sessionStorage.getItem('termtux-entry-anchor'); sessionStorage.removeItem('termtux-entry-anchor'); } catch (e) { /* ignore */ }
      const frag = window.location.hash.substring(1);
      if (!anchor && frag && isNaN(parseInt(frag, 10)) && !frag.startsWith('section-')) anchor = frag;
      if (anchor) {
        const target = document.getElementById(CSS.escape ? CSS.escape(anchor) : anchor) || mainContent.querySelector(`[id="${anchor}"]`);
        if (target && target.scrollIntoView) {
          const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
    }
  } catch (error) {
    if (mainContent) {
      mainContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">⚠️</div>
        <h3>Error loading content</h3>
        <p>Could not load the commands for ${escapeHTML(category.title)}. Please check your connection.</p>
      </div>
    `;
    }
  }
}

function hideChapterChrome() {
  ['chapterBar', 'chapterFooter', 'outlineBlock'].forEach(n => {
    const el = document.getElementById(n);
    if (el) el.hidden = true;
  });
}

function renderSectionLanding(section) {
  hideChapterChrome();
  const bSection = document.getElementById('breadcrumbSection');
  const bCategory = document.getElementById('breadcrumbCategory');
  if (!section) {
    document.title = 'Section not found — TermTux';
    if (mainContent) {
      mainContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">🔍</div>
        <h3>Section not found</h3>
        <p>The chapter index you are looking for does not exist.</p>
        <a href="index.html" class="github-link mt-md" style="display: inline-flex;">Go home</a>
      </div>`;
    }
    if (bSection) bSection.textContent = 'Sections';
    if (bCategory) bCategory.textContent = 'Not found';
    return;
  }
  document.title = `${section.title} — TermTux`;
  if (bSection) bSection.textContent = 'Sections';
  if (bCategory) bCategory.textContent = section.title;
  const tagsContainer = document.getElementById('categoryTags');
  if (tagsContainer) tagsContainer.style.display = 'none';
  if (mainContent) {
    const cards = section.categories.map(c => `
      <a href="category.html#${c.id}" class="category-card">
        <div class="category-card-icon" aria-hidden="true">›</div>
        <div class="category-card-body">
          <h3>${escapeHTML(c.title)}</h3>
          <p>${escapeHTML(c.description || '')}</p>
        </div>
      </a>`).join('');
    mainContent.innerHTML = `
      <div class="category-header">
        <h1>${escapeHTML(section.title)}</h1>
        <p class="description">${escapeHTML(section.description || '')}</p>
        <p style="color:var(--text-tertiary);font-size:var(--font-size-sm)">${section.categories.length} chapters — pick up where you left off.</p>
      </div>
      <div class="category-list-grid">${cards}</div>`;
  }
}

function renderChapterNav(id, section) {
  const { prev, next } = siblingChapters(id);
  const bar = document.getElementById('chapterBar');
  const footer = document.getElementById('chapterFooter');
  const secLink = document.getElementById('chapterSection');
  if (secLink) {
    secLink.href = `category.html?section=${section.id}`;
    secLink.textContent = section.title;
  }
  const setLink = (el, entry, fallback = 'index.html') => {
    if (!el) return;
    if (entry) {
      el.href = `category.html#${entry.cat.id}`;
      const t = el.querySelector('.chapter-footer-title');
      if (t) t.textContent = entry.cat.title;
      el.style.visibility = 'visible';
      const label = el.id && el.id.includes('Prev') ? entry.cat.title : entry.cat.title;
      el.setAttribute('aria-label', label);
    } else {
      el.href = fallback;
      const t = el.querySelector('.chapter-footer-title');
      if (t) t.textContent = 'Home Directory';
    }
  };
  const prevBar = document.getElementById('chapterPrev');
  const nextBar = document.getElementById('chapterNext');
  if (prevBar) {
    if (prev) { prevBar.href = `category.html#${prev.cat.id}`; prevBar.innerHTML = `‹ ${escapeHTML(prev.cat.title)}`; prevBar.style.visibility = 'visible'; }
    else { prevBar.href = 'index.html'; prevBar.textContent = '‹ Home'; }
  }
  if (nextBar) {
    if (next) { nextBar.href = `category.html#${next.cat.id}`; nextBar.innerHTML = `${escapeHTML(next.cat.title)} ›`; nextBar.style.visibility = 'visible'; }
    else { nextBar.href = 'tools.html'; nextBar.textContent = 'Tools ›'; }
  }
  if (bar) bar.hidden = false;
  if (footer) footer.hidden = false;
  setLink(document.getElementById('chapterFooterPrev'), prev);
  setLink(document.getElementById('chapterFooterNext'), next, 'tools.html');
}

// Build "On this page" outline from rendered h2/h3 ids
function buildOutline() {
  const block = document.getElementById('outlineBlock');
  const list = document.getElementById('outlineList');
  if (!block || !list || !mainContent) return;
  const heads = mainContent.querySelectorAll('h2[id], h3[id]');
  if (!heads.length) { block.hidden = true; return; }
  list.innerHTML = Array.from(heads).slice(0, 20).map(h => {
    const level = h.tagName.toLowerCase() === 'h3' ? ' — ' : '';
    const text = (h.textContent || '').replace(/#$/, '').trim().slice(0, 70);
    return `<li><a href="#${h.id}">${level}${escapeHTML(text)}</a></li>`;
  }).join('');
  block.hidden = false;
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Lightweight fuzzy score: substring = strong, subsequence = weak
function fuzzyScore(text, query) {
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  if (!q) return -1;
  if (t.includes(q)) return 100 + q.length;
  // subsequence match
  let ti = 0, qi = 0, score = 0, consecutive = 0;
  while (ti < t.length && qi < q.length) {
    if (t[ti] === q[qi]) { qi++; consecutive++; score += consecutive * 2; }
    else { consecutive = 0; score -= 1; }
    ti++;
  }
  return qi === q.length ? score : -1;
}

function runSearch(query) {
  if (!searchResults) return;
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    searchResults.classList.remove('active');
    searchResults.innerHTML = '';
    searchMatches = [];
    searchActiveIndex = -1;
    if (searchInput) searchInput.setAttribute('aria-expanded', 'false');
    return;
  }

  const scored = [];
  sections.forEach(s => {
    s.categories.forEach(c => {
      const hay = `${c.title} ${c.description || ''} ${(c.tags || []).join(' ')}`;
      const score = Math.max(
        fuzzyScore(c.title, q) + 20,
        fuzzyScore(c.description || '', q),
        ...((c.tags || []).map(t => fuzzyScore(t, q)))
      );
      if (score > 0) scored.push({ c, s, score });
    });
  });
  scored.sort((a, b) => b.score - a.score);
  searchMatches = scored.slice(0, 10);
  searchActiveIndex = -1;

  if (searchMatches.length === 0) {
    searchResults.innerHTML = `<div class="search-result-item" role="option" aria-selected="false" aria-disabled="true"><div class="search-result-title">No results found</div></div>`;
  } else {
    searchResults.innerHTML = searchMatches.map((m, i) => `
      <a href="category.html#${m.c.id}" class="search-result-item" role="option" id="search-opt-${i}" aria-selected="false" data-idx="${i}">
        <div class="search-result-title">${highlight(m.c.title, q)}</div>
        <div class="search-result-category">${escapeHTML(m.s.title)}${m.c.description ? ` • <span style="font-size: 11px; opacity: 0.8">${highlight(m.c.description, q)}</span>` : ''}</div>
      </a>
    `).join('');
  }
  searchResults.classList.add('active');
  if (searchInput) {
    searchInput.setAttribute('aria-expanded', 'true');
    searchInput.setAttribute('aria-activedescendant', '');
  }
  enhanceWithEntries(q);
}

// Command-level pass: entries inside already-visited chapters + top matches
async function enhanceWithEntries(q) {
  if (!searchResults || !searchInput) return;
  if (searchInput.value.trim().toLowerCase() !== q) return;
  const topCats = searchMatches.slice(0, 5);
  const jobs = [];
  // already-cached chapters first (no network)
  entryIndex.forEach((es, catId) => {
    const found = findCategory(catId);
    if (found.category) jobs.push(Promise.resolve({ c: found.category, s: found.section, es }));
  });
  topCats.forEach(m => {
    if (!entryIndex.has(m.c.id)) jobs.push(getEntriesFor(m.c).then(es => ({ c: m.c, s: m.s, es })));
  });
  const groups = await Promise.all(jobs);
  if (searchInput.value.trim().toLowerCase() !== q) return;
  const entryHits = [];
  const seen = new Set();
  groups.forEach(({ c, s, es }) => {
    (es || []).forEach(e => {
      const key = `${c.id}#${e.anchor}`;
      if (seen.has(key)) return;
      seen.add(key);
      const score = fuzzyScore(e.text, q);
      if (score > 0) entryHits.push({ c, s, entry: e, score: score + 5 });
    });
  });
  entryHits.sort((a, b) => b.score - a.score);
  const top = entryHits.slice(0, 5);
  if (!top.length) return;
  const html = top.map((m, i) => `
    <a href="category.html#${m.c.id}" data-entry-link="${m.entry.anchor}" class="search-result-item" role="option" id="search-entry-${i}" aria-selected="false">
      <div class="search-result-title">${highlight(m.entry.text, q)}</div>
      <div class="search-result-category">${escapeHTML(m.c.title)} • entry</div>
    </a>`).join('');
  searchResults.insertAdjacentHTML('beforeend', html);
  searchMatches = searchMatches.concat(top.map(t => ({ c: t.c, s: t.s, entryAnchor: t.entry.anchor, score: t.score })));
}

function moveSearchSelection(delta) {
  if (!searchResults || searchMatches.length === 0) return;
  searchActiveIndex = (searchActiveIndex + delta + searchMatches.length) % searchMatches.length;
  const items = searchResults.querySelectorAll('.search-result-item');
  items.forEach((el, i) => {
    const active = i === searchActiveIndex;
    el.classList.toggle('active', active);
    el.setAttribute('aria-selected', active ? 'true' : 'false');
    if (active && searchInput) searchInput.setAttribute('aria-activedescendant', el.id || '');
  });
  const activeEl = items[searchActiveIndex];
  if (activeEl && activeEl.scrollIntoView) activeEl.scrollIntoView({ block: 'nearest' });
}

// Event Listeners
function setupEventListeners() {
  // Delegated sidebar section toggle + home-header keyboard support
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-section-toggle]');
    if (toggle) {
      const section = toggle.parentElement;
      if (section) section.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    }
    const homeHeader = e.target.closest('[data-home-link]');
    if (homeHeader) window.location.href = 'index.html';
  });
  document.addEventListener('keydown', (e) => {
    const homeHeader = e.target.closest && e.target.closest('[data-home-link]');
    if (homeHeader && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.href = 'index.html';
    }
  });

  // Entry deep-links: jump to heading after chapter loads
  document.addEventListener('click', (e) => {
    const entryLink = e.target.closest('[data-entry-link]');
    if (entryLink) {
      try { sessionStorage.setItem('termtux-entry-anchor', entryLink.getAttribute('data-entry-link')); } catch (err) { /* ignore */ }
    }
  });

  // Hash change + query-param aware (ignore in-page entry anchors like #curl)
  window.addEventListener('hashchange', () => {
    if (!window.location.pathname.includes('category')) return;
    const frag = window.location.hash.substring(1);
    if (frag && isNaN(parseInt(frag, 10)) && !frag.startsWith('section-')) return;
    handleRouting();
    renderSidebar();
    closeSidebar();
  });

  // Bottom nav (mobile book index)
  document.addEventListener('click', (e) => {
    const openIdx = e.target.closest('[data-open-index]');
    if (openIdx) {
      if (sidebar) sidebar.classList.add('open');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }
    const focusSearch = e.target.closest('[data-focus-search]');
    if (focusSearch && searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ block: 'nearest' });
    }
  });

  // Mobile menu
  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  // Search with debounce + full keyboard nav
  if (searchInput && searchResults) {
    searchInput.setAttribute('role', 'combobox');
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.setAttribute('aria-controls', 'searchResults');
    searchInput.setAttribute('aria-autocomplete', 'list');
    searchResults.setAttribute('role', 'listbox');

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => runSearch(e.target.value), 150);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (!searchResults.classList.contains('active')) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSearchSelection(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSearchSelection(-1); }
      else if (e.key === 'Enter' && searchActiveIndex >= 0 && searchMatches[searchActiveIndex]) {
        e.preventDefault();
        window.location.href = `category.html#${searchMatches[searchActiveIndex].c.id}`;
        searchResults.classList.remove('active');
      }
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
        if (searchInput) searchInput.setAttribute('aria-expanded', 'false');
      }
    });

    // Search shortcut (Ctrl+K or Cmd+K) and Escape key handling
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        if (searchResults.classList.contains('active')) {
          searchInput.value = '';
          searchResults.classList.remove('active');
          searchInput.setAttribute('aria-expanded', 'false');
          searchInput.blur();
        }
      }
    });
  }

  // Back to top: passive + rAF-throttled
  if (backToTop) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
        ticking = false;
      });
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }
}

// Helpers
function highlight(text, query) {
  if (!text) return '';
  const escaped = escapeRegExp(query);
  const regex = new RegExp(`(${escaped})`, 'gi');
  const safeText = escapeHTML(text);
  return safeText.replace(regex, '<span class="search-result-highlight">$1</span>');
}

function setTheme(theme, persist = true) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
  }
  // Keep toggle semantics + browser chrome in sync (instant, no transition needed)
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#1A1A2E' : '#E95420');
}

function loadTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) { /* private mode */ }
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Follow the OS but don't persist: user hasn't chosen yet, so OS changes keep working
    setTheme('dark', false);
  } else {
    syncThemeToggle();
  }
}

function syncThemeToggle() {
  if (!themeToggle) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// System theme listener
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* private mode */ }
    if (!saved) {
      setTheme(e.matches ? 'dark' : 'light', false);
    }
  });
}

// Boot
init();

// Export for index page rendering if needed
window.sections = sections;
