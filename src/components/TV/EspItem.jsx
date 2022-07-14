import React from "react"
import { NavLink } from "react-router-dom"

const isNotActiveStyle = 'w-full overflow-hidden bg-[#222] block my-1'
const isActiveStyle = 'w-full overflow-hidden bg-[#e67e22] block my-1'

const EspItem = ({ esp, id }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <NavLink
      to={`/watch/tv/${id}/season/${esp.season_number}/esp/${esp.episode_number}`}
      className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
      onClick={scrollToTop}
    >
      <div className="flex h-full items-center">
        <div className="flex flex-row">
          <img
            src={
              esp.still_path
                ? `https://image.tmdb.org/t/p/w500${esp.still_path}`
                : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
            }
            alt={esp.name}
            className="lg:w-120 w-150 aspect-16/9 object-cover rounded-sm"
          />
        </div>

        <div className="px-3 flex-1">
          <p className="text-white text-base font-semibold line-clamp-2">Episode {esp.episode_number}</p>
          <p className="text-white text-base pt-1 line-clamp-1 text-white">Name: {esp.name}</p>
        </div>
      </div>
    </NavLink>
  )
}

export default EspItem