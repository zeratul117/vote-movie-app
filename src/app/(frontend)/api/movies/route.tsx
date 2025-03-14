import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const movies = await payload.find({
    collection: 'movies',
    sort: '-votes'
  })

  return NextResponse.json(movies)
}
