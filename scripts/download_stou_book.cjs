/**
 * STOU e-Book Auto-Extractor
 * Extracts full text of all pages from any STOU flipbook URL automatically.
 * Usage: node scripts/download_stou_book.cjs <flipbook_id>
 * Example: node scripts/download_stou_book.cjs 61169
 */

const fs = require('fs');
const http = require('http');

const bookId = process.argv[2] || '61169';
const url = `http://readonline.ebookstou.org/flipbook/${bookId}/mobile/javascript/search_config.js`;

console.log(`Connecting to STOU e-Book ID: ${bookId}...`);

http.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Error: Received status ${res.statusCode} from STOU server.`);
    return;
  }

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const vm = require('vm');
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(data, sandbox);

      const pages = sandbox.textForPages;
      if (!pages || !Array.isArray(pages)) {
        console.error('No page text array found.');
        return;
      }

      console.log(`🎉 SUCCESS! Extracted all ${pages.length} pages from Book ID ${bookId}!`);

      const outJson = `C:/Users/User/.gemini/antigravity/scratch/stou-fasttrack-app/book_${bookId}_pages.json`;
      const outTxt = `C:/Users/User/.gemini/antigravity/scratch/stou-fasttrack-app/book_${bookId}_full_text.txt`;

      fs.writeFileSync(outJson, JSON.stringify(pages, null, 2), 'utf-8');

      let textOutput = `=== STOU BOOK ID: ${bookId} (TOTAL ${pages.length} PAGES) ===\n\n`;
      pages.forEach((p, idx) => {
        textOutput += `\n\n------------------- [PAGE ${idx + 1}] -------------------\n` + p;
      });
      fs.writeFileSync(outTxt, textOutput, 'utf-8');

      console.log(`Saved JSON: ${outJson}`);
      console.log(`Saved Text: ${outTxt}`);
    } catch (err) {
      console.error('Parse error:', err.message);
    }
  });
}).on('error', (e) => {
  console.error('Network error:', e.message);
});
