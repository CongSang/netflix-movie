import React, { useMemo } from 'react'

import Banner from '../components/Banner'
import Slider from '../components/Slide/Slider'
import Title from '../components/Title'
import { getMovieHistory } from '../data/localStorage'
import HistorySlider from '../components/Slide/HistorySlider'

const HomeContent = () => {
  const history = useMemo(getMovieHistory, [])

  return (
    <div className>
      <Title title='Netflix | Home' />
      <Banner />

      <div className='w-1200 max-w-mx-8 m-auto'>
        <div>
          {history.length > 0 ? (
            <HistorySlider data={history} />
          ) : null}
        </div>
        <div>
          <Slider type="trending" cate="movie" />
          <Slider type="popular" cate="movie" />
          <Slider type="top_rated" cate="movie" />
        </div>
        <div>
          <Slider type="trending" cate="tv" />
          <Slider type="popular" cate="tv" />
          <Slider type="top_rated" cate="tv" />
        </div>
      </div>
    </div>
  )
}

export default HomeContent