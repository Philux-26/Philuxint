/**
 * Headless WordPress REST API Interface
 * Maps pure React logic robustly into the native `wp-json/wp/v2` endpoints.
 * 
 * If VITE_WP_API_URL is missing, this service gracefully falls back to a 
 * deeply functional Mock Engine that simulates network-delay and exact filtering.
 */

const WP_API_URL = import.meta.env.VITE_WP_API_URL || '';

// --- MOCK DATABASE (Activated when WP_API_URL is empty) ---
const MOCK_CATEGORIES = [
    { id: 10, name: "Energy", slug: "energy" },
    { id: 11, name: "Security", slug: "security" },
    { id: 12, name: "Logistics", slug: "logistics" },
    { id: 13, name: "Infrastructure", slug: "infrastructure" },
    { id: 14, name: "Surveillance", slug: "surveillance" },
    { id: 15, name: "Safety", slug: "safety" },
    { id: 16, name: "Project", slug: "project" }
];

const MOCK_POSTS = Array.from({ length: 15 }).map((_, i) => ({
    id: 100 - i,
    title: `Mock Post Array Template ${i + 1} - System Architecture`,
    excerpt: `This is a dynamically generated mock excerpt mimicking the standard WordPress REST payload format to ensure the UI behaves natively while building.`,
    content: `<p>This is the full HTML content returned from the WordPress endpoint.</p><p>We can inject <strong>strong text</strong>, lists, and images gracefully over the network layer.</p><blockquote>This is a blockquote demonstrating nested styles.</blockquote>`,
    date: new Date(Date.now() - i * 86400000 * 3).toISOString().split('T')[0],
    imageUrl: `https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80`,
    categoryId: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
    categoryName: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].name
}));

const MOCK_COMMENTS = [
    { id: 1, postId: 100, author_name: "Tunde O.", content: "Brilliant installation structure. How does this resist power surges?", date: "2026-09-30", parentId: null },
    { id: 2, postId: 100, author_name: "Philux Eng.", content: "Great question! We utilize massive isolator breakers tied directly inline.", date: "2026-10-01", parentId: 1 }
];

// --- HELPER: Simulate Network Wait ---
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// --- API FUNCTIONS ---

export const getCategories = async () => {
    if (!WP_API_URL) {
        await delay();
        return MOCK_CATEGORIES;
    }

    // NATIVE WP FETCH
    const res = await fetch(`${WP_API_URL}/categories?hide_empty=true`);
    const data = await res.json();
    return data.map(item => ({ id: item.id, name: item.name, slug: item.slug }));
};

export const getPosts = async (page = 1, categoryId = null, perPage = 6) => {
    if (!WP_API_URL) {
        await delay();
        let filtered = MOCK_POSTS;
        if (categoryId) {
            filtered = filtered.filter(p => p.categoryId === categoryId);
        }

        const totalPosts = filtered.length;
        const totalPages = Math.ceil(totalPosts / perPage);
        const paginated = filtered.slice((page - 1) * perPage, page * perPage);

        return { posts: paginated, totalPages, currentPage: page };
    }

    // NATIVE WP FETCH
    let url = `${WP_API_URL}/posts?_embed=true&page=${page}&per_page=${perPage}`;
    if (categoryId) url += `&categories=${categoryId}`;

    const res = await fetch(url);
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages')) || 1;
    const rawData = await res.json();

    // Abstract the complex WP schema for clean React usage
    const posts = rawData.map(post => {
        let imageUrl = null;
        let categoryName = "Uncategorized";
        let catId = null;

        // WP Embedded Data Mapping
        if (post._embedded) {
            if (post._embedded['wp:featuredmedia']) {
                imageUrl = post._embedded['wp:featuredmedia'][0]?.source_url;
            }
            if (post._embedded['wp:term']) {
                const terms = post._embedded['wp:term'][0];
                if (terms && terms.length > 0) {
                    categoryName = terms[0].name;
                    catId = terms[0].id;
                }
            }
        }

        return {
            id: post.id,
            title: post.title.rendered,
            excerpt: post.excerpt.rendered.replace(/(<([^>]+)>)/gi, ""), // Strip tags for card
            content: post.content.rendered,
            date: new Date(post.date).toISOString().split('T')[0],
            imageUrl: imageUrl || "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=600&q=80",
            categoryId: catId,
            categoryName: categoryName
        };
    });

    return { posts, totalPages, currentPage: page };
};

export const getSinglePost = async (id) => {
    if (!WP_API_URL) {
        await delay();
        return MOCK_POSTS.find(p => p.id === parseInt(id));
    }

    const res = await fetch(`${WP_API_URL}/posts/${id}?_embed=true`);
    const post = await res.json();

    let imageUrl = null;
    let categoryName = "Uncategorized";

    if (post._embedded) {
        if (post._embedded['wp:featuredmedia']) {
            imageUrl = post._embedded['wp:featuredmedia'][0]?.source_url;
        }
        if (post._embedded['wp:term']) {
            const terms = post._embedded['wp:term'][0];
            if (terms && terms.length > 0) categoryName = terms[0].name;
        }
    }

    return {
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        date: new Date(post.date).toISOString().split('T')[0],
        imageUrl: imageUrl,
        categoryName: categoryName
    };
};

export const getComments = async (postId) => {
    if (!WP_API_URL) {
        await delay();
        return MOCK_COMMENTS.filter(c => c.postId === parseInt(postId));
    }

    const res = await fetch(`${WP_API_URL}/comments?post=${postId}&order=asc`);
    const data = await res.json();

    return data.map(c => ({
        id: c.id,
        postId: c.post,
        author_name: c.author_name,
        content: c.content.rendered.replace(/(<([^>]+)>)/gi, ""),
        date: new Date(c.date).toISOString().split('T')[0],
        parentId: c.parent === 0 ? null : c.parent
    }));
};

export const submitComment = async (postId, authorName, authorEmail, content, parentId = 0) => {
    if (!WP_API_URL) {
        await delay(800);
        const newComment = {
            id: Math.random() * 1000,
            postId: parseInt(postId),
            author_name: authorName,
            content: content,
            date: new Date().toISOString().split('T')[0],
            parentId: parentId === 0 ? null : parentId
        };
        MOCK_COMMENTS.push(newComment);
        return newComment; // Mock success
    }

    const payload = {
        post: postId,
        author_name: authorName,
        author_email: authorEmail,
        content: content,
        parent: parentId
    };

    const res = await fetch(`${WP_API_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // If WP is publicly open for comments, this is fine. 
            // Otherwise, nonce/JWT auth would go here.
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to submit comment.");
    return await res.json();
};
