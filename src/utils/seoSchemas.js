export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    "name": "Philux International",
    "alternateName": "Philux Security Services & Solar Solutions",
    "url": "https://philuxint.com.ng",
    "logo": "https://philuxint.com.ng/logo.png",
    "image": "https://philuxint.com.ng/logo.png",
    "description": "Trusted security services company in Nigeria providing CCTV camera installation, vehicle tracking, electric fencing, access control, and 24/7 solar inverter backup systems.",
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
    "name": "Philux Security & Energy Services",
    "itemListElement": [
        {
            "@type": "Service",
            "position": 1,
            "name": "Vehicle Tracking & Fleet Management",
            "description": "Live GPS vehicle tracking on your phone, remote engine shutoff, speed alerts, and route history across Nigeria.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 2,
            "name": "Solar & Inverter Power Backup",
            "description": "Reliable solar panels and long-life inverter batteries to keep security cameras and home appliances powered 24/7 without blackouts.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 3,
            "name": "CCTV Camera Surveillance",
            "description": "High-definition security cameras with night vision, motion alerts, and live smartphone streaming for homes and businesses.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 4,
            "name": "Perimeter Electric Fencing",
            "description": "High-voltage deterrent perimeter fencing with loud alarm sirens to prevent intruder access into compounds and estates.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 5,
            "name": "Biometric Access Control",
            "description": "Biometric fingerprint locks, RFID card entry, automated gate barriers, and staff attendance recording systems.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        },
        {
            "@type": "Service",
            "position": 6,
            "name": "Fire Alarm & Safety Systems",
            "description": "Smoke and heat detectors, emergency alarm sirens, and automated fire suppression systems.",
            "provider": { "@type": "Organization", "name": "Philux International" }
        }
    ]
};

export const createBlogPostSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) : "Security tips, car safety advice, and insights from Philux International.",
    "image": post.imageUrl ? [post.imageUrl] : ["https://philuxint.com.ng/logo.png"],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
        "@type": "Organization",
        "name": "Philux Security Team",
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
    "name": "Philux Security Equipment & Solar Store",
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
