import React, { useState, useEffect, useCallback } from 'react'

import Title from '../components/Title'
import { API_KEY, BASE_URL } from '../utils/constant'
import GridItemLayout from '../components/GridItemLayout'
import BtnScrollTop from '../components/Button/BtnScrollTop'

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
      <GridItemLayout data={movies} loading={loading} media_type="movie" />

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

      <BtnScrollTop scrollTop={scrollTop} />
    </div>
  )
}

export default Movies