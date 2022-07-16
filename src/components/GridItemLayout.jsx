import React from 'react'

import MovieItem from '../components/Movie/MovieItem'
import { Link } from 'react-router-dom'
import LoadItem from '../components/Movie/LoadItem'

const GridItemLayout = ({ data, loading, media_type }) => {
  return (
    <div className='grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {!loading ? (
          data?.map((item, index) => (
            <Link
              key={index}
              to={`/details/${media_type}/${item.id}`}
            >
              <MovieItem data={item} />
            </Link>
          ))
        ) : (
          <>
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
          </>
        )}
      </div>
  )
}

export default GridItemLayout