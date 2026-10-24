/**
 * Advanced Headless WPGraphQL Engine
 * Interfacing Next.js SSG / Dynamic Client with WordPress & WooCommerce WPGraphQL
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.philuxint.com.ng/graphql';

// --- MOCK FALLBACK DATA ---
const MOCK_CATEGORIES = [
    { id: 10, name: "Security Systems", slug: "security-systems" },
    { id: 11, name: "Solar & Energy", slug: "solar-energy" },
    { id: 12, name: "Vehicle Tracking", slug: "vehicle-tracking" },
    { id: 13, name: "Facility Safety", slug: "facility-safety" },
    { id: 14, name: "Featured Projects", slug: "projects" },
];

const MOCK_POSTS = [
    {
        id: 100,
        slug: "complete-guide-to-cctv-surveillance-in-nigeria",
        title: "Complete Guide to CCTV Surveillance for Nigerian Homes & Businesses",
        excerpt: "Learn how to choose the right CCTV cameras, position them effectively, and ensure 24/7 recording even during power outages in Nigeria.",
        content: `<p>Security is a paramount concern for homeowners and commercial enterprise operators across Nigeria. Installing a dependable Closed-Circuit Television (CCTV) system is the single most effective deterrence against unauthorized intrusion and property theft.</p>
        <h3>1. IP Digital Cameras vs. Traditional Analogue</h3>
        <p>While traditional coax-based analogue cameras remain budget-friendly, IP digital cameras transmit high-resolution video (up to 4K) over Ethernet cables (PoE). This provides crystal-clear license plate recognition and facial identification.</p>
        <h3>2. 24/7 Power Continuity with Inverters</h3>
        <p>In Nigeria, the primary vulnerability of security surveillance is power grid instability. A CCTV system without dedicated inverter backup goes blind the moment NEPA/Disco cuts supply. At Philux International, all our surveillance designs incorporate continuous solar and battery backup.</p>
        <h3>3. Remote Mobile Monitoring</h3>
        <p>Modern Network Video Recorders (NVRs) allow live streaming directly to your iOS or Android smartphone from anywhere in the world, complete with instant motion-detection push alerts.</p>`,
        date: "2026-10-15",
        imageUrl: "/images/cctv_surveillance.webp",
        categoryId: 10,
        categoryName: "Security Systems",
        tags: ["CCTV", "Surveillance", "Smart Home", "Security"]
    },
    {
        id: 99,
        slug: "solar-inverter-maintenance-tips-rainy-dry-season",
        title: "How to Maintain Your Solar & Inverter System in Nigeria",
        excerpt: "Maximize your battery lifespan and optimize solar panel efficiency throughout the dusty Harmattan and rainy seasons in Nigeria.",
        content: `<p>A solar and inverter installation represents a significant capital investment. Proper seasonal maintenance ensures your lithium or tubular battery banks achieve their rated 5-10 year lifespan while keeping your security systems permanently powered.</p>
        <h3>Harmattan Dust Accumulation</h3>
        <p>During the dry harmattan months, dust settling on photovoltaic panels can reduce power generation by up to 35%. Gently rinsing panels early in the morning with clean water restores full wattage output.</p>
        <h3>Battery Bank Health Checks</h3>
        <p>Ensure your inverter charge controller is calibrated to your battery chemistry (Lithium LiFePO4, Gel, or Tubular). Avoid discharging deep-cycle lead-acid batteries beyond 50% Depth of Discharge (DoD) to extend cell longevity.</p>`,
        date: "2026-10-10",
        imageUrl: "/images/solar_energy.webp",
        categoryId: 11,
        categoryName: "Solar & Energy",
        tags: ["Solar", "Inverter", "Clean Energy", "Power Backup"]
    },
    {
        id: 98,
        slug: "real-time-vehicle-tracking-features-for-nigerian-fleets",
        title: "Must-Have Features in a Vehicle Tracking System in Nigeria",
        excerpt: "From remote engine shutoff to fuel monitoring and geo-fencing, discover essential GPS tracking features for Nigerian vehicle owners.",
        content: `<p>Vehicle theft and unauthorized asset diversion pose persistent challenges for private car owners and commercial fleet managers across Nigeria. Modern GPS telematics offers much more than a simple map pin.</p>
        <h3>1. Remote Engine Immobilization</h3>
        <p>The ability to securely cut off the engine ignition via SMS or a mobile app instantly disables a stolen vehicle, preventing criminal escape before recovery teams arrive.</p>
        <h3>2. Geo-Fencing & Route Deviation Alerts</h3>
        <p>Receive immediate smartphone notifications if a vehicle crosses designated city limits or state borders outside authorized operating hours.</p>
        <h3>3. Real-Time Fuel Level Monitoring</h3>
        <p>Detect rapid drops in fuel tank capacity indicative of fuel theft or siphoning, protecting logistics profit margins.</p>`,
        date: "2026-10-05",
        imageUrl: "/images/vehicle_tracking.webp",
        categoryId: 12,
        categoryName: "Vehicle Tracking",
        tags: ["GPS Tracking", "Fleet Management", "Vehicle Security"]
    },
    {
        id: 97,
        slug: "electric-fence-installation-safety-regulations-nigeria",
        title: "Electric Fencing: Safety, Legal Guidelines & Perimeter Defense",
        excerpt: "Understand how non-lethal high-voltage electric perimeter fencing works and the necessary warning sign protocols for residential estates.",
        content: `<p>Electric perimeter fencing provides an active psychological and physical barrier against intruders. Operating via high-voltage, non-lethal pulsed energizers, it delivers a memorable shock while instantly triggering high-decibel sirens upon line tampering or cutting.</p>
        <h3>Key Regulations</h3>
        <p>Always install visible yellow warning signs every 10 meters along perimeter walls and ensure the lowest electric wire sits at least 1.8 meters above ground level to prevent accidental contact by children and pets.</p>`,
        date: "2026-09-28",
        imageUrl: "/images/electric_fencing.webp",
        categoryId: 10,
        categoryName: "Security Systems",
        tags: ["Electric Fence", "Perimeter Security", "Estate Safety"]
    },
    {
        id: 96,
        slug: "biometric-access-control-for-corporate-offices",
        title: "Upgrading to Biometric Access Control for Corporate Facilities",
        excerpt: "Eliminate lost keycards and unauthorized entry with biometric fingerprint and facial recognition access control terminals.",
        content: `<p>Traditional keycard badges and physical keys can be copied, lost, or shared. Biometric terminals ensure that only verified personnel can gain entry to server rooms, executive offices, and secure inventory depots.</p>
        <h3>Time and Attendance Integration</h3>
        <p>Modern access control systems automatically sync employee clock-in data with HR payroll software, streamlining personnel records with foolproof accuracy.</p>`,
        date: "2026-09-20",
        imageUrl: "/images/access_control.webp",
        categoryId: 13,
        categoryName: "Facility Safety",
        tags: ["Access Control", "Biometrics", "Corporate Security"]
    }
];

// --- GRAPHQL FETCH HANDLER ---
async function fetchGraphQL(query, variables = {}) {
    if (!WP_API_URL) return null;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const res = await fetch(WP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query, variables }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            console.warn(`[WPGraphQL] HTTP status ${res.status} from ${WP_API_URL}`);
            return null;
        }

        const json = await res.json();
        if (json.errors) {
            console.warn("[WPGraphQL] Query returned errors:", json.errors);
            return null;
        }

        return json.data;
    } catch (err) {
        console.warn("[WPGraphQL] Fetch failed, falling back to local data:", err.message);
        return null;
    }
}

// Helper to decode HTML entities like &#8217;, &amp;, etc.
function decodeHtml(html = '') {
    return html
        .replace(/&#8217;/g, "’")
        .replace(/&#8216;/g, "‘")
        .replace(/&#8220;/g, "“")
        .replace(/&#8221;/g, "”")
        .replace(/&#038;/g, "&")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

// ==========================================
// BLOG POST QUERIES
// ==========================================

export const PHILUX_BLOG_CATEGORIES = [
    { name: 'CCTV Surveillance', slug: 'cctv-surveillance' },
    { name: 'Solar & Inverter', slug: 'solarinverter', alternateSlug: 'solar-inverter' },
    { name: 'Access Control', slug: 'access-control' },
    { name: 'Vehicle Tracking', slug: 'vehicle-tracking' },
    { name: 'Electric Fencing', slug: 'electric-fencing' },
    { name: 'Facility Safety', slug: 'facility-safety' },
    { name: 'Projects', slug: 'projects' }
];

export const getCategories = async () => {
    let liveCats = [];
    if (WP_API_URL) {
        try {
            const query = `
                query getCategoriesQuery {
                    categories(first: 50) {
                        nodes {
                            databaseId
                            name
                            slug
                            count
                        }
                    }
                }
            `;
            const data = await fetchGraphQL(query);
            if (data?.categories?.nodes?.length) {
                liveCats = data.categories.nodes
                    .filter(c => c.slug?.toLowerCase() !== 'uncategorized')
                    .map(c => ({
                        id: c.databaseId,
                        name: decodeHtml(c.name),
                        slug: c.slug
                    }));
            }
        } catch (err) {
            console.warn("getCategories fallback:", err.message);
        }
    }

    // Merge in standardized Philux categories in priority order so all services are always available
    const merged = [];
    const seenSlugs = new Set();
    const seenNames = new Set();

    PHILUX_BLOG_CATEGORIES.forEach((def, index) => {
        const liveMatch = liveCats.find(c => 
            c.slug.toLowerCase() === def.slug.toLowerCase() ||
            (def.alternateSlug && c.slug.toLowerCase() === def.alternateSlug.toLowerCase()) ||
            c.name.toLowerCase() === def.name.toLowerCase()
        );
        if (liveMatch) {
            merged.push(liveMatch);
            seenSlugs.add(liveMatch.slug.toLowerCase());
            seenNames.add(liveMatch.name.toLowerCase());
        } else {
            const fallbackCat = { id: 900 + index, name: def.name, slug: def.slug };
            merged.push(fallbackCat);
            seenSlugs.add(def.slug.toLowerCase());
            seenNames.add(def.name.toLowerCase());
        }
    });

    // Include any additional custom categories created in WordPress backend
    liveCats.forEach(c => {
        if (!seenSlugs.has(c.slug.toLowerCase()) && !seenNames.has(c.name.toLowerCase())) {
            merged.push(c);
            seenSlugs.add(c.slug.toLowerCase());
            seenNames.add(c.name.toLowerCase());
        }
    });

    return merged;
};

export const getPosts = async (first = 6, after = null, categoryId = null) => {
    if (!WP_API_URL) {
        return { posts: MOCK_POSTS, pageInfo: { hasNextPage: false, endCursor: null } };
    }

    try {
        const query = `
            query getPostsQuery($first: Int!, $after: String, $categoryIn: [ID]) {
                posts(first: $first, after: $after, where: { categoryIn: $categoryIn, status: PUBLISH }) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {
                        databaseId
                        slug
                        title
                        excerpt
                        content
                        date
                        featuredImage {
                            node {
                                sourceUrl
                                altText
                            }
                        }
                        categories {
                            nodes {
                                databaseId
                                name
                                slug
                            }
                        }
                        tags {
                            nodes {
                                name
                            }
                        }
                    }
                }
            }
        `;

        const variables = { first, after, categoryIn: categoryId ? [categoryId] : null };
        const data = await fetchGraphQL(query, variables);

        if (data?.posts?.nodes?.length) {
            const posts = data.posts.nodes.map(post => {
                const cleanExcerpt = post.excerpt
                    ? decodeHtml(post.excerpt.replace(/(<([^>]+)>)/gi, "").trim())
                    : "";

                // Prioritize user-created categories over default 'Uncategorized'
                const allCats = post.categories?.nodes || [];
                const customCat = allCats.find(c => c.slug.toLowerCase() !== 'uncategorized');
                const selectedCat = customCat || allCats[0] || null;

                const categoryName = selectedCat
                    ? (selectedCat.slug.toLowerCase() === 'uncategorized' ? 'Security' : decodeHtml(selectedCat.name))
                    : "Security";

                return {
                    id: post.databaseId,
                    slug: post.slug,
                    title: decodeHtml(post.title || "Untitled Post"),
                    excerpt: cleanExcerpt,
                    content: post.content || "",
                    date: post.date ? new Date(post.date).toISOString().split('T')[0] : "Recent",
                    imageUrl: post.featuredImage?.node?.sourceUrl || "/images/cctv_surveillance.webp",
                    categoryId: selectedCat?.databaseId || null,
                    categoryName: categoryName,
                    tags: post.tags?.nodes?.map(t => decodeHtml(t.name)) || []
                };
            });

            return { posts, pageInfo: data.posts.pageInfo };
        }
    } catch (err) {
        console.warn("getPosts fallback:", err.message);
    }

    // Filter mock posts if categoryId was specified
    const filteredMock = categoryId
        ? MOCK_POSTS.filter(p => p.categoryId === categoryId)
        : MOCK_POSTS;

    return { posts: filteredMock, pageInfo: { hasNextPage: false, endCursor: null } };
};

export const getAllPostIds = async () => {
    if (!WP_API_URL) return MOCK_POSTS.map(p => p.id.toString());

    try {
        const query = `
            query getAllPostIds {
                posts(first: 100, where: { status: PUBLISH }) {
                    nodes {
                        databaseId
                        slug
                    }
                }
            }
        `;
        const data = await fetchGraphQL(query);
        if (data?.posts?.nodes?.length) {
            const paths = [];
            data.posts.nodes.forEach(p => {
                if (p.databaseId) paths.push(p.databaseId.toString());
                if (p.slug) paths.push(p.slug);
            });
            return Array.from(new Set(paths));
        }
    } catch (err) {
        console.warn("getAllPostIds fallback:", err.message);
    }

    return MOCK_POSTS.map(p => p.id.toString());
};

export const getSinglePost = async (idOrSlug) => {
    if (!idOrSlug) return null;

    const isNumeric = /^\d+$/.test(String(idOrSlug));
    const numericId = isNumeric ? parseInt(idOrSlug, 10) : null;

    if (!WP_API_URL) {
        return MOCK_POSTS.find(p => (numericId ? p.id === numericId : p.slug === idOrSlug)) || MOCK_POSTS[0];
    }

    try {
        const query = `
            query getPostById($id: ID!, $idType: PostIdType!) {
                post(id: $id, idType: $idType) {
                    databaseId
                    slug
                    title
                    content
                    excerpt
                    date
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    categories {
                        nodes {
                            databaseId
                            name
                            slug
                        }
                    }
                    tags {
                        nodes {
                            name
                        }
                    }
                    author {
                        node {
                            name
                        }
                    }
                }
            }
        `;

        const variables = {
            id: String(idOrSlug),
            idType: isNumeric ? 'DATABASE_ID' : 'SLUG'
        };

        const data = await fetchGraphQL(query, variables);
        const post = data?.post;

        if (post) {
            // Prioritize custom categories over 'Uncategorized'
            const allCats = post.categories?.nodes || [];
            const customCat = allCats.find(c => c.slug.toLowerCase() !== 'uncategorized');
            const selectedCat = customCat || allCats[0] || null;

            const categoryName = selectedCat
                ? (selectedCat.slug.toLowerCase() === 'uncategorized' ? 'Security' : decodeHtml(selectedCat.name))
                : "Security";

            return {
                id: post.databaseId,
                slug: post.slug,
                title: decodeHtml(post.title || "Untitled"),
                content: post.content || "<p>No content provided.</p>",
                excerpt: post.excerpt ? decodeHtml(post.excerpt.replace(/(<([^>]+)>)/gi, "").trim()) : "",
                date: post.date ? new Date(post.date).toISOString().split('T')[0] : "Recent",
                imageUrl: post.featuredImage?.node?.sourceUrl || "/images/cctv_surveillance.webp",
                categoryId: selectedCat?.databaseId || null,
                categoryName: categoryName,
                tags: post.tags?.nodes?.map(t => decodeHtml(t.name)) || [],
                author: post.author?.node?.name || "Philux Editorial Team"
            };
        }
    } catch (err) {
        console.warn("getSinglePost fallback:", err.message);
    }

    return MOCK_POSTS.find(p => (numericId ? p.id === numericId : p.slug === idOrSlug)) || null;
};

// ==========================================
// COMMENTS QUERIES & MUTATIONS (WPGraphQL)
// ==========================================

export const getComments = async (postId) => {
    if (!WP_API_URL || !postId) return [];

    try {
        const query = `
            query getComments($postId: ID!) {
                post(id: $postId, idType: DATABASE_ID) {
                    comments(first: 100, where: { order: ASC }) {
                        nodes {
                            databaseId
                            content
                            date
                            parentDatabaseId
                            author {
                                node {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        `;

        const data = await fetchGraphQL(query, { postId: String(postId) });
        if (data?.post?.comments?.nodes) {
            return data.post.comments.nodes.map(c => ({
                id: c.databaseId,
                content: c.content,
                date: c.date ? new Date(c.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
                parentId: c.parentDatabaseId || null,
                author_name: decodeHtml(c.author?.node?.name || "Anonymous Reader")
            }));
        }
    } catch (err) {
        console.warn("GraphQL comments fetch error:", err.message);
    }

    return [];
};

export const submitComment = async (postId, authorName, authorEmail, content, parentId = 0) => {
    if (!postId || !authorName || !content) {
        throw new Error("Please fill in your name, email, and comment.");
    }

    try {
        const mutation = `
            mutation submitCommentMutation($commentOn: Int!, $author: String!, $authorEmail: String!, $content: String!, $parent: ID) {
                createComment(input: {
                    commentOn: $commentOn,
                    author: $author,
                    authorEmail: $authorEmail,
                    content: $content,
                    parent: $parent
                }) {
                    success
                    comment {
                        databaseId
                        content
                        date
                        parentDatabaseId
                        author {
                            node {
                                name
                            }
                        }
                    }
                }
            }
        `;

        const variables = {
            commentOn: parseInt(postId, 10),
            author: authorName,
            authorEmail: authorEmail,
            content: content,
            parent: parentId ? String(parentId) : null
        };

        const data = await fetchGraphQL(mutation, variables);
        const created = data?.createComment?.comment;

        if (created) {
            return {
                id: created.databaseId,
                content: created.content,
                date: "Just now",
                parentId: created.parentDatabaseId || null,
                author_name: decodeHtml(created.author?.node?.name || authorName),
                isPending: false
            };
        }

        if (data?.createComment?.success) {
            return {
                id: Date.now(),
                content: `<p>${content}</p>`,
                date: "Just now",
                parentId: parentId || null,
                author_name: authorName,
                isPending: false
            };
        }
    } catch (gqlErr) {
        throw new Error(gqlErr.message || "Failed to submit comment to WordPress.");
    }

    throw new Error("Could not connect to WordPress comments API. Please check your network.");
};

// ==========================================
// WOOCOMMERCE PRODUCT QUERIES
// ==========================================
export const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Philux 4K Matrix Dome IP CCTV Camera',
        slug: 'philux-4k-matrix-dome-cctv',
        category: 'CCTV Surveillance',
        price: '₦299,000',
        rawPrice: 299000,
        img: '/images/cctv_surveillance.webp',
        galleryImages: [
            '/images/cctv_surveillance.webp',
            '/images/services/cctv-surveillance.jpg',
            '/images/cctv_surveillance.png'
        ],
        shortDescription: '4K Ultra-HD PoE IP Dome Camera with 30m Smart IR Night Vision, AI Human/Vehicle Motion Detection, and IP67 Weatherproof rating.',
        description: '<p>The Philux 4K Matrix Dome IP Camera delivers uncompromising ultra-high definition surveillance engineered specifically for Nigerian environmental challenges. Equipped with high-aperture optics and smart infrared illumination, it maintains sharp clarity in zero-light settings and during power cuts via PoE inverter backup.</p><p>Integrated AI human and vehicle classification filters out 99% of false triggers, sending instant push notifications directly to your smartphone with real-time video clips.</p>',
        specifications: [
            { label: 'Resolution', value: '4K Ultra HD (3840 × 2160) @ 30fps' },
            { label: 'Image Sensor', value: '1/2.8" Progressive Scan CMOS' },
            { label: 'Lens', value: '2.8mm Wide Angle (108° Field of View)' },
            { label: 'Night Vision', value: 'Smart IR up to 30 Meters (Auto Day/Night ICR)' },
            { label: 'Power Supply', value: 'Power over Ethernet (PoE 802.3af) or 12V DC' },
            { label: 'Weather Rating', value: 'IP67 Weatherproof & IK10 Vandal-Resistant' },
            { label: 'Storage', value: 'MicroSD slot up to 512GB & NVR Network Recording' },
            { label: 'Warranty', value: '2 Years Philux Replacement Guarantee' }
        ],
        inStock: true
    },
    {
        id: 2,
        name: 'Titan 5kW Pure Sine Wave Hybrid Solar Inverter',
        slug: 'titan-5kw-hybrid-solar-inverter',
        category: 'Solar & Inverter',
        price: '₦1,450,000',
        rawPrice: 1450000,
        img: '/images/solar_energy.webp',
        galleryImages: [
            '/images/solar_energy.webp',
            '/images/services/solar-inverter.jpg',
            '/images/solar_energy.png'
        ],
        shortDescription: '5kW 48V Hybrid Solar Inverter with 100A MPPT Solar Charge Controller, Pure Sine Wave output, and seamless generator auto-start.',
        description: '<p>The Titan 5kW Hybrid Inverter is Philux’s flagship power conversion unit designed to conquer unpredictable grid supply across Nigeria. With pure sine wave delivery, it safely powers inductive loads like deep freezers, borehole pumping machines, air conditioners, and sensitive servers.</p><p>Features integrated 100A MPPT maximizing photovoltaic harvest up to 500V DC and supports Lithium LiFePO4 battery communication via RS485/CAN bus.</p>',
        specifications: [
            { label: 'Rated Power', value: '5000W Continuous / 10,000VA Surge Capacity' },
            { label: 'DC System Voltage', value: '48V DC Nominal' },
            { label: 'Solar Controller', value: 'Integrated 100A MPPT (Max PV Input 500V DC)' },
            { label: 'Waveform', value: 'Pure Sine Wave (THD < 3%)' },
            { label: 'Transfer Speed', value: '< 10ms (Instantaneous UPS-grade transition)' },
            { label: 'Battery Chemistry', value: 'Lithium (LiFePO4), Gel, Sealed Lead-Acid, Tubular' },
            { label: 'Monitoring', value: 'Built-in Wi-Fi / GPRS Cloud Telemetry' },
            { label: 'Warranty', value: '3 Years Full Manufacturer Warranty' }
        ],
        inStock: true
    },
    {
        id: 3,
        name: 'Nexus Biometric Face & Fingerprint Access Terminal',
        slug: 'nexus-biometric-access-terminal',
        category: 'Access Control',
        price: '₦450,000',
        rawPrice: 450000,
        img: '/images/access_control.webp',
        galleryImages: [
            '/images/access_control.webp',
            '/images/services/access-control.jpg',
            '/images/access_control.png'
        ],
        shortDescription: 'AI Biometric Facial Recognition & Fingerprint Terminal with RFID Smartcard, Time-Attendance software, and Magnetic Door Lock control.',
        description: '<p>The Nexus Terminal integrates AI neural facial recognition with dual infrared illumination cameras, eliminating photo spoofing and recognizing personnel within 0.3 seconds even in complete darkness.</p><p>Connects directly to electromagnetic door locks, turnstiles, and automated vehicular barrier gates with automated staff time & attendance cloud synchronization.</p>',
        specifications: [
            { label: 'Verification Modes', value: 'Face Recognition, Fingerprint, RFID Card, PIN Code' },
            { label: 'Capacity', value: '3,000 Faces, 5,000 Fingerprints, 10,000 Cards' },
            { label: 'Recognition Speed', value: '< 0.3 seconds per user' },
            { label: 'Screen', value: '4.3-inch IPS HD Touch Display' },
            { label: 'Connectivity', value: 'TCP/IP Ethernet, Wi-Fi, USB, Wiegand 26/34 Output' },
            { label: 'Lock Interfaces', value: 'Direct Relay for 280kg/500kg Magnetic Locks' },
            { label: 'Software', value: 'Philux Cloud Attendance & Door Security Suite' },
            { label: 'Warranty', value: '2 Years Philux Commercial Warranty' }
        ],
        inStock: true
    },
    {
        id: 4,
        name: 'GPS Fleet Tracker Real-Time Unit with Engine Cut',
        slug: 'gps-fleet-tracker-real-time-unit',
        category: 'Vehicle Tracking',
        price: '₦85,000',
        rawPrice: 85000,
        img: '/images/vehicle_tracking.webp',
        galleryImages: [
            '/images/vehicle_tracking.webp',
            '/images/services/vehicle-tracking.jpg',
            '/images/vehicle_tracking.png'
        ],
        shortDescription: '4G LTE Vehicle GPS Tracker with Remote Engine Immobilization, Anti-Tamper Internal Battery, and Nationwide Real-Time Mobile Tracking.',
        description: '<p>Engineered for private car owners and fleet operations across Nigeria, this 4G tracker provides pinpoint live telemetry, speed alerts, and geofencing. In the event of theft or unauthorized movement, the vehicle engine can be immobilized instantly with one tap on your mobile phone.</p>',
        specifications: [
            { label: 'Network Band', value: '4G LTE Cat-1 with 2G GSM Fallback' },
            { label: 'Positioning Accuracy', value: '< 2.5 Meters CEP High Precision' },
            { label: 'Engine Kill', value: 'Safe Deceleration Ignition Cutoff Relay' },
            { label: 'Internal Battery', value: '450mAh Li-ion (Up to 12 Hours Standby Cut Alert)' },
            { label: 'Voltage Range', value: '9V - 90V DC (Sedans, SUVs, Haulage Trucks, Bikes)' },
            { label: 'Sensor Alerts', value: 'Ignition On/Off, Towing Vibration, Geo-fence Exit' },
            { label: 'Mobile App', value: 'iOS, Android & Web Fleet Dashboard (1 Year Included)' },
            { label: 'Warranty', value: '1 Year Full Replacement Warranty' }
        ],
        inStock: true
    },
    {
        id: 5,
        name: 'Perimeter Electric Fence Energizer 8-Joule Unit',
        slug: 'perimeter-electric-fence-energizer-8j',
        category: 'Electric Fencing',
        price: '₦320,000',
        rawPrice: 320000,
        img: '/images/electric_fencing.webp',
        galleryImages: [
            '/images/electric_fencing.webp',
            '/images/services/electric-fencing.jpg',
            '/images/electric_fencing.png'
        ],
        shortDescription: 'Heavy-duty 8-Joule High-Voltage Security Energizer with Strobe Siren Trigger, Tamper Detection, and Standby Battery Backup.',
        description: '<p>The Philux 8-Joule Energizer generates a pulsing 9.9kV deterrent shock capable of energizing up to 10 kilometers of stainless steel wire fencing. Built-in monitoring sensors immediately activate high-output sirens if intruder attempts to cut, short-circuit, or bridge the perimeter fence.</p>',
        specifications: [
            { label: 'Output Voltage', value: 'Up to 9,900 Volts Non-Lethal High-Voltage Pulse' },
            { label: 'Stored Energy', value: '8.0 Joules Energy Capacity' },
            { label: 'Fence Range', value: 'Up to 10km Multi-Strand Stainless / Aluminium Wire' },
            { label: 'Power Supply', value: '220V AC Grid with 12V 7Ah SLA Battery Backup' },
            { label: 'Alarm Triggering', value: 'Wire Cut, Wire Tamper, Earth Fault, Gate Breach' },
            { label: 'Alarm Outputs', value: '12V DC Relay for 120dB Strobe Siren & GSM Auto-dialer' },
            { label: 'Safety Standard', value: 'IEC 60335-2-76 Certified Safety Standards' },
            { label: 'Warranty', value: '2 Years Engineering Warranty' }
        ],
        inStock: true
    },
    {
        id: 6,
        name: 'Smart Addressable 4-Zone Fire Alarm Control Panel',
        slug: 'smart-addressable-fire-alarm-panel',
        category: 'Facility Safety',
        price: '₦280,000',
        rawPrice: 280000,
        img: '/images/services/fire-alarm.jpg',
        galleryImages: [
            '/images/services/fire-alarm.jpg',
            '/images/access_control.webp'
        ],
        shortDescription: '4-Zone Conventional Fire Alarm Control Panel with Smoke Detector Loop, Sounder Outputs, and 24V Standby Battery.',
        description: '<p>Designed for industrial buildings, warehouses, commercial banks, and estates, this 4-zone fire control panel complies with EN54 safety standards. It continuously monitors up to 128 smoke, heat, and flame sensors with dual sounder strobe circuit outputs.</p>',
        specifications: [
            { label: 'Zones', value: '4 Supervised Detection Zones (Up to 128 Detectors)' },
            { label: 'Compliance', value: 'EN54-2 and EN54-4 International Standard' },
            { label: 'Sounder Outputs', value: '2 Supervised 24V Alarm Outputs (1A Total)' },
            { label: 'Auxiliary Relays', value: 'Fire & Fault Relay for Elevator Recall & BMS' },
            { label: 'Cabinet', value: 'Heavy Gauge Cold-Rolled Steel Enclosure with Key Lock' },
            { label: 'Standby Power', value: 'Dual 12V 7Ah SLA Sealed Batteries (24V System)' },
            { label: 'Warranty', value: '2 Years Philux Safety Warranty' }
        ],
        inStock: true
    },
    {
        id: 7,
        name: 'Philux 8-Channel 4K Ultra-HD Network Video Recorder (NVR)',
        slug: 'philux-8ch-4k-nvr',
        category: 'CCTV Surveillance',
        price: '₦210,000',
        rawPrice: 210000,
        img: '/images/services/cctv-surveillance.jpg',
        galleryImages: [
            '/images/services/cctv-surveillance.jpg',
            '/images/cctv_surveillance.webp'
        ],
        shortDescription: '8-Channel PoE Network Video Recorder with 4K HDMI Output, AI Face Recognition, and 16TB Storage Capacity.',
        description: '<p>The Philux 8-Channel 4K NVR supports simultaneous high-bandwidth recording for up to 8 IP cameras with integrated Power over Ethernet (PoE) ports.</p>',
        specifications: [
            { label: 'Channels', value: '8 PoE IP Camera Channels' },
            { label: 'Max Resolution', value: '4K Ultra HD (3840 × 2160) Per Channel' },
            { label: 'Hard Drive Slots', value: '2 × SATA Ports (Up to 16TB Storage)' },
            { label: 'Network', value: 'Gigabit Ethernet & Mobile Cloud Remote P2P' },
            { label: 'Warranty', value: '2 Years Philux Guarantee' }
        ],
        inStock: true
    },
    {
        id: 8,
        name: 'Felicity Solar 10kWh Wall-Mount LiFePO4 Lithium Battery',
        slug: 'felicity-solar-10kwh-lithium-battery',
        category: 'Solar & Inverter',
        price: '₦2,850,000',
        rawPrice: 2850000,
        img: '/images/services/solar-inverter.jpg',
        galleryImages: [
            '/images/services/solar-inverter.jpg',
            '/images/solar_energy.webp'
        ],
        shortDescription: '10kWh 48V 200Ah Wall-Mount Lithium Iron Phosphate (LiFePO4) Battery with Smart BMS and 6,000+ Deep Cycles.',
        description: '<p>Designed for heavy domestic and commercial power backup in Nigeria. Features integrated smart Battery Management System (BMS) with RS485 and CAN communication.</p>',
        specifications: [
            { label: 'Nominal Energy', value: '10.24 kWh (48V / 200Ah)' },
            { label: 'Battery Chemistry', value: 'Grade-A Lithium Iron Phosphate (LiFePO4)' },
            { label: 'Cycle Life', value: '> 6,000 Cycles @ 80% Depth of Discharge' },
            { label: 'Max Discharge', value: '100A Continuous Discharge Rate' },
            { label: 'Warranty', value: '5 Years Manufacturer Warranty' }
        ],
        inStock: true
    },
    {
        id: 9,
        name: 'Heavy-Duty 1200kg Automatic Sliding Gate Motor Kit',
        slug: 'heavy-duty-sliding-gate-motor-kit',
        category: 'Access Control',
        price: '₦385,000',
        rawPrice: 385000,
        img: '/images/services/access-control.jpg',
        galleryImages: [
            '/images/services/access-control.jpg',
            '/images/access_control.webp'
        ],
        shortDescription: 'Industrial-grade 1200kg Automated Sliding Gate Operator with Remote Controls, Infrared Safety Beams, and Manual Key Override.',
        description: '<p>Equipped with copper-core mechanical gears and high-torque DC motor, engineered for continuous operation in hot Nigerian weather.</p>',
        specifications: [
            { label: 'Gate Capacity', value: 'Up to 1200kg Gate Weight' },
            { label: 'Motor Speed', value: '12 Meters / Minute Gate Travel' },
            { label: 'Safety Sensor', value: 'Dual Infrared Obstacle Anti-Crush Photocell Beams' },
            { label: 'Remote Frequency', value: '433.92MHz Rolling Code (Includes 2 Remotes)' },
            { label: 'Warranty', value: '2 Years Engineering Warranty' }
        ],
        inStock: true
    },
    {
        id: 10,
        name: 'Dual-SIM 4G Fleet GPS Tracker with Fuel Sensor Port',
        slug: 'dual-sim-4g-fleet-gps-tracker',
        category: 'Vehicle Tracking',
        price: '₦98,000',
        rawPrice: 98000,
        img: '/images/services/vehicle-tracking.jpg',
        galleryImages: [
            '/images/services/vehicle-tracking.jpg',
            '/images/vehicle_tracking.webp'
        ],
        shortDescription: 'Real-time 4G Dual-SIM Vehicle GPS Tracker with Fuel Level Sensor Interface, Driver ID RFID, and Voice Monitoring.',
        description: '<p>Advanced fleet intelligence tracker for haulage trucks and logistics vans in Nigeria, featuring dual-SIM redundancy and precision fuel theft monitoring.</p>',
        specifications: [
            { label: 'Cellular Band', value: '4G LTE with Dual-SIM Auto-Switching' },
            { label: 'Fuel Interface', value: 'RS232 / Analog Fuel Level Sensor Input' },
            { label: 'Engine Cutoff', value: 'Remote SMS & App Relay Immobilization' },
            { label: 'Tracking Interval', value: '10-Second Real-Time Telemetry Updates' },
            { label: 'Warranty', value: '1 Year Warranty' }
        ],
        inStock: true
    },
    {
        id: 11,
        name: 'Nemtek 8-Strand Stainless Steel Electric Fence Kit',
        slug: 'nemtek-8-strand-electric-fence-kit',
        category: 'Electric Fencing',
        price: '₦175,000',
        rawPrice: 175000,
        img: '/images/services/electric-fencing.jpg',
        galleryImages: [
            '/images/services/electric-fencing.jpg',
            '/images/electric_fencing.webp'
        ],
        shortDescription: 'Complete 8-Strand High-Tensile Stainless Steel Perimeter Security Fence Kit with UV-Stabilized Insulators and Compression Springs.',
        description: '<p>Premium South African Nemtek standard perimeter security hardware for residential compounds and commercial estates.</p>',
        specifications: [
            { label: 'Material', value: 'Grade 304 Marine Stainless Steel Wire' },
            { label: 'Strand Count', value: '8 High-Voltage Security Strands' },
            { label: 'Insulators', value: 'UV-Stabilized High-Density Plastic Insulators' },
            { label: 'Tensioners', value: 'Heavy Duty Compression Wire Springs & Ratchets' },
            { label: 'Warranty', value: '3 Years Corrosion Guarantee' }
        ],
        inStock: true
    },
    {
        id: 12,
        name: 'Wireless Interlinked Smoke & Heat Alarm Detector',
        slug: 'wireless-interlinked-smoke-detector',
        category: 'Facility Safety',
        price: '₦48,000',
        rawPrice: 48000,
        img: '/images/services/fire-alarm.jpg',
        galleryImages: [
            '/images/services/fire-alarm.jpg',
            '/images/access_control.webp'
        ],
        shortDescription: 'Photoelectric Smoke & Thermal Sensor with 85dB Siren and 10-Year Sealed Lithium Battery.',
        description: '<p>Interlinks wirelessly up to 24 units: when one detector triggers, all units across the building sound simultaneously for rapid evacuation.</p>',
        specifications: [
            { label: 'Sensor Type', value: 'Dual Photoelectric Smoke & Thermal Heat Sensor' },
            { label: 'Sound Output', value: '85dB Loud Evacuation Siren @ 3 Meters' },
            { label: 'Battery Life', value: '10-Year Sealed Lithium Cell (No Battery Replacements)' },
            { label: 'Interlink Range', value: 'Up to 100 Meters Wireless RF Mesh Network' },
            { label: 'Warranty', value: '5 Years Manufacturer Warranty' }
        ],
        inStock: true
    }
];

export const PHILUX_SHOP_CATEGORIES = [
    { name: 'CCTV Surveillance', slug: 'cctv-surveillance' },
    { name: 'Solar & Inverter', slug: 'solar-inverter', alternateSlug: 'solarinverter' },
    { name: 'Access Control', slug: 'access-control' },
    { name: 'Vehicle Tracking', slug: 'vehicle-tracking' },
    { name: 'Electric Fencing', slug: 'electric-fencing' },
    { name: 'Facility Safety', slug: 'facility-safety' }
];

export const getProductCategories = async () => {
    let liveCats = [];
    if (WP_API_URL) {
        try {
            const query = `
                query getProductCategoriesQuery {
                    productCategories(first: 50, where: { hideEmpty: false }) {
                        nodes {
                            databaseId
                            name
                            slug
                        }
                    }
                }
            `;
            const data = await fetchGraphQL(query);
            if (data?.productCategories?.nodes?.length) {
                liveCats = data.productCategories.nodes
                    .filter(c => c.slug?.toLowerCase() !== 'uncategorized')
                    .map(c => ({
                        id: c.databaseId,
                        name: decodeHtml(c.name),
                        slug: c.slug
                    }));
            }
        } catch (e) {
            console.warn("WooCommerce getProductCategories fallback:", e.message);
        }
    }

    // Merge in standardized Philux shop categories so all equipment categories are always listed
    const merged = [];
    const seenSlugs = new Set();
    const seenNames = new Set();

    PHILUX_SHOP_CATEGORIES.forEach((def, index) => {
        const liveMatch = liveCats.find(c =>
            c.slug.toLowerCase() === def.slug.toLowerCase() ||
            (def.alternateSlug && c.slug.toLowerCase() === def.alternateSlug.toLowerCase()) ||
            c.name.toLowerCase() === def.name.toLowerCase()
        );
        if (liveMatch) {
            merged.push(liveMatch);
            seenSlugs.add(liveMatch.slug.toLowerCase());
            seenNames.add(liveMatch.name.toLowerCase());
        } else {
            const placeholder = { id: 800 + index, name: def.name, slug: def.slug };
            merged.push(placeholder);
            seenSlugs.add(def.slug.toLowerCase());
            seenNames.add(def.name.toLowerCase());
        }
    });

    // Include any additional custom categories created in WooCommerce backend
    liveCats.forEach(c => {
        if (!seenSlugs.has(c.slug.toLowerCase()) && !seenNames.has(c.name.toLowerCase())) {
            merged.push(c);
            seenSlugs.add(c.slug.toLowerCase());
            seenNames.add(c.name.toLowerCase());
        }
    });

    return merged;
};

const cleanPrice = (val) => {
    if (!val) return null;
    let s = String(val).trim();
    if (!s.includes('₦') && !isNaN(Number(s))) {
        s = `₦${Number(s).toLocaleString()}`;
    }
    return s;
};

const getNumericPrice = (str) => {
    if (!str) return 0;
    const num = parseFloat(String(str).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
};

const calcDiscountPercent = (regular, sale) => {
    const regNum = getNumericPrice(regular);
    const saleNum = getNumericPrice(sale);
    if (regNum > 0 && saleNum > 0 && regNum > saleNum) {
        const pct = Math.round(((regNum - saleNum) / regNum) * 100);
        return pct > 0 ? `${pct}%` : null;
    }
    return null;
};

const processProductPricing = (p) => {
    const regularPrice = cleanPrice(p.regularPrice);
    const salePrice = cleanPrice(p.salePrice);
    const fallbackPrice = cleanPrice(p.price);

    const now = Date.now();
    let isSaleActive = false;
    let saleEndDate = null;

    if (salePrice && regularPrice && salePrice !== regularPrice) {
        if (p.dateOnSaleTo) {
            const endTs = new Date(p.dateOnSaleTo).getTime();
            if (!isNaN(endTs)) {
                if (now <= endTs) {
                    isSaleActive = true;
                    saleEndDate = p.dateOnSaleTo;
                } else {
                    // Sale period has expired: only regular price should be displayed
                    isSaleActive = false;
                    saleEndDate = null;
                }
            } else {
                isSaleActive = true;
            }
        } else {
            // Ongoing sale without an expiry date
            isSaleActive = true;
        }
    }

    if (isSaleActive) {
        return {
            price: salePrice,
            regularPrice: regularPrice,
            salePrice: salePrice,
            onSale: true,
            saleEndDate: saleEndDate,
            discountPercent: calcDiscountPercent(regularPrice, salePrice)
        };
    } else {
        const display = regularPrice || fallbackPrice || "Contact for Price";
        return {
            price: display,
            regularPrice: null,
            salePrice: null,
            onSale: false,
            saleEndDate: null,
            discountPercent: null
        };
    }
};

const parseSpecifications = (description = '', shortDescription = '', catName = 'Security Equipment') => {
    const specs = [];
    const combined = `${shortDescription || ''} ${description || ''}`;

    // 1. Table rows: <tr><td>Label</td><td>Value</td></tr>
    const rowMatches = combined.matchAll(/<tr[^>]*>\s*<t[dh][^>]*>([\s\S]*?)<\/t[dh]>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi);
    for (const match of rowMatches) {
        const label = decodeHtml(match[1].replace(/<[^>]+>/g, '').trim());
        const value = decodeHtml(match[2].replace(/<[^>]+>/g, '').trim());
        if (label && value && !label.toLowerCase().includes('feature') && !label.toLowerCase().includes('specification')) {
            specs.push({ label, value });
        }
    }
    if (specs.length > 0) return specs;

    // 2. List items: <li>...</li>
    const listMatches = combined.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const match of listMatches) {
        const cleanItem = decodeHtml(match[1].replace(/<[^>]+>/g, '').trim());
        if (!cleanItem || cleanItem.toLowerCase().includes('http')) continue;

        const colonIdx = cleanItem.indexOf(':');
        if (colonIdx > 1 && colonIdx < 45) {
            const label = cleanItem.slice(0, colonIdx).trim();
            const value = cleanItem.slice(colonIdx + 1).trim();
            if (label && value) {
                specs.push({ label, value });
                continue;
            }
        }
        if (cleanItem.length > 2 && cleanItem.length < 150) {
            specs.push({ label: '', value: cleanItem });
        }
    }
    if (specs.length > 0) return specs;

    // 3. Paragraphs or break-separated lines: Label: Value
    const cleanText = decodeHtml(combined.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, ''));
    const lines = cleanText.split('\n');
    for (const line of lines) {
        const trimmed = line.trim().replace(/^[•\-\*]\s*/, '');
        if (!trimmed || trimmed.toLowerCase().includes('http')) continue;

        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > 1 && colonIdx < 45) {
            const label = trimmed.slice(0, colonIdx).trim();
            const value = trimmed.slice(colonIdx + 1).trim();
            if (label && value && label.length < 35 && value.length < 180) {
                specs.push({ label, value });
            }
        }
    }
    if (specs.length > 0) return specs;

    return [
        { label: 'Category', value: catName },
        { label: 'Condition', value: '100% Brand New & Factory Sealed' },
        { label: 'Authenticity', value: 'Genuine Certified Equipment' },
        { label: 'Warranty', value: 'Full Philux Warranty Included' },
        { label: 'Installation', value: 'Nationwide Professional Installation Available' }
    ];
};

