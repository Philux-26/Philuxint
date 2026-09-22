import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { IntroSection } from './components/IntroSection'
import { ServicesInteractive } from './components/ServicesInteractive'
import { WhyPhilux } from './components/WhyPhilux'
import { FeaturedProjects } from './components/FeaturedProjects'
import { Industries } from './components/Industries'
import { HowWeWork } from './components/HowWeWork'
import { Statistics } from './components/Statistics'
import { Testimonials } from './components/Testimonials'
import { FinalCta } from './components/FinalCta'
import { QuoteForm } from './components/QuoteForm'
import { Footer } from './components/Footer'

function App() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    return (
        <div className="philux-app">
            <Header />
            <main>
                <Hero />
                <IntroSection />
                <ServicesInteractive />
                <WhyPhilux />
                <FeaturedProjects />
                <Industries />
                <HowWeWork />
                <Statistics />
                <Testimonials />
                <QuoteForm />
                <FinalCta />
            </main>
            <Footer />
        </div>
    )
}

export default App
