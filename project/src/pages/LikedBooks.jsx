import { useState, useEffect } from 'react'
import { useBooks } from '../contexts/BookContext'
import { FaStar, FaHeart, FaTrash } from 'react-icons/fa'
import '../styles/LikedBooks.css'

function LikedBooks() {
  const { likedBooks, unlikeBook } = useBooks()
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Format rating display
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <div className="book-rating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <FaStar key={index} className="star filled" />
          } else if (index === fullStars && hasHalfStar) {
            return <FaStar key={index} className="star half-filled" />
          } else {
            return <FaStar key={index} className="star" />
          }
        })}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    )
  }
  
  return (
    <div className={`liked-books-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="book-frame">
        <div className="book-frame-top"></div>
        <div className="book-frame-inner">
          <h1 className="page-title">Your Liked Books</h1>
          <p className="page-subtitle">
            <FaHeart className="heart-icon" /> Books you've added to your collection
          </p>
          
          {likedBooks.length === 0 ? (
            <div className="no-books-message">
              <p>You haven't liked any books yet.</p>
              <p>Start swiping to discover books you might enjoy!</p>
            </div>
          ) : (
            <div className="liked-books-grid">
              {likedBooks.map((book) => (
                <div className="liked-book-card" key={book.id}>
                  <div className="book-image-container">
                    <img src={book.coverImage} alt={book.title} className="liked-book-image" />
                    <button 
                      className="remove-button" 
                      onClick={() => unlikeBook(book.id)}
                      aria-label="Remove book"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="liked-book-details">
                    <h3 className="liked-book-title">{book.title}</h3>
                    <h4 className="liked-book-author">by {book.author}</h4>
                    {renderRating(book.rating)}
                    <p className="liked-book-description">{book.description.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="book-frame-bottom"></div>
      </div>
    </div>
  )
}

export default LikedBooks