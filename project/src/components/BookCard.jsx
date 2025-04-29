import { forwardRef } from 'react'
import { FaStar } from 'react-icons/fa'
import '../styles/BookCard.css'

const BookCard = forwardRef(({ book, isAnimating }, ref) => {
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
    <div 
      ref={ref} 
      className={`book-card ${isAnimating ? 'animating' : ''}`}
    >
      <div className="book-card-inner">
        <div className="book-cover">
          <img src={book.coverImage} alt={book.title} className="book-image" />
          <div className="book-cover-overlay"></div>
        </div>
        <div className="book-content">
          <h2 className="book-title">{book.title}</h2>
          <h3 className="book-author">by {book.author}</h3>
          {renderRating(book.rating)}
          <p className="book-description">{book.description}</p>
        </div>
        <div className="book-edge"></div>
      </div>
    </div>
  )
})

export default BookCard