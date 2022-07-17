import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Title from '../components/Title'
import { API_KEY, BASE_URL } from '../utils/constant'
import GridItemLayout from '../components/GridItemLayout'
import BtnScrollTop from '../components/Button/BtnScrollTop'

const ViewMore = () => {
  const { media_type, type } = useParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(false)

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const loadMore = () => {
    setPage(page + 1)
  }

  const getViewMore = useCallback(
    (media_type, type) => {
      let apiViewMore = ""
      if (type === "trending") {
        apiViewMore = `${BASE_URL}/${type}/${media_type}/week?api_key=${API_KEY}&page=${page}`
      } else {
        apiViewMore = `${BASE_URL}/${media_type}/${type}?api_key=${API_KEY}&page=${page}`
      }

      if (apiViewMore) {
        fetch(`${apiViewMore}`)
          .then((res) => res.json())
          .then((data) => {
            setMovies((prev) => [...prev, ...data.results])
            setTotalPage(data.total_pages)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          });
      }
    },
    [page]
  )

  useEffect(() => {
    setLoading(true)
    getViewMore(media_type, type)
  }, [page, getViewMore, media_type, type])

  return (
    <div className='w-1200 max-w-mx-8 mt-24 mb-12 mx-auto'>
      <Title title={`${media_type.toUpperCase()} | ${type.toUpperCase()}`} />

      <h1 className='text-white text-2xl font-medium capitalize mb-5'>{media_type} {type === "top_rated" ? "top rate" : type}</h1>
      <GridItemLayout data={movies} loading={loading} media_type={media_type}/>

      {page < totalPage ? (
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

export default ViewMore