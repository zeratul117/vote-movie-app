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
        <div className="flex gap-5 mt-5">
            {!movie ? <Loading /> : (
                <>
                    <Image
                        src={(movie.poster as Media)?.url ?? ''}
                        alt={(movie.poster as Media)?.text ?? ''}
                        width={(movie.poster as Media)?.width ?? 100}
                        height={(movie.poster as Media)?.height ?? 100}
                        className="w-1/4 rounded-3xl"
                    />
                    <div className="flex flex-col gap-2 w-2/3 textColor">
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

