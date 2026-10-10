const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(pagesDir)) {
    console.log('Pages directory not found.');
    process.exit(1);
}

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && !f.startsWith('_'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');

    // Next.js expects default exports for pages. 
    // Convert standard export const PageName = () => to export default function
    content = content.replace(/export const ([A-Za-z0-9_]+)\s*=\s*(?:(?:\(\)|(?:\((?:[^)]+)\)))\s*=>|function\s*\([^)]*\)\s*)/g, 'export default function $1() ');

    // Replace react-router-dom Link with next/link
    content = content.replace(/import {([^}]*)Link([^}]*)} from ['"]react-router-dom['"];/g, 'import Link from "next/link";$1$2');

    // We may also have imports from react-router-dom that don't have Link but we can just strip them if not needed, 
    // but let's just globally replace `<Link to=` with `<Link href=`
    content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');

    let newName = file.toLowerCase();

    if (newName === 'home.jsx') {
        newName = 'index.jsx';
    }

    // Rewrite the file
    fs.writeFileSync(path.join(pagesDir, file), content);

    // Rename if the name changed
    if (newName !== file) {
        if (fs.existsSync(path.join(pagesDir, newName))) {
            // safety override
            fs.unlinkSync(path.join(pagesDir, newName));
        }
        fs.renameSync(path.join(pagesDir, file), path.join(pagesDir, newName));
    }
});

console.log('Migration of page files to Next.js standards completed.');
