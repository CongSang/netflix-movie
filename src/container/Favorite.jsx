import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

import { useStore } from '../store/stored'
import { deleteFavoriteMovie } from '../data/database'
import Spinner from '../components/Spinner'
import Title from '../components/Title'
import MovieItem from '../components/Movie/MovieItem'

const Favorite = () => {
  const { currentUser, favoriteList, setFavoriteList } = useStore((state) => state);

  const [loading, setLoading] = useState(false)

  const handleDeleteMovie = async (data) => {
    const result = window.confirm(
      "Are you sure you want to delete this movie?"
    )
    if (result) {
      if (!currentUser) return;
      setLoading(true);
      const result = await deleteFavoriteMovie(data)

      const newFavoriteList = favoriteList.filter(
        (item) => item.id !== result.id
      );

      setFavoriteList(newFavoriteList)
      setLoading(false);
      toast.success("Delete success !")
    }
  }

  if (loading) return <Spinner />

  return (
    <div className="w-1200 max-w-mx-8 mt-24 mb-12 mx-auto min-h-screen">
      <Title title="My favorites movie" />
      <h1 className="text-white text-2xl mb-5 font-medium">Favorite Movie</h1>

      {favoriteList.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favoriteList &&
            favoriteList.map((item) => (
              <div key={item.id} className="relative">
                <Link
                  to={`/details/${item.movie.media_type}/${item.movie.id}`}
                >
                  <MovieItem data={item.movie} />
                </Link>
                <div
                  className="absolute bottom-3 right-0 p-2"
                  onClick={() => handleDeleteMovie(item)}
                >
                  <FaTrash 
                    fontSize={16} 
                    className='cursor-pointer text-rose-600 opacity-60 hover:opacity-100' 
                    title='delete'
                  />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="not-favorite">
          <h1 className="favorite-title">Not movies</h1>
        </div>
      )}
    </div>
  )
}

export default Favorite