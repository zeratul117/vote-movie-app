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
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({})

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
      setLoading(prev => ({ ...prev, [id]: true }))

      const response = await addMovie(id)
      
      if (response) {
        setDidAddMovie(false)
        redirect('/')
      } 
      else {
        setDidAddMovie(true)
      }
      setLoading(prev => ({ ...prev, [id]: false }))
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
                                        disabled={loading[id]}
                                        onClick={() => addMovieLocal(id)}
                                        type="button" 
                                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                {loading[id] ?                             <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                                </svg> : "Add" }
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