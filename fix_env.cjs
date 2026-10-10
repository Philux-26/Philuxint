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
        let newText = text.replace(/import\.meta\.env\.VITE_/g, 'process.env.NEXT_PUBLIC_');

        if (text !== newText) {
            fs.writeFileSync(filePath, newText);
            console.log('Fixed env vars in', filePath);
        }
    }
});

// Also check root for .env
const envPath = path.join(__dirname, '.env');
const envLocalPath = path.join(__dirname, '.env.local');

[envPath, envLocalPath].forEach(p => {
    if (fs.existsSync(p)) {
        let text = fs.readFileSync(p, 'utf-8');
        let newText = text.replace(/VITE_/g, 'NEXT_PUBLIC_');
        fs.writeFileSync(p, newText);
    }
})
