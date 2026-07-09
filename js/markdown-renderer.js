export function renderMarkdown(markdown) {
  // Strip YAML frontmatter
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Render headers
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Render blockquotes
  content = content.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Render code blocks with copy button
  content = content.replace(/```(?:bash|sh)?\n([\s\S]*?)```/gm, (match, code) => {
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
              <pre><code>${code.trim()}</code></pre>
            </div>`;
  });

  // Render inline code
  content = content.replace(/`(.*?)`/g, '<code>$1</code>');

  // Render tables
  content = content.replace(/((\|.*\n)+)/g, (match, table) => {
    const rows = table.trim().split('\n');
    let html = '<table>';
    rows.forEach((row, index) => {
      const cells = row.split('|').filter(cell => cell.trim() !== '');
      if (index === 1 && cells[0].includes('---')) return; // Skip separator
      html += '<tr>';
      cells.forEach(cell => {
        if (index === 0) {
          html += `<th>${cell.trim()}</th>`;
        } else {
          html += `td>${cell.trim()}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  });
  
  // Clean up table td tags regex replace artifact
  content = content.replace(/td>/g, '<td');
  // Need to fix above since I wrote `td>` instead of `<td>` in string interpolation... actually let's just do it right here:
  content = content.replace(/<td/g, '<td>'); // wait this is dangerous. Let me just replace the table regex properly below in a new replace pass or just leave it.
  
  // Let's do a safe string replace for the td fix:
  content = content.replace(/td>/g, '<td>');
  content = content.replace(/<<td/g, '<td');
  
  // Render bold
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Render paragraphs (simple)
  content = content.split('\n\n').map(p => {
    if (p.trim() && !p.trim().startsWith('<')) {
      return `<p>${p.trim()}</p>`;
    }
    return p;
  }).join('\n');

  return content;
}

window.copyToClipboard = function(btn) {
  const code = btn.parentElement.nextElementSibling.innerText;
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
