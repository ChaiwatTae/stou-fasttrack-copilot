const fs = require('fs');
const path = require('path');

function cleanThaiText(text) {
  if (!text) return '';
  return text
    // Replace broken sara am sequences
    .replace(/ำ/g, 'ำ')
    .replace(/\uFFFDำ/g, 'ำ')
    .replace(/ำ/g, 'ำ')
    // Remove unicode replacement char
    .replace(/\uFFFD/g, '')
    // Remove zero width chars
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Fix duplicate vowels and tone marks
    .replace(/่{2,}/g, '่')
    .replace(/้{2,}/g, '้')
    .replace(/๊{2,}/g, '๊')
    .replace(/๋{2,}/g, '๋')
    .replace(/์{2,}/g, '์')
    .replace(/ิ{2,}/g, 'ิ')
    .replace(/ี{2,}/g, 'ี')
    .replace(/ึ{2,}/g, 'ึ')
    .replace(/ื{2,}/g, 'ื')
    .replace(/ุ{2,}/g, 'ุ')
    .replace(/ู{2,}/g, 'ู')
    .replace(/ั{2,}/g, 'ั')
    // Fix kerning spaces in common Thai words
    .replace(/ชีวี ิติ/g, 'ชีวิต')
    .replace(/ชีวี ิต/g, 'ชีวิต')
    .replace(/ส่งิ /g, 'สิ่ง')
    .replace(/สง่ิ /g, 'สิ่ง')
    .replace(/แวดลอ้ ม/g, 'แวดล้อม')
    .replace(/เอยี ด/g, 'เอียด')
    .replace(/รายละเอยี ด/g, 'รายละเอียด')
    .replace(/ความรู้/g, 'ความรู้')
    .replace(/วทิ ยาศาสตร์/g, 'วิทยาศาสตร์')
    .replace(/เทคโนโลยแี ละ/g, 'เทคโนโลยีและ')
    .replace(/เพอื่ /g, 'เพื่อ')
    .replace(/เพื่อ/g, 'เพื่อ');
}

const dir = 'public/books_data';
const files = fs.readdirSync(dir);
let totalCleanedPages = 0;

files.forEach(f => {
  if (!f.endsWith('.json')) return;
  const filePath = path.join(dir, f);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  data.pages = data.pages.map(pageText => cleanThaiText(pageText));
  fs.writeFileSync(filePath, JSON.stringify(data));
  totalCleanedPages += data.pages.length;
  console.log(`Cleaned ${f} (${data.pages.length} pages)`);
});

console.log(`Successfully cleaned all Thai text across ${files.length} units (${totalCleanedPages} pages total)!`);
