import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

import { BASE_URL, API_KEY } from '../utils/constant'
import Spinner from './Spinner'

const ModalTrailer = ({ showModal, setShowModal, media_type, id }) => {
	const [trailer, setTrailer] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
    const getTrailer = (media_type, id) => {
			setLoading(true)
      fetch(`${BASE_URL}/${media_type}/${id}/videos?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setTrailer(data.results)
					setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getTrailer(media_type, id);
  }, [id, media_type])

	if (loading) return <Spinner />

  return (
    <div
			className='fixed top-0 left-0 bottom-0 right-0 bg-blackOverlay z-50 justify-center max-w-100vw'
			style={{ display: showModal ? 'flex' : 'none' }}
			onClick={() => setShowModal(false)}
		>
			<div className="overflow-y-auto scrollbar-hide w-500 max-w-full bg-[#636e72] px-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row justify-between items-center mt-4">
          <h1 className="text-white font-semibold capitalize text-lg">{media_type} trailers</h1>
          <AiFillCloseCircle 
						fontSize={30} 
						className='opacity-60 cursor-pointer text-white' 
						onClick={() => setShowModal(false)}	
					/>
        </div>

        <div className="flex flex-col">
          {!trailer.length === 0 ? (
            <h1>No data</h1>
          ) : (
            trailer.map((trailer) => (
              <div key={trailer.id}>
                <h1 className="text-white mt-3 mb-2">{trailer.name}</h1>
                <iframe
                  style={{
                    height: "315px",
                  }}
                  width="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
									allowFullScreen={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
		</div>
  )
}

export default ModalTrailer