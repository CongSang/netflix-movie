import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { BASE_URL, API_KEY } from '../../utils/constant'
import ActorItem from './ActorItem'
import LoadItem from '../Movie/LoadItem'

const Actors = () => {
	const { id, media_type } = useParams()
	const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);

	useEffect(() => {
    const getCasts = (media_type, id) => {
			setLoading(true);
      fetch(`${BASE_URL}/${media_type}/${id}/credits?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((cast) => {
          setCasts(cast.cast.slice(0, 10));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    getCasts(media_type, id);
  }, [media_type, id]);

  return (
    <div className="mt-10">
			<h3 className="text-white text-xl font-semibold">Actor</h3>
			<div className='mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
				{!loading ? (
					casts.map((cast) => <ActorItem key={cast.id} data={cast} />)
				) : (
					<>
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
						<LoadItem />
					</>
				)}
			</div>
		</div>
  )
}

export default Actors