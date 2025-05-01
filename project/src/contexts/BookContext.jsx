import { createContext, useState, useEffect, useContext } from 'react'
import { bookData } from '../data/books'

// Create context
const BookContext = createContext()

// Context provider component
export function BookProvider({ children }) {
  // State for liked books
  const [likedBooks, setLikedBooks] = useState([])
  // State for the current books to display
  const [currentBooks, setCurrentBooks] = useState([])
  
  // Load liked books from localStorage on initial render
  useEffect(() => {
    const savedLikedBooks = localStorage.getItem('likedBooks')
    if (savedLikedBooks) {
      try {
        setLikedBooks(JSON.parse(savedLikedBooks))
      } catch (error) {
        console.error('Error parsing liked books from localStorage:', error)
      }
    }
    
    // Initialize current books
    setCurrentBooks(bookData.slice(0, 5))
  }, [])
  
  // Save liked books to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks))
  }, [likedBooks])
  
  // Function to handle liking a book
  const likeBook = (book) => {
    if (!likedBooks.some(likedBook => likedBook.id === book.id)) {
      setLikedBooks([...likedBooks, book])
    }
  }
  
  // Function to remove a book from liked books
  const unlikeBook = (bookId) => {
    setLikedBooks(likedBooks.filter(book => book.id !== bookId))
  }
  
  // Function to load more books
  const loadMoreBooks = () => {
    // Get the IDs of books already seen or liked
    const existingBookIds = new Set([
      ...currentBooks.map(b => b.id),
      ...likedBooks.map(b => b.id)
    ])
    
    // Find books that haven't been seen yet
    const newBooks = bookData.filter(book => !existingBookIds.has(book.id))
    
    // Add up to 5 new books to the current stack
    const booksToAdd = newBooks.slice(0, 5)
    
    if (booksToAdd.length > 0) {
      setCurrentBooks(prevBooks => [...prevBooks, ...booksToAdd])
    } else {
      // If we've shown all books, start over with the first few (excluding liked ones)
      const restartBooks = bookData
        .filter(book => !likedBooks.some(liked => liked.id === book.id))
        .slice(0, 5)
      
      setCurrentBooks(restartBooks)
    }
  }
  
  // Remove a book from current books (when swiped)
  const removeBook = (bookId) => {
    setCurrentBooks(prevBooks => {
      const updated = prevBooks.filter(book => book.id !== bookId);
  
      // Load more books *after* state update
      if (updated.length <= 2) {
        setTimeout(() => loadMoreBooks(), 0);
      }
  
      return updated;
    });
  };
  
  
  
  
  // Context value
  const value = {
    likedBooks,
    currentBooks,
    likeBook,
    unlikeBook,
    removeBook,
    loadMoreBooks
  }
  
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}

// Custom hook to use the book context
export function useBooks() {
  return useContext(BookContext)
}