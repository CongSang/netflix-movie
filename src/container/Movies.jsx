import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

import Title from '../components/Title'
import MovieItem from '../components/Movie/MovieItem'
import { API_KEY, BASE_URL } from '../utils/constant'
import LoadItem from '../components/Movie/LoadItem'

const Movies = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const getMovies = useCallback(() => {
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies((prev) => [...prev, ...data.results])
        setTotalPages(data.total_pages)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      });
  }, [page])

  useEffect(() => {
    setLoading(true)
    getMovies()
  }, [page])

  const loadMore = () => {
    setPage(page + 1)
  }


  return (
    <div className='w-1200 max-w-mx-8 mt-24 mb-12 mx-auto'>
      <Title title='Netflix | Movies' />
      <div className='grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {!loading ? (
          movies?.map((item, index) => (
            <Link
              key={index}
              to={`/details/movie/${item.id}`}
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

      {page < totalPages ? (
        <div className="flex justify-center items-center">
          <button 
            className='px-4 py-2 mt-5 bg-secondaryColor-100 text-md text-white rounded-md outline-none' 
            onClick={loadMore}
          >
            Load more
          </button>
        </div>
      ) : null}

      <div 
        className='fixed bottom-20 right-5 flex justify-center items-center z-10 w-12 h-12 bg-secondaryColor-100 opacity-70 text-md text-white rounded-full outline-none'
        onClick={scrollTop}  
      >
        <MdOutlineKeyboardArrowUp fontSize={30} />
      </div>
    </div>
  )
}

export default Movies