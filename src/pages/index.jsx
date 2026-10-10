import React from 'react'
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
            <Hero />
            <IntroSection />
            <ServicesInteractive />
            <WhyPhilux />
            <FeaturedProjects />
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
