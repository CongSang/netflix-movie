import React, { useEffect, useState } from 'react'
import "swiper/css"
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Controller } from "swiper"
import { Link } from 'react-router-dom'

import MovieItem from '../Movie/MovieItem'
import useInnerWidth from '../../hooks/useInnerWidth'
import { API_KEY, BASE_URL } from '../../utils/constant'
import ButtonCustom from '../Button/ButtonCustom'
import LoadItem from '../Movie/LoadItem';

const Slider = ({ type, cate }) => {
  SwiperCore.use([Navigation, Controller])
	const [movie, setMovie] = useState([])
	const [loading, setLoading] = useState(false)
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

	useEffect(() => {
    const getMovie = () => {
			setLoading(true)
      fetch(
        type === "trending"
          ? `${BASE_URL}/trending/${cate}/week?api_key=${API_KEY}`
          : `${BASE_URL}/${cate}/${type}?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setMovie(data.results)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        });
    };

    setLoading(true)
    getMovie();
  }, [type]);

  return (
    <div className="my-10">
      <div className="flex justify-between items-center text-white my-5">
        <h1 className='font-normal text-2xl'>{cate === 'tv' ? 'TV' : 'Movie'} {type === 'top_rated' ? 'top rate' : type}</h1>
        <Link to={`/movie/${type}`}>
          <ButtonCustom content='View more' className='cursor-pointer' />
        </Link>
      </div>
      <Swiper
        navigation={true}
        grabCursor={true}
        spaceBetween={14}
        slidesPerView={item}
        loop={true}
      >
        {!loading ? (
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/details/${cate}/${item.id}`}>
                <MovieItem data={item} />
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
            <LoadItem />
          </div>
        )}
      </Swiper>
    </div>
  )
}

export default Slider