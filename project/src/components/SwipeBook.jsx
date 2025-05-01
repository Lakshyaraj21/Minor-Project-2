import { useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { useSpring, animated } from '@react-spring/web'
import BookCard from './BookCard'
import { useBooks } from '../contexts/BookContext'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import '../styles/SwipeBook.css'

function SwipeBook() {
  const { currentBooks, likeBook, removeBook } = useBooks()
  
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [lastDirection, setLastDirection] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRefs = useRef([])

  const emptyAnimation = useSpring({
    opacity: currentBooks.length === 0 ? 1 : 0,
    transform: currentBooks.length === 0 ? 'translateY(0px)' : 'translateY(20px)',
  })
  
  const onSwipe = (direction, book) => {
    setLastDirection(direction)
    setSwipeDirection(direction)
    setIsAnimating(true)
    
    setTimeout(() => {
      if (direction === 'right') likeBook(book)
      removeBook(book.id)
      setIsAnimating(false)
      setSwipeDirection(null)
    }, 500)
  }
  
  const swipe = (direction) => {
    if (currentBooks.length === 0 || isAnimating) return
    // swipe the topmost card
    const topIndex = currentBooks.length - 1
    cardRefs.current[topIndex]?.swipe(direction)
  }
  
  return (
    <div className="swipe-container">
      <div className="swipe-area">
        {currentBooks.length > 0 ? (
          currentBooks.map((book, index) => (
            <TinderCard
              key={book.id}
              ref={ref => (cardRefs.current[index] = ref)}
              onSwipe={dir => onSwipe(dir, book)}
              preventSwipe={['up', 'down']}
              className={`
                swipe-card
                ${swipeDirection === 'left'  ? 'swiping-left'  : ''}
                ${swipeDirection === 'right' ? 'swiping-right' : ''}
              `}
            >
              <BookCard book={book} isAnimating={isAnimating} />
            </TinderCard>
          ))
        ) : (
          <animated.div style={emptyAnimation} className="no-books">
            <h2>No more books!</h2>
            <p>Come back later for more recommendations.</p>
          </animated.div>
        )}

        {lastDirection && (
          <div className="swipe-info">
            Last swipe: {lastDirection}
          </div>
        )}
      </div>
      
      <div className="swipe-buttons">
        <button
          className="swipe-button dislike"
          onClick={() => swipe('left')}
          disabled={currentBooks.length === 0 || isAnimating}
        >
          <FaArrowLeft /><span>Discard</span>
        </button>
        <button
          className="swipe-button like"
          onClick={() => swipe('right')}
          disabled={currentBooks.length === 0 || isAnimating}
        >
          <span>Like</span><FaArrowRight />
        </button>
      </div>
      
      <div className="swipe-instructions">
        <div className="instruction-item">
          <div className="swipe-arrow left">←</div>
          <span>Swipe left to discard</span>
        </div>
        <div className="instruction-item">
          <span>Swipe right to like</span>
          <div className="swipe-arrow right">→</div>
        </div>
      </div>
    </div>
  )
}

export default SwipeBook
