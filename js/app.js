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

// Helper to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to escape selector query strings
function escapeSelector(str) {
  return CSS.escape(str);
}

// Initialize
function init() {
  renderSidebar();
  setupEventListeners();
  loadTheme();
  handleRouting();
}

// Render Sidebar
function renderSidebar() {
  if (!sidebarNav) return;
  
  let html = '';
  sections.forEach(section => {
    html += `
      <div class="nav-section">
        <button class="nav-section-title" onclick="this.parentElement.classList.toggle('collapsed')" aria-expanded="true">
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
  const hash = window.location.hash.substring(1);
  if (hash) {
    try {
      const activeItem = sidebarNav.querySelector(`[data-id="${escapeSelector(hash)}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ block: 'center' });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// Handle Routing
async function handleRouting() {
  if (!window.location.pathname.includes('category')) return;
  
  const rawHash = window.location.hash.substring(1);
  const id = parseInt(rawHash);
  if (!id || isNaN(id)) {
    window.location.href = 'index.html';
    return;
  }
  
  // Find category
  let category = null;
  let section = null;
  
  for (const s of sections) {
    const cat = s.categories.find(c => c.id === id);
    if (cat) {
      category = cat;
      section = s;
      break;
    }
  }
  
  if (!category) {
    mainContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">🔍</div>
        <h3>Category not found</h3>
        <p>The page you are looking for does not exist.</p>
        <a href="index.html" class="github-link mt-md" style="display: inline-flex;">Go home</a>
      </div>
    `;
    return;
  }
  
  // Render breadcrumbs
  const bSection = document.getElementById('breadcrumbSection');
  const bCategory = document.getElementById('breadcrumbCategory');
  if (bSection) bSection.textContent = section.title;
  if (bCategory) bCategory.textContent = category.title;
  
  // Render title
  document.title = `${category.title} — TermTux`;

  // Render tags
  const tagsContainer = document.getElementById('categoryTags');
  if (tagsContainer) {
    if (category.tags && category.tags.length > 0) {
      tagsContainer.innerHTML = category.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
      tagsContainer.style.display = 'flex';
    } else {
      tagsContainer.style.display = 'none';
    }
  }
  
  // Fetch and render markdown
  try {
    mainContent.innerHTML = `
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-line" style="width: 80%"></div>
      <div class="skeleton skeleton-line" style="width: 60%"></div>
      <div class="skeleton skeleton-block"></div>
    `;
    const response = await fetch(`content/${category.file}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const md = await response.text();
    mainContent.innerHTML = renderMarkdown(md);
  } catch (error) {
    mainContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon" aria-hidden="true">⚠️</div>
        <h3>Error loading content</h3>
        <p>Could not load the commands for ${category.title}. Please check your connection.</p>
      </div>
    `;
  }
}

// Event Listeners
function setupEventListeners() {
  // Hash change
  window.addEventListener('hashchange', () => {
    if (window.location.pathname.includes('category')) {
      handleRouting();
      // Update sidebar active state
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      const rawHash = window.location.hash.substring(1);
      try {
        const activeItem = document.querySelector(`[data-id="${escapeSelector(rawHash)}"]`);
        if (activeItem) activeItem.classList.add('active');
      } catch (e) {
        console.error(e);
      }
      
      // Auto-close sidebar on mobile navigation
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Mobile menu
  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    });
    
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }
  
  // Search
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
      }
      
      let resultsHtml = '';
      let matchCount = 0;
      
      sections.forEach(s => {
        s.categories.forEach(c => {
          // Robust Multi-Field Search: matches title, description, or tags
          const titleMatch = c.title.toLowerCase().includes(query);
          const descMatch = c.description ? c.description.toLowerCase().includes(query) : false;
          const tagsMatch = c.tags ? c.tags.some(tag => tag.toLowerCase().includes(query)) : false;
          
          if (titleMatch || descMatch || tagsMatch) {
            matchCount++;
            if (matchCount <= 10) {
              resultsHtml += `
                <a href="category.html#${c.id}" class="search-result-item" role="option">
                  <div class="search-result-title">${highlight(c.title, query)}</div>
                  <div class="search-result-category">${s.title} ${c.description ? `• <span style="font-size: 11px; opacity: 0.8">${highlight(c.description, query)}</span>` : ''}</div>
                </a>
              `;
            }
          }
        });
      });
      
      if (matchCount === 0) {
        resultsHtml = `<div class="search-result-item" role="option" aria-disabled="true"><div class="search-result-title">No results found</div></div>`;
      }
      
      searchResults.innerHTML = resultsHtml;
      searchResults.classList.add('active');
    });
    
    // Close search on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
    
    // Search shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
  
  // Back to top
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Helpers
function highlight(text, query) {
  if (!text) return '';
  const escaped = escapeRegExp(query);
  const regex = new RegExp(`(${escaped})`, 'gi');
  // First escape HTML entities in original text to prevent XSS
  const safeText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
