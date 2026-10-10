const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let text = fs.readFileSync(filePath, 'utf-8');
        let newText = text;

        // Handle HashLink 
        newText = newText.replace(/import\s*{?\s*HashLink\s*}?\s*from\s*['"]react-router-hash-link['"];/g, ''); // We will inject Link directly
        newText = newText.replace(/<HashLink([^>]+)*to=/g, '<Link$1href=');
        newText = newText.replace(/<\/HashLink>/g, '</Link>');

        // Handle Routes / react-router-dom elements
        newText = newText.replace(/import\s*\{[^}]*Link[^}]*\}\s*from\s*['"]react-router-dom['"];/g, 'import Link from "next/link";\n');

        // Catch-all: remove lingering react-router-dom imports (e.g. useParams, unless needed)
        // If useParams was used, Next uses useRouter, we will replace it structurally if the build catches it.
        newText = newText.replace(/import\s*\{[^}]*\}\s*from\s*['"]react-router-dom['"];/g, '');

        // If HashLink was converted to Link but no import Link exists, add it (edge case in Header.jsx where both existed)
        if (newText.includes('<Link') && !newText.includes('next/link')) {
            newText = 'import Link from "next/link";\n' + newText;
        }

        if (text !== newText) {
            fs.writeFileSync(filePath, newText);
        }
    }
});
console.log('React Router attributes scrubbed and migrated to Next.js successfully.');
