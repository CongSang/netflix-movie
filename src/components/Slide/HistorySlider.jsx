import React, { useEffect, useState } from 'react'
import "swiper/css"
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Controller } from "swiper"
import { Link } from 'react-router-dom'

import MovieItem from '../Movie/MovieItem'
import useInnerWidth from '../../hooks/useInnerWidth'

const HistorySlider = ({ data }) => {
  SwiperCore.use([Navigation, Controller])
	const width = useInnerWidth()

	let item;
  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 4;
  } else if (width < 740 && width >= 500) {
    item = 3;
  } else {
    item = 2;
  }

  return (
    <div className="my-10">
      <div className="flex justify-start items-center text-white my-5">
        <h1 className='font-normal text-2xl'>Recently</h1>
      </div>
      <Swiper
        navigation={true}
        grabCursor={true}
        spaceBetween={14}
        slidesPerView={item}
      >
        {data.map((item) => (
					<SwiperSlide key={item.id}>
						<Link to={`/details/${item.media_type}/${item.id}`}>
							<MovieItem data={item} />
						</Link>
					</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HistorySlider