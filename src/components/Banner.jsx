import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL, API_KEY } from '../utils/constant'

const Banner = () => {
	const [banner, setBanner] = useState()

	useEffect(() => {
    const getBanner = () => {
      fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          const random = Math.floor(Math.random() * (19 - 0 + 1) + 0);
          setBanner(data.results[random]);
        })
        .catch((err) => console.log(err));
    }

    getBanner();
  }, []);

  return (
    <div 
			className='banner relative flex justify-center items-center bg-cover bg-no-repeat bg-top-center animation-fade-in md:aspect-2/1 aspect-16/10'
			style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${banner?.backdrop_path})`,
      }}
		>
			<div className="absolute flex justify-between items-center text-white w-1200 max-w-mx-8 z-1 mt-10 md:mt-0">
        <div className="text-white md:w-3/6 w-full">
          <h1 className="md:my-5 text-xl md:text-4xl xl:text-5xl font-semibold">{banner?.title}</h1>
          <p className="my-5 font-normal text-base hidden lg:block">{banner?.overview}</p>
          <div className="flex flex-row md:my-10 my-4">
            <Link
              to={`/watch/movie/${banner?.id}`}
              className="p-2.5 text-white bg-secondaryColor-100 mr-4 cursor-pointer rounded-md"
            >
							Watch Now
            </Link>
            <Link
              to={`/details/movie/${banner?.id}`}
              className="p-2.5 text-white bg-[#34495e] cursor-pointer rounded-md"
            >
							View Info
            </Link>
          </div>
        </div>
        <div className="w-250 h-400 rounded-lg hidden lg:block">
          <img
            src={`https://image.tmdb.org/t/p/w500${banner?.poster_path}`}
            alt={banner?.title}
						className='rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default Banner