import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API_KEY, BASE_URL } from '../../utils/constant'
import Title from '../../components/Title'
import EmbedVideoMovie from '../../components/Movie/EmbedVideoMovie'
import MovieInfo from '../../components/Movie/MovieInfo'
import SimilarWatch from '../../components/Similar/SimilarWatch'

const WatchMovie = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, [id]);

  return (
    <div className="w-1400 max-w-mx-8 mx-auto">
      <Title title={`${info?.title} | Watch Movie`} />

      <div className="flex flex-col lg:flex-row justify-between mt-24 mb-10 animate-fade-in flex-wrap">
        <div className="lg:w-70p w-full">
          <EmbedVideoMovie id={id} />
          <MovieInfo data={info} />
        </div>
        <div className="lg:w-28p w-full">
          <h1 className="text-white text-lg">Similar</h1>
          <div>
            <SimilarWatch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchMovie