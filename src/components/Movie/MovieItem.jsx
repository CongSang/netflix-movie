import React from 'react'

import ImgFade from '../ImgFade'

const MovieItem = ({ data }) => {
  const { poster_path } = data

  return (
    <div className='flex flex-col justify-center rounded-lg overflow-hidden aspect-9/16 group' style={{ background: "#222" }}>
      <ImgFade
        lazy_src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
        alt={data.title ? data.title : data.name}
        className='w-full object-cover h-full group-hover:brightness-75'
      />
        
      <div className='p-2 text-white text-sm bg-[#222] h-50 rounded-b-lg'>
        <p className="group-hover:text-[#e74c3c] line-clamp-1">
          {data.title ? data.title : data.name}
        </p>
      </div>
    </div>
  )
}

export default MovieItem