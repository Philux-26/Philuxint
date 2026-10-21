import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const HERO_IMAGES = [
    'vehicle_tracking',
    'solar_energy',
    'cctv_surveillance',
    'access_control',
    'electric_fencing'
];

const INDUSTRY_IMAGES = [
    'corporate',
    'industrial',
    'logistics',
    'residential'
];

async function optimize() {
    console.log('--- Optimizing Hero Images ---');
    for (const name of HERO_IMAGES) {
        const inputPath = path.resolve('public/images', `${name}.png`);
        const webpPath = path.resolve('public/images', `${name}.webp`);

        if (fs.existsSync(inputPath)) {
            const beforeStats = fs.statSync(inputPath);
            await sharp(inputPath)
                .webp({ quality: 82, effort: 6 })
                .toFile(webpPath);
            const afterStats = fs.statSync(webpPath);
            const beforeKb = (beforeStats.size / 1024).toFixed(1);
            const afterKb = (afterStats.size / 1024).toFixed(1);
            const savings = (((beforeStats.size - afterStats.size) / beforeStats.size) * 100).toFixed(0);
            console.log(`✓ hero/${name}: ${beforeKb} KB -> ${afterKb} KB (${savings}% saved)`);
        }
    }

    console.log('\n--- Optimizing Industry Images ---');
    for (const name of INDUSTRY_IMAGES) {
        const inputPath = path.resolve('public/images/industries', `${name}.jpg`);
        const webpPath = path.resolve('public/images/industries', `${name}.webp`);

        if (fs.existsSync(inputPath)) {
            const beforeStats = fs.statSync(inputPath);
            await sharp(inputPath)
                .webp({ quality: 82, effort: 6 })
                .toFile(webpPath);
            const afterStats = fs.statSync(webpPath);
            const beforeKb = (beforeStats.size / 1024).toFixed(1);
            const afterKb = (afterStats.size / 1024).toFixed(1);
            const savings = (((beforeStats.size - afterStats.size) / beforeStats.size) * 100).toFixed(0);
            console.log(`✓ industries/${name}: ${beforeKb} KB -> ${afterKb} KB (${savings}% saved)`);
        }
    }
}

optimize().catch(console.error);
