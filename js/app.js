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
  const onHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.');
  const onTools = window.location.pathname.endsWith('tools.html');

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

// Handle Routing
async function handleRouting() {
  if (!window.location.pathname.includes('category')) return;

  const id = getCategoryId();
  if (!id || isNaN(id)) {
    window.location.href = 'index.html';
    return;
  }

  const { category, section } = findCategory(id);

  if (!category) {
    document.title = 'Not found — TermTux';
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

  // Render breadcrumbs
  const bSection = document.getElementById('breadcrumbSection');
  const bCategory = document.getElementById('breadcrumbCategory');
  if (bSection) bSection.textContent = section.title;
  if (bCategory) bCategory.textContent = category.title;

  updateCategoryMeta(category);

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
    if (mainContent) mainContent.innerHTML = renderMarkdown(md);
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

  // Hash change + query-param aware
  window.addEventListener('hashchange', () => {
    if (window.location.pathname.includes('category')) {
      handleRouting();
      renderSidebar();
      closeSidebar();
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

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}

// System theme listener
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Boot
init();

// Export for index page rendering if needed
window.sections = sections;
