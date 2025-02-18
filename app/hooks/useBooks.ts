import { useState, useEffect } from 'react'

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  isbn?: string;
  status: string;
  categoryId: string;
  rating: number;
  totalRating: number;
  stock: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
}

export function useBooks(search?: string, category?: string) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (category) params.append('category', category)
        
        const response = await fetch(`/api/books?${params}`)
        const data = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [search, category])

  return { books, loading, error }
} 