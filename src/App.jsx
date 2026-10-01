import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Helmet } from 'react-helmet-async'
import { useWPData } from './hooks/useWPData'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Shop } from './pages/Shop'

function App() {
    const { data: wpData } = useWPData('globals');

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
            <Helmet>
                <title>{wpData.seo.title}</title>
                <meta name="description" content={wpData.seo.description} />
                <meta name="keywords" content={wpData.seo.keywords} />
                <link rel="icon" type="image/svg+xml" href={wpData.seo.favicon} />
                <meta property="og:title" content={wpData.seo.title} />
                <meta property="og:description" content={wpData.seo.description} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    )
}

export default App
