'use client'

import { useEffect, useState } from 'react'
import MovieCards from './MovieCards'
import { Movie } from '@/payload-types'
import Loading from './loading'

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies')
        const data = await response.json()
        setMovies(data.docs)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
    fetchMovies()
  }, [version])

  const handleVote = () => {
    setVersion(prev => prev + 1) 
  }

  return (
    <div className="p-6">
      {movies.length > 0 ? <MovieCards movies={movies} onVote={handleVote} /> : <Loading />}
    </div>
  )
}
