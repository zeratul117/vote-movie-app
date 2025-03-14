'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Media, Movie } from '@/payload-types'
import Loading from '../../loading'

export default function MovieInfo() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isNotFound, setIsNotFound] = useState(false);

    const params = useParams();
    const movieId = params?.movieId ? Number(params.movieId) : 0;

    useEffect(() => {
        if (!movieId) return;

        fetch(`/api/movieSearch?movieId=${encodeURIComponent(movieId)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data === null) {
                    setIsNotFound(true);
                } else {
                    setMovie(data);
                }
            })
            .catch(() => {
                setIsNotFound(true);
            });
    }, [movieId]);

    if (isNotFound) return null;

    return (
        <div className="flex flex-col md:flex-row gap-5 mt-5 items-center md:items-start">
            {!movie ? <Loading /> : (
                <>
                    <Image
                        src={(movie.poster as Media)?.url ?? ''}
                        alt={(movie.poster as Media)?.text ?? 'Movie poster'}
                        width={(movie.poster as Media)?.width ?? 300}
                        height={(movie.poster as Media)?.height ?? 450}
                        className="w-1/2 md:w-1/4 max-w-[200px] h-auto rounded-3xl object-cover mx-auto md:mx-0"
                    />
                    <div className="p-6 flex flex-col gap-2 w-full md:w-2/3 textColor">
                        <h1 className="font-bold text-4xl border-b-2">{movie.name}</h1>
                        {movie.tagline && <h2 className="font-light text-3xl mb-3">{movie.tagline}</h2>}
                        <p className="font-light mb-3 text-right">
                            {movie.genres.map(({ name }) => name).join(', ')}
                        </p>
                        <p className="italic">{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
}
