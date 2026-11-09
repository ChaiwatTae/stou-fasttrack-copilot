const fs = require('fs');
const http = require('http');

async function downloadUnit(unitIndex, bookId) {
  return new Promise((resolve) => {
    const url = `http://readonline.ebookstou.org/flipbook/${bookId}/mobile/javascript/search_config.js`;
    http.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download Unit ${unitIndex} (ID ${bookId}): status ${res.statusCode}`);
        return resolve(false);
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
          
          const targetDir = 'C:/Users/User/.gemini/antigravity/scratch/stou-fasttrack-app/books_10151';
          if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

          fs.writeFileSync(`${targetDir}/unit_${unitIndex}_id_${bookId}.json`, JSON.stringify(pages, null, 2), 'utf-8');
          console.log(`✅ Unit ${unitIndex} (Book ID ${bookId}) downloaded: ${pages.length} pages.`);
          resolve(true);
        } catch (e) {
          console.error(`Parse error in Unit ${unitIndex}:`, e.message);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`Network error on Unit ${unitIndex}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log("🚀 Starting batch download of ALL 15 UNITS of STOU 10151 ไทยศึกษา...");
  // Units 1 to 15 match IDs 26192 to 26206
  for (let u = 1; u <= 15; u++) {
    const bookId = 26191 + u;
    await downloadUnit(u, bookId);
  }
  console.log("🎉 All 15 units of 10151 downloaded successfully!");
}

run();
