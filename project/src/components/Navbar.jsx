import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBook, FaHeart, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import '../styles/Navbar.css'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])
  
  // Determine if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="book-icon">📚</span>
          <span className="logo-text">BookSwipe</span>
        </Link>
        
        <div className="menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <FaBook className="nav-icon" />
              <span>Discover</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/liked" className={`nav-link ${isActive('/liked')}`}>
              <FaHeart className="nav-icon" />
              <span>Liked Books</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
              <FaUser className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar