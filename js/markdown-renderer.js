// Escape HTML entities to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Shared clipboard helper with fallback for non-secure contexts
function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext !== false) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('execCommand returned false');
    return true;
  } catch (e) {
    // Last resort: prompt-less failure surfaced to caller
    throw e;
  }
}

function flashCopied(btn, ok = true) {
  const span = btn.querySelector('span');
  if (!span) return;
  const original = span.dataset.original || span.innerText;
  span.dataset.original = original;
  span.innerText = ok ? 'Copied!' : 'Failed';
  btn.classList.toggle('copied', ok);
  setTimeout(() => {
    span.innerText = span.dataset.original || 'Copy';
    btn.classList.remove('copied');
  }, 2000);
}

export function renderMarkdown(markdown) {
  // Strip YAML frontmatter
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Normalize line endings
  content = content.replace(/\r\n/g, '\n');

  // 1. Process and extract fenced code blocks first (any language tag)
  const codeBlocks = [];
  content = content.replace(/```([\w+-]*)\n([\s\S]*?)```/gm, (match, lang, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    codeBlocks.push({ lang: (lang || '').toLowerCase(), code: escapeHTML(code.trim()) });
    return placeholder;
  });

  // 2. Escape HTML in the remaining markdown body
  content = escapeHTML(content);

  // 3. Convert ASCII box-drawing tables to HTML tables
  content = content.replace(/((?:.*[┌┬┐├┼┤└┴┘│─╔╦╗╠╬╣╚╩╝║═].*\n?)+)/gm, (match) => {
    const lines = match.trim().split('\n');
    const dataRows = lines.filter(line => line.includes('│') && !line.match(/[┌┬┐├┼┤└┴┘─]/));

    if (dataRows.length === 0) return match;

    let html = '<div class="table-wrapper"><table>';
    let isFirstDataRow = true;

    for (const row of dataRows) {
      let cells = row.split('│').map(c => c.trim());
      if (cells[0] === '') cells.shift();
      if (cells[cells.length - 1] === '') cells.pop();
      if (cells.length === 0) continue;

      const cellTag = isFirstDataRow ? 'th scope="col"' : 'td';
      html += isFirstDataRow ? '<thead><tr>' : '<tr>';
      cells.forEach(cell => {
        html += `<${cellTag}>${cell}</${cellTag.split(' ')[0]}>`;
      });
      html += isFirstDataRow ? '</tr></thead><tbody>' : '</tr>';
      isFirstDataRow = false;
    }

    html += '</tbody></table></div>';
    return html;
  });

  // 4. Convert markdown pipe tables to HTML tables
  content = content.replace(/((?:\|.*\|\n)+)/gm, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let headerDone = false;
    let html = '<div class="table-wrapper"><table><thead>';
    let bodyHtml = '';
    rows.forEach((row, index) => {
      let cells = row.split('|');
      if (cells[0] === '') cells.shift();
      if (cells[cells.length - 1] === '') cells.pop();

      // Skip separator row (e.g. |---|)
      if (cells.every(c => c.trim().match(/^[-:]*$/) && c.trim() !== '')) return;

      const isHeader = !headerDone;
      let rowHtml = '<tr>';
      cells.forEach(cell => {
        const cleanCell = cell.trim();
        rowHtml += isHeader ? `<th scope="col">${cleanCell}</th>` : `<td>${cleanCell}</td>`;
      });
      rowHtml += '</tr>';
      if (isHeader) {
        html += rowHtml + '</thead><tbody>';
        headerDone = true;
      } else {
        bodyHtml += rowHtml;
      }
      void index;
    });
    html += bodyHtml + '</tbody></table></div>';
    return html;
  });

  // 5. Render markdown blocks (headers, blockquotes, lists, links, emphasis)
  content = content.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  content = content.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>');
  content = content.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  content = content.replace(/<\/blockquote>\n<blockquote>/g, '\n');
  // Classify callouts: warning / danger hints
  content = content.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (m, inner) => {
    const low = inner.toLowerCase();
    let cls = '';
    if (/(warning|⚠️|caution|careful)/.test(low)) cls = ' class="warning"';
    else if (/(danger|⛔|error|do not|never delete|destructive)/.test(low)) cls = ' class="danger"';
    return `<blockquote${cls}>${inner}</blockquote>`;
  });

  content = content.replace(/^---$/gm, '<hr>');

  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Render inline code safely
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Render lists: ordered (1. ) and unordered (-, *) with nesting
  // Note: [ ] not \s so blank lines can't be swallowed into the block
  content = content.replace(/^((?:[ ]*(?:[-*]|\d+\.)\s+.*\n?)+)/gm, (block) => {
    const lines = block.split('\n').map(l => l.replace(/\r$/, '')).filter(l => l.trim() !== '');
    if (lines.length === 0) return block;
    const firstIsOrdered = /^[ ]*\d+\.\s/.test(lines[0]);
    const items = lines.map((line) => {
      const m = line.match(/^[ ]*(?:[-*]|\d+\.)\s+(.*)$/);
      const text = m ? m[1] : line.trim();
      const isNested = /^[ ]{2,}/.test(line);
      return isNested ? `<li class="nested-li" style="margin-left: 20px;">${text}</li>` : `<li>${text}</li>`;
    }).join('\n');
    const tag = firstIsOrdered ? 'ol' : 'ul';
    return `<${tag}>\n${items}\n</${tag}>\n`;
  });

  // Render links (allow http/https/mailto + relative; block dangerous schemes)
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const cleanUrl = url.trim();
    const low = cleanUrl.toLowerCase();
    if (/^(javascript|data|vbscript|file|blob):/.test(low)) {
      return text;
    }
    const isExternal = /^(https?:|mailto:)/.test(low);
    if (isExternal) {
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    return `<a href="${cleanUrl}">${text}</a>`;
  });

  // Render paragraphs (skip already-HTML blocks incl. lists/tables/code)
  const blocks = content.split('\n\n');
  content = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h1|h2|h3|h4|ul|ol|li|table|blockquote|hr|div|pre)/.test(trimmed) || trimmed.startsWith('%%CODEBLOCK_')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  // 6. Restore fenced code blocks with terminal styling + language label
  content = content.replace(/%%CODEBLOCK_(\d+)%%/g, (match, index) => {
    const entry = codeBlocks[parseInt(index)];
    const escapedCode = typeof entry === 'string' ? entry : entry.code;
    const lang = typeof entry === 'string' ? '' : entry.lang;
    const langLabel = lang ? `<span class="code-lang">${escapeHTML(lang)}</span>` : '';

    return `<div class="command-block">
              <div class="command-block-header">
                <div class="command-block-dots">
                  <div class="command-block-dot" aria-hidden="true"></div>
                  <div class="command-block-dot" aria-hidden="true"></div>
                  <div class="command-block-dot" aria-hidden="true"></div>
                </div>
                ${langLabel}
                <button class="copy-btn" data-copy-btn aria-label="Copy code command">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre><code>${escapedCode}</code></pre>
            </div>`;
  });

  return content;
}

if (typeof window !== 'undefined') {
  // Delegated copy handler (no inline onclick needed)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy-btn], .copy-btn');
    if (!btn || !btn.closest('.command-block')) return;
    // Skip tool-specific copy buttons handled elsewhere (they lack pre code)
    const codeEl = btn.closest('.command-block').querySelector('pre code');
    if (!codeEl) return;
    // Avoid double-handling when tools.html wires its own listener
    if (btn.hasAttribute('data-tool-copy')) return;
    copyTextToClipboard(codeEl.innerText).then(() => flashCopied(btn, true)).catch(() => flashCopied(btn, false));
  });

  // Legacy global for any remaining inline onclick (kept for compat)
  window.copyToClipboard = function(btn) {
    const codeEl = btn.closest('.command-block').querySelector('pre code');
    const code = codeEl ? codeEl.innerText : '';
    copyTextToClipboard(code).then(() => flashCopied(btn, true)).catch(() => flashCopied(btn, false));
  };
}
