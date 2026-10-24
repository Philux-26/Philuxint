async function run() {
    try {
        const liveRes = await fetch('https://philuxint.com.ng/shop');
        const live = await liveRes.text();
        const matches = live.match(/src="([^"]+\.js)"/g) || [];
        const scriptUrls = matches.map(s => s.replace('src="', '').replace('"', ''));
        console.log('Script URLs on live server:');
        for (const url of scriptUrls) {
            const fullUrl = url.startsWith('http') ? url : `https://philuxint.com.ng${url}`;
            const res = await fetch(fullUrl);
            const text = await res.text();
            console.log(url, 'Length:', text.length, 'Contains card-countdown:', text.includes('card-countdown'), 'Contains PRODUCTS_PER_PAGE or 9:', text.includes('PRODUCTS_PER_PAGE') || text.includes('All Equipment'));
        }
    } catch (e) {
        console.error(e);
    }
}
run();
