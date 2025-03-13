'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Input, Carousel } from 'antd';
import { posterUrl } from '@/movies/utils';
import { addMovie } from '@/movies';
import { redirect } from 'next/navigation'

const { Search } = Input;

export default function Page() {
    const [query, setQuery] = useState('')
    const [didAddMovie, setDidAddMovie] = useState(false)
    const [movies, setMovies] = useState<{ id: number, poster_path: string, title: string}[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetch(`/api/search?query=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then(setMovies)

        if (typeof window !== 'undefined') {
          const handleResize = () => {
            const ismobile = window.innerWidth < 768;
            setIsMobile((prevIsMobile) => {
                if (ismobile !== prevIsMobile) {
                    return ismobile;
                }
                return prevIsMobile;
            });
          };
          handleResize();
          window.addEventListener("resize", handleResize);
  
          return () => window.removeEventListener("resize", handleResize);
        }
    }, [query])

    async function addMovieLocal(id: number) {
      const response = await addMovie(id)
      
      if (response) {
        setDidAddMovie(false)
        redirect('/')
      } 
      else {
        setDidAddMovie(true)
      }
    }

  return (
    <div className="textColor w-full max-w-screen-lg mx-auto p-4">
        <div className="mt-6 p-6 justify-center">
            { didAddMovie ? 
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">This movie has already been added!</span>
                </div>
            </div>
            : null }
            <Search 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                size={isMobile ? 'middle' : 'large'} 
                placeholder="Enter movie name..." 
                className="w-full"
            />
            {movies.length > 0 ? 
            (
                <Carousel 
                    className="p-6" 
                    slidesToScroll={isMobile ? 1 : 5}
                    slidesToShow={isMobile ? 1 : 5} 
                    arrows 
                    infinite={false} 
                    dotPosition="top"
                > 
                    {movies.map(({ id, poster_path, title }) => (
                        poster_path ? (
                            <div key={id} className={`flex flex-col ${isMobile ? 'w-full' : 'w-1/5'}`}>
                                <div className="flex justify-center p-3">
                                    <Image
                                        src={posterUrl(poster_path)}
                                        alt={title ?? ''}
                                        width={isMobile ? 150 : 300}
                                        height={isMobile ? 225 : 450}
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className="text-white text-center font-bold truncate p-3 text-lg">{title}</h2>
                                <div className="flex items-center justify-center">
                                    <button 
                                        onClick={() => addMovieLocal(id)}
                                        type="button" 
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                        Add
                                    </button>
                                </div>
                            </div>
                        ) : null 
                    ))}
                </Carousel>
            ) 
            : (<p className="text-2xl text-center">Type in the name to find movies</p>)}
        </div>
    </div>
  )
}