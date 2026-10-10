/**
 * Advanced Headless WPGraphQL Engine
 * Utilizes Next.js / GraphQL API fetching.
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || '';

// --- MOCK FALLBACK DATA ---
const MOCK_CATEGORIES = [
    { id: 10, name: "Energy", slug: "energy" },
    { id: 11, name: "Security", slug: "security" },
    { id: 12, name: "Infrastructure", slug: "infrastructure" },
];

const MOCK_POSTS = Array.from({ length: 8 }).map((_, i) => ({
    id: 100 - i,
    title: `Mock Post Array Template ${i + 1}`,
    excerpt: `This is dynamically generated mock data simulating a GraphQL payload structure.`,
    content: `<p>Full Content Loaded.</p>`,
    date: new Date(Date.now() - i * 86400000 * 3).toISOString().split('T')[0],
    imageUrl: `https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80`,
    categoryId: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
    categoryName: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].name,
    tags: ["Technology", "Systems"]
}));

// --- GRAPHQL FETCH HANDLER ---
async function fetchGraphQL(query, variables = {}) {
    if (!WP_API_URL) return null;
    const res = await fetch(WP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
        // Next.js cache tuning for fresh fetches
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Network latency on GraphQL relay");
    const json = await res.json();
    if (json.errors) throw new Error("GraphQL Syntax Error");
    return json.data;
}

// ==========================================
// BLOG POST QUERIES
// ==========================================

export const getCategories = async () => {
    if (!WP_API_URL) return MOCK_CATEGORIES;

    const query = `
        query {
            categories(where: { hideEmpty: true }) {
                nodes {
                    databaseId
                    name
                    slug
                }
            }
        }
    `;
    const data = await fetchGraphQL(query);
    return data.categories.nodes.map(c => ({ id: c.databaseId, name: c.name, slug: c.slug }));
};

export const getPosts = async (first = 6, after = null, categoryId = null) => {
    if (!WP_API_URL) {
        return { posts: MOCK_POSTS, pageInfo: { hasNextPage: false, endCursor: null } };
    }

    const query = `
        query getPostsQuery($first: Int!, $after: String, $categoryIn: [ID]) {
            posts(first: $first, after: $after, where: { categoryIn: $categoryIn }) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    databaseId
                    title
                    excerpt
                    content
                    date
                    featuredImage {
                        node { sourceUrl }
                    }
                    categories {
                        nodes { databaseId name }
                    }
                    tags {
                        nodes { name }
                    }
                }
            }
        }
    `;

    // GraphQL requires exact array structure for 'IN' clauses over ID parameters
    const variables = { first, after, categoryIn: categoryId ? [categoryId] : null };
    const data = await fetchGraphQL(query, variables);

    const posts = data.posts.nodes.map(post => ({
        id: post.databaseId,
        title: post.title,
        excerpt: post.excerpt?.replace(/(<([^>]+)>)/gi, "") || "",
        content: post.content,
        date: new Date(post.date).toISOString().split('T')[0],
        imageUrl: post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80",
        categoryId: post.categories?.nodes[0]?.databaseId || null,
        categoryName: post.categories?.nodes[0]?.name || "Uncategorized",
        tags: post.tags?.nodes.map(t => t.name) || []
    }));

    return { posts, pageInfo: data.posts.pageInfo };
};

export const getSinglePost = async (id) => {
    if (!WP_API_URL) return MOCK_POSTS.find(p => p.id === parseInt(id));

    const query = `
        query getPostById($id: ID!) {
            post(id: $id, idType: DATABASE_ID) {
                databaseId
                title
                content
                date
                featuredImage { node { sourceUrl } }
                categories { nodes { name } }
                tags { nodes { name } }
            }
        }
    `;
    const data = await fetchGraphQL(query, { id: parseInt(id) });
    const post = data.post;

    return {
        id: post.databaseId,
        title: post.title,
        content: post.content,
        date: new Date(post.date).toISOString().split('T')[0],
        imageUrl: post.featuredImage?.node?.sourceUrl || null,
        categoryName: post.categories?.nodes[0]?.name || "Uncategorized",
        tags: post.tags?.nodes.map(t => t.name) || []
    };
};

// ==========================================
// WOOCOMMERCE PRODUCT QUERIES
// ==========================================
const MOCK_PRODUCTS = [
    { id: 1, name: 'Philux 4K Matrix Dome', category: 'CCTV Surveillance', price: '₦299,000', img: '/images/cctv_surveillance.png' },
    { id: 2, name: 'Titan Solar Inverter 5kW', category: 'Solar & Inverter', price: '₦1,250,000', img: '/images/solar_energy.png' },
    { id: 3, name: 'Nexus Biometric Terminal', category: 'Access Control', price: '₦450,000', img: '/images/access_control.png' },
];

export const getProductCategories = async () => {
    if (!WP_API_URL) return [];
    const query = `
        query {
            productCategories(where: { hideEmpty: true }) {
                nodes {
                    databaseId
                    name
                    slug
                }
            }
        }
    `;
    const data = await fetchGraphQL(query);
    if (!data || !data.productCategories) return [];
    return data.productCategories.nodes.map(c => ({ id: c.databaseId, name: c.name, slug: c.slug }));
};

export const getProducts = async (first = 12) => {
    if (!WP_API_URL) return { products: MOCK_PRODUCTS };
    const query = `
        query {
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

    // Fallback securely in case WooGraphQL isn't structurally responding
    try {
        const data = await fetchGraphQL(query);
        if (!data || !data.products) return { products: MOCK_PRODUCTS };

        const products = data.products.nodes.map(p => ({
            id: p.databaseId,
            name: p.name,
            img: p.image?.sourceUrl || "/images/vehicle_tracking.png",
            category: p.productCategories?.nodes[0]?.name || "Uncategorized",
            price: p.price || "Contact for Price"
        }));

        return { products };
    } catch (e) {
        console.warn("WooCommerce GraphQL Warning: ", e);
        return { products: MOCK_PRODUCTS };
    }
};

export const getComments = async (postId) => {
    return []; // Handled separately or securely omitted for basic SSG
};

export const submitComment = async () => { };
