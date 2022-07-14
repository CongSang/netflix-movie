import React from 'react'

const MovieInfo = ({ data }) => {
  return (
    <div className='my-6'>
        <h1 className='text-secondaryColor-100 text-2xl font-semibold'>{data.title}</h1>
				<p className='text-white text-md my-2'>Overview: {data.overview}</p>
				<p className='text-white text-md mt-3'>Release date: {data.release_date}</p>
    </div>
  )
}

export default MovieInfo