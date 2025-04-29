import { useState, useEffect } from 'react'
import SwipeBook from '../components/SwipeBook'
import '../styles/Home.css'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="book-frame">
        <div className="book-frame-top"></div>
        <div className="book-frame-inner">
          <h1 className="page-title">Discover Books</h1>
          <p className="page-subtitle">Swipe to find your next literary adventure</p>
          <SwipeBook />
        </div>
        <div className="book-frame-bottom"></div>
      </div>
    </div>
  )
}

export default Home