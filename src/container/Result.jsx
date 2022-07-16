import React, { useState, useEffect, useCallback } from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

import { useSearchParams } from '../hooks/useSearchParams'
import { BASE_URL, API_KEY } from '../utils/constant'
import Title from '../components/Title'
import GridItemLayout from '../components/GridItemLayout'
import BtnScrollTop from '../components/Button/BtnScrollTop'

const Result = () => {
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get("q")
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(true)

  const loadMore = () => {
    setPage(page + 1)
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const searchKeyword = useCallback(
    (searchTerm) => {
      if (searchTerm.trim() === "") return;
      fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchTerm}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total_pages)
          setResults((prev) => [...prev, ...data.results])
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        });
    },
    [page]
  )

  useEffect(() => {
    setLoading(true);
    searchKeyword(searchTerm);
  }, [page, searchTerm, searchKeyword])

  if (!loading && results.length === 0) {
    return (
      <div className="h-80vh text-white flex justify-center items-start mt-40">
        <h1 className='text-lg font-semibold'>No Data Results!</h1>
      </div>
    )
  }

  return (
    <div className='w-1200 max-w-mx-8 mx-auto mt-24 mb-12'>
			<Title title='Results for search term' />

      <h1 className='text-white text-2xl mb-5 font-medium'>Result for {`"${searchTerm}"`}</h1>
      <GridItemLayout data={results} loading={loading} media_type={results.media_type} />

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

export default Result