export const getProducts = async (first = 24) => {
    if (!WP_API_URL) return { products: MOCK_PRODUCTS };
    try {
        const query = `
            query getProductsQuery {
                products(first: ${first}) {
                    nodes {
                        databaseId
                        name
                        slug
                        description
                        shortDescription
                        image { sourceUrl altText }
                        galleryImages {
                            nodes {
                                sourceUrl
                                altText
                            }
                        }
                        productCategories { nodes { databaseId name slug } }
                        ... on SimpleProduct {
                            price
                            regularPrice
                            salePrice
                            onSale
                            dateOnSaleFrom
                            dateOnSaleTo
                        }
                        ... on VariableProduct {
                            price
                            regularPrice
                            salePrice
                            onSale
                            dateOnSaleFrom
                            dateOnSaleTo
                        }
                    }
                }
            }
        `;

        const data = await fetchGraphQL(query);
        if (data?.products?.nodes?.length) {
            const liveProducts = data.products.nodes.map(p => {
                const mainImg = p.image?.sourceUrl || "/images/cctv_surveillance.webp";
                const otherImages = (p.galleryImages?.nodes || []).map(g => g.sourceUrl).filter(Boolean);
                const gallery = [mainImg, ...otherImages];

                // Filter out 'uncategorized'
                const customCat = (p.productCategories?.nodes || []).find(c => c.slug?.toLowerCase() !== 'uncategorized');
                const catName = customCat ? decodeHtml(customCat.name) : "Security Equipment";

                // Prices & Scheduled Sale calculation
                const pricing = processProductPricing(p);

                return {
                    id: p.databaseId,
                    name: decodeHtml(p.name),
                    slug: p.slug,
                    img: mainImg,
                    galleryImages: gallery.length > 0 ? gallery : [mainImg],
                    category: catName,
                    price: pricing.price,
                    regularPrice: pricing.regularPrice,
                    salePrice: pricing.salePrice,
                    onSale: pricing.onSale,
                    saleEndDate: pricing.saleEndDate,
                    discountPercent: pricing.discountPercent,
                    description: p.description || p.shortDescription || "",
                    shortDescription: p.shortDescription ? decodeHtml(p.shortDescription.replace(/(<([^>]+)>)/gi, "").trim()) : "",
                    specifications: parseSpecifications(p.description, p.shortDescription, catName),
                    inStock: true
                };
            });

            // Put live WooCommerce products at the front, followed by remaining demo models
            const liveNames = new Set(liveProducts.map(lp => lp.name.toLowerCase()));
            const complementary = MOCK_PRODUCTS.filter(m => !liveNames.has(m.name.toLowerCase()));
            const allProducts = [...liveProducts, ...complementary];

            return { products: allProducts };
        }
    } catch (e) {
        console.warn("WooCommerce GraphQL getProducts fallback:", e.message);
    }
    return { products: MOCK_PRODUCTS };
};

