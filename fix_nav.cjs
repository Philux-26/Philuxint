const fs = require('fs');
const p = 'e:\\\\BRAINBOX\\\\APPs Projects\\\\Philux\\\\src\\\\components\\\\Header.jsx';
if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf-8');
    content = content.replace(/<NavLink\s+/g, '<Link ');
    content = content.replace(/<\/NavLink>/g, '</Link>');
    content = content.replace(/to="/g, 'href="'); // target specific props
    content = content.replace(/end\s+/g, '');
    content = content.replace(/className=\{\(\{\s*isActive\s*\}\)\s*=>\s*`nav-link \$\{isActive \? 'active' : ''\}`\}/g, 'className="nav-link"');
    fs.writeFileSync(p, content);
    console.log("Patched Header.jsx");
}
