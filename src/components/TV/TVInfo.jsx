import React from 'react'

const TVInfo = ({ nameTv, espCurrent }) => {
  return (
    <div className="mt-4 text-white">
      <h1 className="text-secondaryColor-100 text-2xl font-semibold">{nameTv}</h1>
      <p className="mt-2">
        Season {espCurrent && espCurrent?.season_number} | Episode{" "}
        {espCurrent?.episode_number}
      </p>
      <p className="mt-1">Name: {espCurrent?.name}</p>
      <p className="text-white text-md my-2">Overview: {espCurrent?.overview}</p>
      <p className="text-white text-md mt-3">Air Date: {espCurrent?.air_date}</p>
    </div>
  )
}

export default TVInfo