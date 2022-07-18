import React, { useEffect, useState } from "react"
import reactionIcon from "../../utils/reactionIcon"

const ShowReaction = ({ reactions }) => {
  const [totalTypeReaction, setTotalTypeReaction] = useState([])

  useEffect(() => {
    const arrTmp = []
    reactions.map((item) => {
      if (!arrTmp.includes(item.type)) {
        arrTmp.push(item.type)
      }
      return null
    })

    setTotalTypeReaction(arrTmp)
  }, [reactions])

  return (
    <div className="absolute -right-6 -bottom-3 rounded-2xl p-1 bg-[#222] flex items-center">
      <div className="flex items-center">
        {totalTypeReaction.map((item) => (
          <img 
            key={item.userId} 
            src={reactionIcon[item]} alt={item} 
            className='w-4 -px-1' 
          />
        ))}
      </div>
      <div>
        <p style={{ paddingLeft: "3px" }}>{reactions?.length}</p>
      </div>
    </div>
  )
}

export default ShowReaction