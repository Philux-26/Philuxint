import React from 'react'
import Head from 'next/head'
import { SEO } from '../components/SEO'
import { organizationSchema } from '../utils/seoSchemas'
import { Hero } from '../components/Hero'
import { IntroSection } from '../components/IntroSection'
import { ServicesInteractive } from '../components/ServicesInteractive'
import { WhyPhilux } from '../components/WhyPhilux'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { DeploymentsCarousel } from '../components/DeploymentsCarousel'
import { Industries } from '../components/Industries'
import { HowWeWork } from '../components/HowWeWork'
import { Statistics } from '../components/Statistics'
import { LocationsMarquee } from '../components/LocationsMarquee'
import { Testimonials } from '../components/Testimonials'
import { QuoteForm } from '../components/QuoteForm'
import { FinalCta } from '../components/FinalCta'

export default function Home() {
    return (
        <React.Fragment>
            <SEO
                title="Philux Security Services | CCTV, Car Tracking, Electric Fence & Solar Nigeria"
                description="Leading security services company in Nigeria. Professional installation of CCTV cameras, vehicle tracking, electric fencing, access control, and 24/7 solar power backup in Lagos and nationwide."
                canonical="/"
                schema={organizationSchema}
            />
            <Head>
                <link rel="preload" as="image" href="/images/vehicle_tracking.webp" fetchPriority="high" />
            </Head>
            <Hero />
            <IntroSection />
            <ServicesInteractive />
            <WhyPhilux />
            {/* <FeaturedProjects /> - Hidden portfolio section */}
            <DeploymentsCarousel />
            <Industries />
            <HowWeWork />
            <Statistics />
            <LocationsMarquee />
            <Testimonials />
            <QuoteForm />
            <FinalCta />
        </React.Fragment>
    )
}
