import React, { useState } from 'react'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import ButtonCustom from './Button/ButtonCustom'
import { useStore } from '../store/stored'
import { addMovieFavorite } from '../data/database'

const BannerDetail = ({ id, media_type, data, loading, currentUser, setShowModal }) => {
  const { favoriteList, setFavoriteList } = useStore(state => state)
  const [loadingAddMovie, setLoadingAddMovie] = useState(false)

  const handleAddToFavorites = async () => {
    if (!currentUser) return toast.error("You are not logged in");

    if (favoriteList) {
      const movieExist = favoriteList.some((item) => item.movie.id === data.id);

      if (movieExist) {
        return toast.error("Movies already exist");
      }
    }

    setLoadingAddMovie(true);
    const newFavorite = await addMovieFavorite(currentUser.uid, data, media_type);
    setFavoriteList([...favoriteList, newFavorite])
    setLoadingAddMovie(false)
    toast.success("Add new favorite successful!")
  }

  return (
    <div
        className={`banner-detail relative flex justify-center items-center bg-cover bg-no-repeat bg-top-center md:aspect-2/1 aspect-16/10 ${loading ? "animate-loading" : ""}`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        }}
      >
        <div className="w-1200 max-w-mx-8 mx-auto">
          <div className="relative flex flex-col flex-wrap lg:flex-row justify-between items-center z-1 mt-20 mb-5">
            <div className={`w-300 h-450 overflow-hidden rounded-lg ${loading ? "animate-loading" : ""}`}>
              {!loading && (
                <img
                  className='w-full h-full'
                  src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                  alt="poster"
                />
              )}
            </div>
            <div className="w-full lg:w-68p max-w-full text-white mt-8 lg:mt-0">
							<h1 className='mb-5 text-3xl font-semibold'>
								{data.name || data.title}
							</h1>
              <p className="text-base">{data.overview}</p>
              <p className="mt-5">
								{data.release_date
									? `Release date: ${data.release_date}`
									: `Last episode: ${data.last_air_date}`}
							</p>
              <div className="flex my-2 flex-wrap">
                {data.genres &&
                  data.genres.map((item) => (
                    <div   
                      key={item.id} 
                      className='my-3 mr-4'
                    >
											<ButtonCustom
												content={item.name}
                        className='cursor-default'
											/>
										</div>
                  ))}
              </div>
              <div className="flex flex-start items-center">
                <StarRatings
                  rating={data.vote_average}
                  starRatedColor="#e74c3c"
                  numberOfStars={10}
                  name="rating"
                  starDimension="15px"
                  starSpacing="2px"
                />
                <div className="ml-3">{`(${
                  data.vote_count || 0
                } vote)`}</div>
              </div>

              <div className="flex my-5 flex-wrap">
                <Link
                  className="p-2 text-white bg-secondaryColor-100 rounded-md mr-4"
                  to={
                    media_type === "tv"
                      ? `/watch/tv/${id}/season/1/esp/1`
                      : `/watch/movie/${id}`
                  }
                >
                  Watch Now
                </Link>
                <span 
                  className="p-2 text-white bg-[#34495e] rounded-md mr-4 cursor-pointer"
                  onClick={() => setShowModal(true)}>
                  Watch Trailer
                </span>
                {currentUser && (
									<span 
                    className="p-2 text-white bg-[#34495e] rounded-md cursor-pointer"
                    onClick={handleAddToFavorites}
                  >
										Add Favorite
									</span>
								)}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BannerDetail