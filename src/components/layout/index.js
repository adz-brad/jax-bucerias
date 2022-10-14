import React from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }) => {

    return(
        <div className="relative z-10 h-screen">
            <Navbar />
            <div id="pageWrapper" className="fixed bottom-0 left-0 z-10 w-full h-[calc(100%-80px)] xl:h-[calc(100%-100px)]">
                <div className="relative z-10 w-full h-full opacity-30">
                <StaticImage 
                    src="../../assets/images/bg.png" 
                    alt="Jax Bucerias Skeleton Marquee - Page Background" 
                    loading="lazy" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-10px)] max-w-screen-lg"
                />
                </div>
                <main className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-y-auto max-w-screen-xxl w-full">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout