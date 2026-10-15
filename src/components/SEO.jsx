import Head from 'next/head';
import React from 'react';

const SITE_URL = 'https://philuxint.com.ng';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export const SEO = ({
    title = "Philux Security Services | CCTV, Car Tracking, Electric Fence & Solar Nigeria",
    description = "Leading security services company in Nigeria. Professional installation of CCTV cameras, vehicle tracking, electric fencing, access control, and 24/7 solar power backup.",
    canonical,
    ogType = "website",
    ogImage = DEFAULT_IMAGE,
    schema = null,
}) => {
    const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    return (
        <Head>
            {/* Standard Meta */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullCanonical} />

            {/* Geo Tags for Local Nigerian Engineering SEO */}
            <meta name="geo.region" content="NG-LA" />
            <meta name="geo.placename" content="Lagos, Nigeria" />
            <meta name="geo.position" content="6.5456;3.2685" />
            <meta name="ICBM" content="6.5456, 3.2685" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:site_name" content="Philux International" />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content="en_NG" />

            {/* Twitter Meta */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD Structured Data Schema */}
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
        </Head>
    );
};
