const fs = require('fs');
const html = fs.readFileSync('C:/Users/User/.gemini/antigravity/scratch/stou-fasttrack-app/live_verify.html', 'utf-8');
console.log('Script tag in live HTML:', html.match(/index-[a-zA-Z0-9_-]+\.js/g));
console.log('Has Scientia:', html.includes('Scientia'));
console.log('Has ดูหน้าหนังสือ มสธ:', html.includes('ดูหน้าหนังสือ มสธ'));
console.log('Has ตอนที่ 1.1:', html.includes('ตอนที่ 1.1'));
console.log('Has 4 ลักษณะสำคัญ:', html.includes('4 ลักษณะสำคัญ'));
