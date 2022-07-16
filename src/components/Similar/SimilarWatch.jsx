import React from 'react'
import { Link } from 'react-router-dom'

import ImgFade from '../ImgFade'

const SimilarWatch = ({ data }) => {
  return (
    <div className="mt-2">
      {data.map((item) => (
        <Link key={item.id} to={`/details/movie/${item.id}`}>
          <div className="flex flex-row mt-2">
            <ImgFade
              lazy_src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
              }
              alt={item.title}
              className="w-120 aspect-16/9 object-cover rounded-sm"
            />
            <div className="px-3 flex-1">
              <p className="text-white text-base font-semibold line-clamp-2">{item.title ? item.title : item.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SimilarWatch