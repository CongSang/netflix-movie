import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper"
import { Link, useParams } from "react-router-dom"
import "swiper/css"
import "swiper/css/navigation"

import useInnerWidth from "../../hooks/useInnerWidth"
import { API_KEY, BASE_URL } from "../../utils/constant"
import MovieItem from "../Movie/MovieItem"
import LoadItem from '../Movie/LoadItem';

const Similar = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const { media_type, id } = params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const width = useInnerWidth();

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
    const getMovies = () => {
			setLoading(true);
      fetch(
        `${BASE_URL}/${media_type}/${id}/similar?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    getMovies();
  }, [media_type, id]);

  return (
    <div className="mt-4 mb-10">
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={14}
        slidesPerView={item}
      >
        {!loading ? (
          movies
            ?.filter((movie) => movie.id !== id)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/details/${media_type}/${item.id}`}>
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

export default Similar