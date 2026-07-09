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
        <div class="nav-section-title" onclick="this.parentElement.classList.toggle('collapsed')">
          <span>${section.title}</span>
          <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        <div class="nav-items">
    `;
    
    section.categories.forEach(cat => {
      html += `
        <a href="category.html#${cat.id}" class="nav-item" data-id="${cat.id}">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
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
    const activeItem = sidebarNav.querySelector(`[data-id="${hash}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
      activeItem.scrollIntoView({ block: 'center' });
    }
  }
}

// Handle Routing
async function handleRouting() {
  if (!window.location.pathname.includes('category.html')) return;
  
  const id = parseInt(window.location.hash.substring(1));
  if (!id) {
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
    mainContent.innerHTML = `<div class="empty-state"><h3>Category not found</h3><a href="index.html">Go home</a></div>`;
    return;
  }
  
  // Render breadcrumbs
  document.getElementById('breadcrumbSection').textContent = section.title;
  document.getElementById('breadcrumbCategory').textContent = category.title;
  
  // Render title
  document.title = `${category.title} - TermTux`;
  
  // Fetch and render markdown
  try {
    mainContent.innerHTML = '<div class="skeleton-block"></div><div class="skeleton-block"></div>';
    const response = await fetch(`content/${category.file}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const md = await response.text();
    mainContent.innerHTML = renderMarkdown(md);
  } catch (error) {
    mainContent.innerHTML = `<div class="empty-state"><h3>Error loading content</h3><p>Could not load ${category.file}</p></div>`;
  }
}

// Event Listeners
function setupEventListeners() {
  // Hash change
  window.addEventListener('hashchange', () => {
    if (window.location.pathname.includes('category.html')) {
      handleRouting();
      // Update sidebar active state
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      const activeItem = document.querySelector(`[data-id="${window.location.hash.substring(1)}"]`);
      if (activeItem) activeItem.classList.add('active');
    }
  });
  
  // Mobile menu
  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
    
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }
  
  // Search
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
      }
      
      let resultsHtml = '';
      let matchCount = 0;
      
      sections.forEach(s => {
        s.categories.forEach(c => {
          if (c.title.toLowerCase().includes(query)) {
            matchCount++;
            if (matchCount <= 10) {
              resultsHtml += `
                <div class="search-result-item" onclick="window.location.href='category.html#${c.id}'">
                  <div class="search-result-title">${highlight(c.title, query)}</div>
                  <div class="search-result-category">${s.title}</div>
                </div>
              `;
            }
          }
        });
      });
      
      if (matchCount === 0) {
        resultsHtml = `<div class="search-result-item"><div class="search-result-title">No results found</div></div>`;
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
    
    // Search shortcut (Ctrl+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
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
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="search-result-highlight">$1</span>');
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
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

// Boot
init();

// Export for index page rendering if needed
window.sections = sections;
