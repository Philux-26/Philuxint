const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const cssImports = [];

walkDir(path.join(__dirname, 'src'), function (filePath) {
    // Collect all CSS files
    if (filePath.endsWith('.css') && !filePath.includes('index.css')) {
        // Build path relative to src/pages
        let relativePath = path.relative(path.join(__dirname, 'src/pages'), filePath);
        relativePath = relativePath.replace(/\\/g, '/'); // normalize for imports
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
        cssImports.push(`import '${relativePath}';`);
    }

    // Strip CSS imports from all JSX components (except the master _app.jsx)
    if (filePath.endsWith('.jsx') && !filePath.includes('_app.jsx')) {
        let text = fs.readFileSync(filePath, 'utf-8');
        // Regex matches lines like `import './Header.css';` or `import "../components/Hero.css"`
        let newText = text.replace(/^import\s+['"][^'"]+\.css['"]\s*;\s*$/gm, '');
        if (text !== newText) {
            fs.writeFileSync(filePath, newText);
        }
    }
});

// Inject all CSS imports into _app.jsx
const appPath = path.join(__dirname, 'src/pages/_app.jsx');
let appText = fs.readFileSync(appPath, 'utf-8');
const importsString = cssImports.join('\n');
appText = appText.replace(/(import '\.\.\/index\.css';)/, `$1\n${importsString}`);
fs.writeFileSync(appPath, appText);

console.log('All CSS imports have been successfully hoisted to _app.jsx!');
