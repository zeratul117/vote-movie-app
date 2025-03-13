import { searchSingleMovie } from '@/movies'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default async function Movie({ params }: { params: { id: number } }) {
    const { id } = await params
    const movie = await searchSingleMovie(id)
    if (!movie) {
        return notFound()
    } else {
        return (
            <div className="flex gap-5 mt-5 ">
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
          </div>
        )
    }

}
