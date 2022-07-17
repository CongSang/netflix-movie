import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, API_KEY } from '../utils/constant'

import BannerDetail from '../components/BannerDetail'
import Title from '../components/Title'
import Actors from '../components/Actor/Actors'
import Similar from '../components/Similar/Similar'
import { addMovieHistory } from '../data/localStorage'
import ModalTrailer from '../components/ModalTrailer'

const Detail = ({ currentUser }) => {
	const { id, media_type } = useParams()
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

	useEffect(() => {
    const getDetailsMovie = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((details) => {
          setData(details)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }

    setLoading(true);
    getDetailsMovie(media_type, id)
  }, [id, media_type])

  useEffect(() => {
    if (data.id) {
      addMovieHistory({
        id: data?.id,
        poster_path: data?.poster_path,
        media_type: media_type,
        title: data?.name || data?.title,
        viewAt: Date.now(),
      });
    }
  }, [data, media_type])

  return (
    <div>
			<Title title={`${data.name || data.title}`} />
			<BannerDetail 
        id={id} 
        media_type={media_type} 
        data={data} 
        loading={loading} 
        currentUser={currentUser} 
        setShowModal={setShowModal} />

			<div className='w-1200 max-w-mx-8 mx-auto'>
				<p className='text-white'>
					Homepage:{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href={data.homepage}
						className="text-secondaryColor-100"
					>
						{data.homepage}
					</a>
				</p>

				<Actors />
				<div className="mt-12 mb-4">
					<h1 className="font-semibold text-xl text-white">Similar {media_type}</h1>
					<Similar />
				</div>
        {showModal ? (
          <ModalTrailer 
            showModal={showModal} 
            setShowModal={setShowModal} 
            id={id}
            media_type={media_type}  
          />
        ) : null}
			</div>
		</div>
  )
}

export default Detail