import { searchMovieById } from '@/movies' 
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const movieId = searchParams.get('movieId') ?? ''

  const limitNumber = movieId ? parseInt(movieId, 10) : 0;

  return NextResponse.json(await searchMovieById(limitNumber))
}