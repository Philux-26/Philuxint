import { useState, useEffect } from 'react';

// This URL will be updated to your actual Headless WordPress REST API or GraphQL endpoint.
// For example: 'https://backend.philuxint.com.ng/wp-json/wp/v2'
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || '';

const FALLBACK_DATA = {
    seo: {
        title: "Philux International - Premium Security, Energy & Infrastructure",
        description: "Philux International provides integrated security, solar energy, CCTV, and infrastructure solutions across Lagos, Abuja, Port Harcourt, Asaba and major cities in Nigeria.",
        keywords: "Security, Solar Energy, CCTV, Access Control, Lagos, Abuja, Port Harcourt, Asaba, Nigeria, Infrastructure, Vehicle Tracking",
        favicon: "/vite.svg" // Placeholder, update from WP
    },
    statistics: {
        installations: 500,
        clients: 350,
        locations: 12,
        yearsExperience: 8
    },
    // Add more fallback sections (e.g. Hero, Testimonials) as needed
};

export const useWPData = (endpoint = '') => {
    const [data, setData] = useState(FALLBACK_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWPData = async () => {
            if (!WP_API_URL) {
                // If no WP URL is configured, immediately default to fallback static data
                setData(FALLBACK_DATA);
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${WP_API_URL}/${endpoint}`);
                if (!response.ok) throw new Error('Failed to fetch from WordPress backend');

                const result = await response.json();

                // Deep merge the result into our fallback data so the structure never breaks
                setData((prevData) => ({ ...prevData, ...result }));
            } catch (err) {
                console.error("WP API fallback engaged due to error:", err);
                // On failure, retain fallback data
            } finally {
                setIsLoading(false);
            }
        };

        fetchWPData();
    }, [endpoint]);

    return { data, isLoading, error };
};
