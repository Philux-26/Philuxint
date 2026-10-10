const fs = require('fs');
const path = require('path');
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}
walkDir(path.join(__dirname, 'src'), function (filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf-8');

        // Replace <Link to= with <Link href= globally
        let newContent = content.replace(/<Link([^>]*?)\s+to=/g, '<Link$1 href=');

        // Also just in case they have it touching something else like <Link to="..."
        newContent = newContent.replace(/<Link\s+to=/g, '<Link href=');

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent);
            console.log("Fixed Link props in " + filePath);
        }
    }
});
