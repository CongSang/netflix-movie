import React from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../config/firebase'
import reactionGif from '../../utils/reactionGif'

const Reaction = ({ comment, setShowReaction, showReaction, user }) => {
  const handleReact = (type) => {
    const docRef = doc(db, `comments/${comment.id}`);
    if (comment?.reactions?.some((item) => item.userId === user.uid)) {
      const newReaction = comment.reactions.filter(
        (item) => item.userId !== user.uid
      )

      const reactUserType = comment?.reactions.find(
        (item) => item.userId === user.uid
      ).type

      if (type === reactUserType) {
        updateDoc(docRef, {
          reactions: newReaction,
        });

        return setShowReaction(false)
      }

      updateDoc(docRef, {
        reactions: [...newReaction, { userId: user.uid, type: type }],
      })
    } else {
      updateDoc(docRef, {
        reactions: [...comment?.reactions, { userId: user.uid, type: type }],
      })
    }

    setShowReaction(false)
  }

  return (
    <div
      className="absolute items-center -bottom-1.5 left-0 z-50 p-1 bg-[#222] "
      style={{
        borderRadius: "20px",
        display: showReaction ? "flex" : "none",
      }}
    >
      {reactionGif.map((item) => (
        <div
          key={item.name}
					className='flex flex-col justify-between items-center'
        >
          <img
            onClick={() => handleReact(item.name)}
						className='w-6 h-6 object-cover mx-1 cursor-pointer'
            src={item.image}
            alt={item.name}
          />
          {comment?.reactions.some((item) => item.userId === user?.uid) &&
            comment?.reactions.find((item) => item.userId === user?.uid)
              .type === item.name && <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]" />}
        </div>
      ))}
    </div>
  );
}

export default Reaction