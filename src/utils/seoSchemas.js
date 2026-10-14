export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    "name": "Philux International",
    "alternateName": "Philux Integrated Security & Energy Systems",
    "url": "https://philuxint.com.ng",
    "logo": "https://philuxint.com.ng/logo.png",
    "image": "https://philuxint.com.ng/logo.png",
    "description": "Pioneering integrated security, solar energy, CCTV surveillance, vehicle tracking, access control, and fire protection systems across Nigeria.",
    "telephone": "+2349064646062",
    "email": "engineering@philux.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "44, Engr Oyindamola street, Off Latols street, Governors Road, Ikotun",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos State",
        "postalCode": "100265",
        "addressCountry": "NG"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 6.5456,
        "longitude": 3.2685
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "10:00",
            "closes": "16:00"
        }
    ],
    "sameAs": [
        "https://www.facebook.com/philuxint",
        "https://www.instagram.com/philuxint/"
    ],
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "priceRange": "$$"
};

export const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Philux Engineering & Infrastructure Services",
    "itemListElement": [
        {
            "@type": "Service",
            "position": 1,
            "name": "Vehicle Tracking & Fleet Telematics",
            "description": "Satellite-grade real-time GPS telemetry, geofencing, fuel monitoring, and remote engine shutoff.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 2,
            "name": "Solar & Inverter Systems",
            "description": "High-efficiency monocrystalline solar panels and industrial deep-cycle inverter arrays for perpetual power continuity.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 3,
            "name": "CCTV Surveillance Systems",
            "description": "Commercial-grade AI optics, thermal night vision, facial recognition, and secure NVR systems.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 4,
            "name": "Electric Perimeter Fencing",
            "description": "High-voltage deterrent perimeter fencing with multi-zone alarm reporting and anti-tamper sensing.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 5,
            "name": "Biometric Access Control",
            "description": "Biometric scanners, RFID turnstiles, attendance tracking, and central facility lockdown management.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 6,
            "name": "Fire Alarm & Automated Sprinkler Systems",
            "description": "NFPA-compliant thermal sensors, smoke detectors, and automated suppression systems.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        }
    ]
};

export const createBlogPostSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) : "Engineering brief and insights from Philux International.",
    "image": post.imageUrl ? [post.imageUrl] : ["https://philuxint.com.ng/logo.png"],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
        "@type": "Organization",
        "name": "Philux International Engineering Team",
        "url": "https://philuxint.com.ng"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Philux International",
        "logo": {
            "@type": "ImageObject",
            "url": "https://philuxint.com.ng/logo.png"
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://philuxint.com.ng/blog/${post.id}`
    }
});

export const createShopSchema = (products = []) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Philux Commercial Hardware & Security Equipment",
    "itemListElement": products.map((product, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
            "@type": "Product",
            "name": product.name,
            "category": product.category,
            "image": product.img ? (product.img.startsWith('http') ? product.img : `https://philuxint.com.ng${product.img}`) : "https://philuxint.com.ng/logo.png",
            "offers": {
                "@type": "Offer",
                "priceCurrency": "NGN",
                "price": product.price ? product.price.replace(/[^0-9]/g, '') : "0",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Philux International"
                }
            }
        }
    }))
});
