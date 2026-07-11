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

  // 1. Process and extract fenced code blocks first
  const codeBlocks = [];
  content = content.replace(/```(?:bash|sh|text|python|javascript|json|yaml|html|css)?\n([\s\S]*?)```/gm, (match, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    // Pre-escape code block contents
    codeBlocks.push(escapeHTML(code.trim()));
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

      html += '<tr>';
      cells.forEach(cell => {
        // Already escaped, inject directly
        if (isFirstDataRow) {
          html += `<th>${cell}</th>`;
        } else {
          html += `<td>${cell}</td>`;
        }
      });
      html += '</tr>';
      isFirstDataRow = false;
    }

    html += '</table></div>';
    return html;
  });

  // 4. Convert markdown pipe tables to HTML tables
  content = content.replace(/((?:\|.*\|\n)+)/gm, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let html = '<div class="table-wrapper"><table>';
    rows.forEach((row, index) => {
      let cells = row.split('|');
      if (cells[0] === '') cells.shift();
      if (cells[cells.length - 1] === '') cells.pop();
      
      // Skip separator row (e.g. |---|---|)
      if (index === 1 && cells.every(c => c.trim().match(/^[-:]*$/) && c.trim() !== '')) return;

      html += '<tr>';
      cells.forEach(cell => {
        // Already escaped, inject directly
        const cleanCell = cell.trim();
        if (index === 0) {
          html += `<th>${cleanCell}</th>`;
        } else {
          html += `<td>${cleanCell}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table></div>';
    return html;
  });

  // 5. Render markdown blocks (headers, blockquotes, lists, links, emphasis)
  // Since content is already escaped, we just wrap them in their respective tags directly.
  content = content.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  content = content.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  content = content.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  content = content.replace(/^---$/gm, '<hr>');

  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Render inline code safely
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Render lists
  content = content.replace(/^(\s*)[-*] (.*$)/gim, (match, indent, text) => {
    const isNested = indent && indent.length >= 2;
    return isNested ? `<li class="nested-li" style="margin-left: 20px;">${text}</li>` : `<li>${text}</li>`;
  });
  content = content.replace(/((?:<li>.*?<\/li>\n?|\s*<li class="nested-li".*?<\/li>\n?)+)/gm, (match) => {
    return `<ul>\n${match.trim()}\n</ul>\n`;
  });

  // Render links
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const cleanUrl = url.trim();
    // Validate protocol
    if (cleanUrl.toLowerCase().startsWith('javascript:') || cleanUrl.toLowerCase().startsWith('data:')) {
      return text;
    }
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Render paragraphs
  const blocks = content.split('\n\n');
  content = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<') || trimmed.startsWith('%%CODEBLOCK_')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  // 6. Restore fenced code blocks with terminal styling
  content = content.replace(/%%CODEBLOCK_(\d+)%%/g, (match, index) => {
    const escapedCode = codeBlocks[parseInt(index)];

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
    const span = btn.querySelector('span');
    span.innerText = 'Failed';
    setTimeout(() => {
      span.innerText = 'Copy';
    }, 2000);
  });
};
