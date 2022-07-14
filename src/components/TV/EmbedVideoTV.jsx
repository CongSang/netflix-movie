import React from 'react'

const EmbedVideoMovie = ({ id, seasonTv, espTv }) => {
  return (
    <div className="aspect-16/9 bg-[#222]">
      <iframe
        width={"100%"}
        height={"100%"}
        src={`https://2embed.org/embed/${id}/${seasonTv}/${espTv}`}
        frameBorder="0"
        title="TVShow"
        className="watch-tv-iframe"
        allowFullScreen
      />
    </div>
  )
}

export default EmbedVideoMovie