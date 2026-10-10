const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/Services.jsx',
    'src/pages/BlogPost.jsx',
    'src/pages/Blog.jsx',
    'src/pages/Home.jsx',
    'src/pages/index.jsx',
    'src/components/ServicesInteractive.jsx',
    'src/components/Header.jsx',
    'src/components/Footer.jsx',
    'src/App.jsx'
];

files.forEach(file => {
    let p = path.join(__dirname, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf-8');

        // Remove ALL variants of react-router imports
        content = content.replace(/^.*react-router-dom.*$/gm, '');
        content = content.replace(/^.*react-router-hash-link.*$/gm, '');

        // Fix useParams in BlogPost.jsx to Next.js useRouter
        if (file.includes('BlogPost') && content.includes('useParams')) {
            content = "import { useRouter } from 'next/router';\n" + content;
            content = content.replace(/const\s*{\s*id\s*}\s*=\s*useParams\(\);/, 'const router = useRouter();\n    const { id } = router.query;');
            content = content.replace(/useParams/g, ''); // strip any lingering
        }

        // Add next/link if it's missing but <Link is used
        if (content.includes('<Link') && !content.includes('next/link')) {
            content = 'import Link from "next/link";\n' + content;
        }

        fs.writeFileSync(p, content);
        console.log(`Scrubbed ${file}`);
    }
});
