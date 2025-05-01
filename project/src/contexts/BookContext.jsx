import { createContext, useState, useEffect, useContext } from 'react'
import { bookData } from '../data/books'

// Create context
const BookContext = createContext()

// Context provider component
export function BookProvider({ children }) {
  const [likedBooks, setLikedBooks] = useState([])
  const [currentBooks, setCurrentBooks] = useState([])
  const [seenBookIds, setSeenBookIds] = useState(new Set())

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

    // Initialize current books and mark them as seen
    const initialBooks = bookData.slice(0, 5)
    setCurrentBooks(initialBooks)
    setSeenBookIds(new Set(initialBooks.map(book => book.id)))
  }, [])

  // Save liked books to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks))
  }, [likedBooks])

  // Like a book
  const likeBook = (book) => {
    if (!likedBooks.some(liked => liked.id === book.id)) {
      setLikedBooks(prev => [...prev, book])
    }
  }

  // Unlike a book
  const unlikeBook = (bookId) => {
    setLikedBooks(prev => prev.filter(book => book.id !== bookId))
  }

  // Load more books, avoiding seen or liked
  const loadMoreBooks = () => {
    const excludedIds = new Set([
      ...seenBookIds,
      ...likedBooks.map(b => b.id),
      ...currentBooks.map(b => b.id)
    ])

    const newBooks = bookData.filter(book => !excludedIds.has(book.id))
    const booksToAdd = newBooks.slice(0, 5)

    if (booksToAdd.length > 0) {
      setCurrentBooks(prev => [...prev, ...booksToAdd])
      setSeenBookIds(prev => {
        const updated = new Set(prev)
        booksToAdd.forEach(book => updated.add(book.id))
        return updated
      })
    } else {
      // All books used, restart (excluding liked books)
      const restartBooks = bookData
        .filter(book => !likedBooks.some(liked => liked.id === book.id))
        .slice(0, 5)

      setCurrentBooks(restartBooks)
      setSeenBookIds(new Set(restartBooks.map(book => book.id)))
    }
  }

  // Remove a swiped book and maybe load more
  const removeBook = (bookId) => {
    setCurrentBooks(prev => {
      const updated = prev.filter(book => book.id !== bookId)
      setSeenBookIds(prevSeen => new Set(prevSeen).add(bookId))

      if (updated.length <= 2) {
        setTimeout(loadMoreBooks, 0)
      }

      return updated
    })
  }

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

// Custom hook
export function useBooks() {
  return useContext(BookContext)
}
