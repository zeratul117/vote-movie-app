import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import MovieCards from './MovieCards'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export default async function Page() {
  const movies = await payload.find({
    collection: 'movies',
    sort: '-votes'
  })

  return (
    <div className="p-6">
      <MovieCards movies={movies.docs}/>
    </div>
  )
}
