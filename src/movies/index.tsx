'use server'
import { posterUrl } from '@/movies/utils';
import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export async function searchMovies(query: string) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`)
  const data = await response.json();
  const results = data.results;
  return results.map((movie: {id: number, poster_path: string, title: string}) => ({
    id: movie.id,
    poster_path: movie.poster_path,
    title: movie.title,
  }))
}

export async function addMovie(movieId: number) {
  const movieDataRequest = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`)
  const {title, poster_path, overview, tagline, genres: genreObjects } = await movieDataRequest.json()
  const genres = genreObjects.map(({name}: {name: string}) => ({ name }))

  const response = await fetch(posterUrl(poster_path))
  const arrayBuffer = await response.arrayBuffer()
  const posterBuffer = Buffer.from(arrayBuffer)

  const doesMediaExist = await payload.find({
    collection: 'media',
    where: {
        text: { equals: `${movieId} - ${title} Poster`}
    }
  })

  const doesMovieExist = await payload.find({
    collection: 'movies',
    where: {
        url: { equals: `https://www.themoviedb.org/movie/${movieId}`}
    }
  })

  console.log(doesMediaExist, 133233)
  if (doesMediaExist.docs.length == 0 && doesMovieExist.docs.length == 0) {
    const posterMedia = await payload.create({
      collection: 'media',
      data: {
        text: `${movieId} - ${title} Poster`,
      },
      file: {
        data: posterBuffer,
        name: `${movieId}.jpg`, 
        mimetype: 'image/jpeg',
        size: posterBuffer.byteLength,
      },
    })
      await payload.create({
        collection: 'movies',
        data: {
          name: title,
          url: `https://www.themoviedb.org/movie/${movieId}`,
          votes: 0,
          poster: posterMedia.id,
          overview,
          tagline,
          genres,
        },
      })
      revalidatePath('/')
      return true
    } else {
      return false
    }
}

export async function addVotes(movieId: number) {
  const movie = await payload.findByID({
    collection: 'movies',
    id:  movieId
  })

  if (movie.votes < 100) {
    await payload.update({
      collection: 'movies',
      id: movieId,
      data: {
        votes: movie.votes + 1
      }
    })
    
    const movies = await payload.find({
      collection: 'movies',
      sort: '-votes'
    })
    return movies.docs
  }

  return []
}