export const getSingleProduct = async (idOrSlug) => {
    const isNum = !isNaN(Number(idOrSlug));
    const fallback = MOCK_PRODUCTS.find(p => isNum ? p.id === Number(idOrSlug) : p.slug === idOrSlug) || MOCK_PRODUCTS[0];
    if (!WP_API_URL) return fallback;

    try {
        const query = `
            query getSingleProduct($id: ID!, $idType: ProductIdTypeEnum!) {
                product(id: $id, idType: $idType) {
                    databaseId
                    name
                    slug
                    description
                    shortDescription
                    image { sourceUrl altText }
                    galleryImages {
                        nodes {
                            sourceUrl
                            altText
                        }
                    }
                    productCategories { nodes { databaseId name slug } }
                    ... on SimpleProduct {
                        price
                        regularPrice
                        salePrice
                        onSale
                        dateOnSaleFrom
                        dateOnSaleTo
                    }
                    ... on VariableProduct {
                        price
                        regularPrice
                        salePrice
                        onSale
                        dateOnSaleFrom
                        dateOnSaleTo
                    }
                }
            }
        `;
        const variables = {
            id: String(idOrSlug),
            idType: isNum ? 'DATABASE_ID' : 'SLUG'
        };
        const data = await fetchGraphQL(query, variables);
        const p = data?.product;
        if (p) {
            const mainImg = p.image?.sourceUrl || "/images/cctv_surveillance.webp";
            const otherImages = (p.galleryImages?.nodes || []).map(g => g.sourceUrl).filter(Boolean);
            const gallery = [mainImg, ...otherImages];

            const customCat = (p.productCategories?.nodes || []).find(c => c.slug?.toLowerCase() !== 'uncategorized');
            const catName = customCat ? decodeHtml(customCat.name) : "Security Equipment";

            const pricing = processProductPricing(p);

            return {
                id: p.databaseId,
                name: decodeHtml(p.name),
                slug: p.slug,
                img: mainImg,
                galleryImages: gallery.length > 0 ? gallery : [mainImg],
                category: catName,
                price: pricing.price,
                regularPrice: pricing.regularPrice,
                salePrice: pricing.salePrice,
                onSale: pricing.onSale,
                saleEndDate: pricing.saleEndDate,
                discountPercent: pricing.discountPercent,
                description: p.description || p.shortDescription || "",
                shortDescription: p.shortDescription ? decodeHtml(p.shortDescription.replace(/(<([^>]+)>)/gi, "").trim()) : "",
                specifications: parseSpecifications(p.description, p.shortDescription, catName),
                inStock: true
            };
        }
    } catch (e) {
        console.warn("getSingleProduct fallback:", e.message);
    }
    return fallback;
};
