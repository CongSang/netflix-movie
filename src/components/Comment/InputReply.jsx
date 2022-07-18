import React, { useState } from "react"
import { postComment } from "../../data/database"
import nonAvatar from "../../assets/non-avatar.png"

const InputReply = ({ user, commentParentId, movieId, setShowReply }) => {
  const [comment, setComment] = useState("")

  const handleReplyComment = () => {
    if (!user) return;
    if (comment.trim() === "") return

    const newReply = {
      responseTo: commentParentId,
      movieId: movieId,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      content: comment,
      reactions: [],
      created_at: Date.now(),
    }

    postComment(newReply)
    setShowReply(false)
  };

  return (
    <div className="flex items-center mt-5">
      <img
        className="w-8 h-8 rounded-full"
        alt="avatar"
        src={user ? user?.photoURL : nonAvatar}
      />

      <div className="flex items-center bg-transparent outline-none flex-1 h-45 ml-2.5">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type={"text"}
          placeholder={"Write public comments..."}
          className="flex-1 py-2.5 px-4 h-full bg-[#222] border-0 rounded-lg outline-none text-white font-sm w-full max-w-full"
        />
        <button 
        	onClick={handleReplyComment} 
					className="bg-secondaryColor-100 px-5 py-2.5 ml-2 text-white rounded-lg"
				>
          Reply
        </button>
      </div>
    </div>
  )
}

export default InputReply