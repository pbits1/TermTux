export function renderMarkdown(markdown) {
  // Strip YAML frontmatter
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Normalize line endings
  content = content.replace(/\r\n/g, '\n');

  // Process fenced code blocks FIRST (protect them from other transforms)
  const codeBlocks = [];
  content = content.replace(/```(?:bash|sh|text)?\n([\s\S]*?)```/gm, (match, code) => {
    const placeholder = `%%CODEBLOCK_${codeBlocks.length}%%`;
    codeBlocks.push(code.trim());
    return placeholder;
  });

  // Convert ASCII box-drawing tables to HTML tables
  content = content.replace(/((?:.*[┌┬┐├┼┤└┴┘│─╔╦╗╠╬╣╚╩╝║═].*\n?)+)/gm, (match) => {
    const lines = match.trim().split('\n');
    const dataRows = lines.filter(line => line.includes('│') && !line.match(/[┌┬┐├┼┤└┴┘─]/));

    if (dataRows.length === 0) return match;

    let html = '<table>';
    let isFirstDataRow = true;

    for (const row of dataRows) {
      const cells = row.split('│').map(c => c.trim()).filter(c => c !== '');
      if (cells.length === 0) continue;

      html += '<tr>';
      cells.forEach(cell => {
        if (isFirstDataRow) {
          html += `<th>${cell}</th>`;
        } else {
          html += `<td>${cell}</td>`;
        }
      });
      html += '</tr>';
      isFirstDataRow = false;
    }

    html += '</table>';
    return html;
  });

  // Convert markdown pipe tables to HTML tables
  content = content.replace(/((?:\|.*\|\n)+)/gm, (match) => {
    const rows = match.trim().split('\n');
    if (rows.length < 2) return match;

    let html = '<table>';
    rows.forEach((row, index) => {
      const cells = row.split('|').filter(cell => cell.trim() !== '');
      // Skip separator row (e.g. |---|---|)
      if (index === 1 && cells.every(c => c.trim().match(/^[-:]+$/))) return;

      html += '<tr>';
      cells.forEach(cell => {
        if (index === 0) {
          html += `<th>${cell.trim()}</th>`;
        } else {
          html += `<td>${cell.trim()}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  });

  // Render headers (must be at start of line)
  content = content.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Render blockquotes
  content = content.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  content = content.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Render horizontal rules
  content = content.replace(/^---$/gm, '<hr>');

  // Render bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Render italic
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Render inline code (but not inside code blocks)
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Render unordered lists
  content = content.replace(/^(\s*)[-*] (.*$)/gim, '$1<li>$2</li>');

  // Wrap consecutive <li> in <ul>
  content = content.replace(/((?:<li>.*<\/li>\n?)+)/gm, '<ul>$1</ul>');

  // Render links
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Render paragraphs — split by double newlines
  const blocks = content.split('\n\n');
  content = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Don't wrap HTML elements or code block placeholders in <p>
    if (trimmed.startsWith('<') || trimmed.startsWith('%%CODEBLOCK_')) return trimmed;
    // Don't wrap lines that are just indented text (descriptions)
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');

  // Restore code blocks with styled terminal UI
  content = content.replace(/%%CODEBLOCK_(\d+)%%/g, (match, index) => {
    const code = codeBlocks[parseInt(index)];
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<div class="command-block">
              <div class="command-block-header">
                <div class="command-block-dots">
                  <div class="command-block-dot"></div>
                  <div class="command-block-dot"></div>
                  <div class="command-block-dot"></div>
                </div>
                <button class="copy-btn" onclick="copyToClipboard(this)">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
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
  });
};
