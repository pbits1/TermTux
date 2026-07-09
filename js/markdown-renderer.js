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

export function renderMarkdown(markdown) {
  // Strip YAML frontmatter
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Normalize line endings
  content = content.replace(/\r\n/g, '\n');

  // Process fenced code blocks FIRST (protect them from other transforms)
  const codeBlocks = [];
  content = content.replace(/```(?:bash|sh|text|python|javascript|json|yaml|html|css)?\n([\s\S]*?)```/gm, (match, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    codeBlocks.push(code.trim());
    return placeholder;
  });

  // Convert ASCII box-drawing tables to HTML tables
  content = content.replace(/((?:.*[┌┬┐├┼┤└┴┘│─╔╦╗╠╬╣╚╩╝║═].*\n?)+)/gm, (match) => {
    const lines = match.trim().split('\n');
    const dataRows = lines.filter(line => line.includes('│') && !line.match(/[┌┬┐├┼┤└┴┘─]/));

    if (dataRows.length === 0) return match;

    let html = '<div class="table-wrapper"><table>';
    let isFirstDataRow = true;

    for (const row of dataRows) {
      const cells = row.split('│').map(c => c.trim()).filter(c => c !== '');
      if (cells.length === 0) continue;

      html += '<tr>';
      cells.forEach(cell => {
        const safeCell = escapeHTML(cell);
        if (isFirstDataRow) {
          html += `<th>${safeCell}</th>`;
        } else {
          html += `<td>${safeCell}</td>`;
        }
      });
      html += '</tr>';
      isFirstDataRow = false;
    }

    html += '</table></div>';
    return html;
  });

  // Convert markdown pipe tables to HTML tables
  content = content.replace(/((?:\|.*\|\n)+)/gm, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let html = '<div class="table-wrapper"><table>';
    rows.forEach((row, index) => {
      const cells = row.split('|').filter(cell => cell.trim() !== '');
      // Skip separator row (e.g. |---|---|)
      if (index === 1 && cells.every(c => c.trim().match(/^[-:]+$/))) return;

      html += '<tr>';
      cells.forEach(cell => {
        const safeCell = escapeHTML(cell.trim());
        if (index === 0) {
          html += `<th>${safeCell}</th>`;
        } else {
          html += `<td>${safeCell}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table></div>';
    return html;
  });

  // Render headers safely (must be at start of line)
  content = content.replace(/^#### (.*$)/gim, (m, g) => `<h4>${escapeHTML(g)}</h4>`);
  content = content.replace(/^### (.*$)/gim, (m, g) => `<h3>${escapeHTML(g)}</h3>`);
  content = content.replace(/^## (.*$)/gim, (m, g) => `<h2>${escapeHTML(g)}</h2>`);
  content = content.replace(/^# (.*$)/gim, (m, g) => `<h1>${escapeHTML(g)}</h1>`);

  // Render blockquotes safely
  content = content.replace(/^> (.*$)/gim, (m, g) => `<blockquote>${escapeHTML(g)}</blockquote>`);
  // Merge consecutive blockquotes
  content = content.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Render horizontal rules
  content = content.replace(/^---$/gm, '<hr>');

  // Render bold (safe since it only processes non-HTML content)
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Render italic
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Render inline code (but not inside code blocks)
  content = content.replace(/`([^`]+)`/g, (m, g) => `<code>${escapeHTML(g)}</code>`);

  // Render unordered lists
  content = content.replace(/^(\s*)[-*] (.*$)/gim, (m, spaces, text) => {
    return `${spaces}<li>${escapeHTML(text)}</li>`;
  });

  // Wrap consecutive <li> in <ul>
  content = content.replace(/((?:<li>.*<\/li>\n?)+)/gm, '<ul>$1</ul>');

  // Render links safely (validate URL protocol)
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const cleanUrl = url.trim();
    if (cleanUrl.toLowerCase().startsWith('javascript:') || cleanUrl.toLowerCase().startsWith('data:')) {
      return escapeHTML(text);
    }
    return `<a href="${escapeHTML(cleanUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(text)}</a>`;
  });

  // Render paragraphs — split by double newlines
  const blocks = content.split('\n\n');
  content = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Don't wrap HTML elements or code block placeholders in <p>
    if (trimmed.startsWith('<') || trimmed.startsWith('%%CODEBLOCK_')) return trimmed;
    // Otherwise wrap it (after escaping any unescaped tags)
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  // Restore code blocks with styled terminal UI
  content = content.replace(/%%CODEBLOCK_(\d+)%%/g, (match, index) => {
    const code = codeBlocks[parseInt(index)];
    const escapedCode = escapeHTML(code);

    return `<div class="command-block">
              <div class="command-block-header">
                <div class="command-block-dots">
                  <div class="command-block-dot" aria-hidden="true"></div>
                  <div class="command-block-dot" aria-hidden="true"></div>
                  <div class="command-block-dot" aria-hidden="true"></div>
                </div>
                <button class="copy-btn" onclick="copyToClipboard(this)" aria-label="Copy code command">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre><code>${escapedCode}</code></pre>
            </div>`;
  });

  return content;
}

window.copyToClipboard = function(btn) {
  const code = btn.closest('.command-block').querySelector('pre code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    const span = btn.querySelector('span');
    const originalText = span.innerText;
    span.innerText = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      span.innerText = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
    // Visual fallback
    const span = btn.querySelector('span');
    span.innerText = 'Failed';
    setTimeout(() => {
      span.innerText = 'Copy';
    }, 2000);
  });
};
