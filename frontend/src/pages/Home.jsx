import React, { useEffect } from 'react'
import Header from '../components/Header'
import Stories from '../components/Stories'
import Posts from '../components/Posts';
import Footer from '../components/Footer';



function Home() {
    useEffect(()=>{console.log("Home")},[])
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-white">
            {/* Header */}
            <Header />


            {/* Stories Section */}
            <Stories />


            {/* Posts Section */}
            <Posts />

            {/* buttons to switch Bar */}
            <Footer />
            
        </div>
    )
}

export default Home