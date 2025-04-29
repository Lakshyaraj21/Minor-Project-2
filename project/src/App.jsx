import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LikedBooks from './pages/LikedBooks'
import Profile from './pages/Profile'
import { BookProvider } from './contexts/BookContext'
import './styles/App.css'

function App() {
  // State to track if the page has loaded (for animations)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay to ensure smooth entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <div className="app-container">
        <BookProvider>
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/liked" element={<LikedBooks />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </BookProvider>
      </div>
    </div>
  )
}

export default App