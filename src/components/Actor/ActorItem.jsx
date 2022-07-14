import React from 'react'

import ImgFade from '../ImgFade'

const ActorItem = ({ data }) => {
  const { name, character, profile_path } = data

  return (
    <div className="flex flex-col">
			<div className="rounded-lg bg-[#222] aspect-10/16 overflow-hidden">
				<ImgFade 
					lazy_src={
						profile_path
							? `https://image.tmdb.org/t/p/w500${profile_path}`
							: "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					}
					alt={name}
					className='w-full h-full object-cover'
			/>
			</div>
			<div className="mt-2.5">
				<p className='text-white text-base'>{name}</p>
				<p className='text-[#f1c40f] text-sm'>{character}</p>
			</div>
		</div>
  )
}

export default ActorItem