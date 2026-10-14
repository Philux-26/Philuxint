import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES = [
    // Services
    {
        url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/vehicle-tracking.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1509391366360-515434f0aa66?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/solar-inverter.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/cctv-surveillance.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1512403754473-27835f7b9984?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/electric-fencing.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/access-control.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1623912959827-897d19451996?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/services/fire-alarm.jpg'
    },

    // Projects
    {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/projects/national-bank.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
        dest: 'public/images/projects/apex-logistics.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1509391366360-1e97d5261688?auto=format&fit=crop&w=800&q=80',
        dest: 'public/images/projects/solar-complex.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/projects/fire-defense.jpg'
    },

    // Industries
    {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/industries/corporate.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/industries/industrial.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/industries/residential.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
        dest: 'public/images/industries/logistics.jpg'
    },

    // Testimonials
    {
        url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
        dest: 'public/images/testimonials/babatunde.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        dest: 'public/images/testimonials/emeka.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        dest: 'public/images/testimonials/hauwa.jpg'
    }
];

async function downloadAll() {
    console.log('Downloading all website images to local public/images directory...');
    for (const item of IMAGES) {
        const fullDest = path.join(__dirname, '..', item.dest);
        const folder = path.dirname(fullDest);
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        try {
            const res = await fetch(item.url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const arrayBuffer = await res.arrayBuffer();
            fs.writeFileSync(fullDest, Buffer.from(arrayBuffer));
            console.log(`Saved: ${item.dest}`);
        } catch (err) {
            console.error(`Failed to download ${item.url}:`, err.message);
        }
    }
    console.log('Finished downloading images.');
}

downloadAll();
