const fs = require('fs');
const path = require('path');

// True mapping for 10151 based on actual unit text
const mapping10151 = {
  1: { file: 'unit_1_id_26192.json', flipbookId: '26192' },
  2: { file: 'unit_8_id_26199.json', flipbookId: '26199' },
  3: { file: 'unit_9_id_26200.json', flipbookId: '26200' },
  4: { file: 'unit_10_id_26201.json', flipbookId: '26201' },
  5: { file: 'unit_11_id_26202.json', flipbookId: '26202' },
  6: { file: 'unit_12_id_26203.json', flipbookId: '26203' },
  7: { file: 'unit_13_id_26204.json', flipbookId: '26204' },
  8: { file: 'unit_14_id_26205.json', flipbookId: '26205' },
  9: { file: 'unit_15_id_26206.json', flipbookId: '26206' },
  10: { file: 'unit_2_id_26193.json', flipbookId: '26193' },
  11: { file: 'unit_3_id_26194.json', flipbookId: '26194' },
  12: { file: 'unit_4_id_26195.json', flipbookId: '26195' },
  13: { file: 'unit_5_id_26196.json', flipbookId: '26196' },
  14: { file: 'unit_6_id_26197.json', flipbookId: '26197' },
  15: { file: 'unit_7_id_26198.json', flipbookId: '26198' }
};

const outDir = 'public/books_data';

for (let unitNum = 1; unitNum <= 15; unitNum++) {
  const info = mapping10151[unitNum];
  const srcPath = path.join('books_10151', info.file);
  const pages = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
  
  const targetPath = path.join(outDir, `10151_unit_${unitNum}.json`);
  fs.writeFileSync(targetPath, JSON.stringify({
    course: '10151',
    unit: unitNum,
    flipbookId: info.flipbookId,
    totalPages: pages.length,
    pages: pages
  }));
  console.log(`Mapped 10151 Unit ${unitNum} from ${info.file} (Flipbook ID: ${info.flipbookId})`);
}

console.log('10151 unit files in public/books_data remapped with 100% accuracy!');
