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

export const getCategories = async () => {
    if (!WP_API_URL) return MOCK_CATEGORIES;

    try {
        const query = `
            query getCategoriesQuery {
                categories(first: 30) {
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
            // Filter out default 'Uncategorized' slug so site tabs only show professional categories
            const realCategories = data.categories.nodes
                .filter(c => c.slug.toLowerCase() !== 'uncategorized')
                .map(c => ({
                    id: c.databaseId,
                    name: decodeHtml(c.name),
                    slug: c.slug
                }));

            if (realCategories.length > 0) {
                return realCategories;
            }
        }
    } catch (err) {
        console.warn("getCategories fallback:", err.message);
    }

    return MOCK_CATEGORIES;
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
const MOCK_PRODUCTS = [
    { id: 1, name: 'Philux 4K Matrix Dome CCTV', category: 'CCTV Surveillance', price: '₦299,000', img: '/images/cctv_surveillance.webp' },
    { id: 2, name: 'Titan Solar Inverter 5kW System', category: 'Solar & Inverter', price: '₦1,250,000', img: '/images/solar_energy.webp' },
    { id: 3, name: 'Nexus Biometric Access Terminal', category: 'Access Control', price: '₦450,000', img: '/images/access_control.webp' },
    { id: 4, name: 'GPS Fleet Tracker Real-Time Unit', category: 'Vehicle Tracking', price: '₦85,000', img: '/images/vehicle_tracking.webp' },
    { id: 5, name: 'Perimeter Electric Fence Energizer 8J', category: 'Electric Fencing', price: '₦320,000', img: '/images/electric_fencing.webp' },
];

export const getProductCategories = async () => {
    if (!WP_API_URL) return [];
    try {
        const query = `
            query getProductCategoriesQuery {
                productCategories(first: 20, where: { hideEmpty: true }) {
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
            return data.productCategories.nodes.map(c => ({
                id: c.databaseId,
                name: decodeHtml(c.name),
                slug: c.slug
            }));
        }
    } catch (e) {
        console.warn("WooCommerce getProductCategories fallback:", e.message);
    }
    return [];
};

export const getProducts = async (first = 12) => {
    if (!WP_API_URL) return { products: MOCK_PRODUCTS };
    try {
        const query = `
            query getProductsQuery {
                products(first: ${first}) {
                    nodes {
                        databaseId
                        name
                        slug
                        image { sourceUrl }
                        productCategories { nodes { name } }
                        ... on SimpleProduct { price }
                        ... on VariableProduct { price }
                    }
                }
            }
        `;

        const data = await fetchGraphQL(query);
        if (data?.products?.nodes?.length) {
            const products = data.products.nodes.map(p => ({
                id: p.databaseId,
                name: decodeHtml(p.name),
                img: p.image?.sourceUrl || "/images/cctv_surveillance.webp",
                category: p.productCategories?.nodes[0]?.name ? decodeHtml(p.productCategories.nodes[0].name) : "Security",
                price: p.price || "Contact for Price"
            }));
            return { products };
        }
    } catch (e) {
        console.warn("WooCommerce GraphQL getProducts fallback:", e.message);
    }
    return { products: MOCK_PRODUCTS };
};
