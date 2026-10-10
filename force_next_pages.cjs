const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

fs.readdirSync(pagesDir).forEach(file => {
    if (!file.endsWith('.jsx') || file.startsWith('_')) return;

    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Convert 'export const PageName = () =>' to 'export default function PageName()'
    content = content.replace(/export\s+const\s+([A-Za-z0-9_]+)\s*=\s*\([^)]*\)\s*=>\s*\{/g, 'export default function $1() {');

    let newName = file.toLowerCase();
    if (file === 'Home.jsx' || file === 'home.jsx') newName = 'index.jsx';
    if (file === 'BlogPost.jsx' || file === 'blogpost.jsx') newName = '[id].jsx';

    // If the name should be strictly different, handle renaming cleanly for Windows
    if (newName !== file) {
        fs.unlinkSync(filePath); // delete upper-cased version
        fs.writeFileSync(path.join(pagesDir, newName), content);
    } else {
        fs.writeFileSync(filePath, content);
    }
});
console.log('Core pages forcibly upgraded to Next.js defaults!');
