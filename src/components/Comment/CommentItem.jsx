import React, { useEffect, useState } from 'react'

import { calculateCreatedTime } from '../../utils/constant'
import Reaction from '../Reaction/Reaction'
import ShowReaction from '../Reaction/ShowReaction'
import InputReply from './InputReply'
import ReplyCommentList from './ReplyCommentList'

const CommentItem = ({ item, movieId, listComment, user }) => {
	const [showReaction, setShowReaction] = useState(false)
  const [reaction, setReaction] = useState()
  const [countReply, setCountReply] = useState(0)
  const [showReply, setShowReply] = useState(false)
  const [showReplyItem, setShowReplyItem] = useState(false)

	useEffect(() => {
    let count = 0
    listComment.forEach((p) => {
      if (p.responseTo === item.id) {
        count++
      }
    });
    setCountReply(count);
  }, [listComment, item.id])

  useEffect(() => {
    if (!user) {
      return
    }

    const reactionApi = item?.reactions.find(
      (item) => item.userId === user?.uid
    )
    if (!reactionApi) return setReaction(null)
    if (reactionApi) {
      setReaction(reactionApi)
    }
  }, [item.reactions, user])

  return (
    <div style={{ marginBottom: "30px" }}>
      <div className="flex text-white justify-start">
        <div className='flex items-center'>
          <img alt="avatar" src={item.avatar} className='w-8 h-8 rounded-full mr-2' />
        </div>
        <div>
          <div className="relative bg-[#3a3b3c] rounded-lg py-2.5 pr-5 pl-2.5">
            <div className="flex text-white text-sm mb-2">
              <h3 className='font-normal'>{item.userName}</h3>
              <p className="ml-2 font-light opacity-60" >{calculateCreatedTime(item.created_at)}</p>
            </div>
            <p className="font-normal">
              {item.responseTo !== null && (
                <span style={{ color: "#2980b9", marginRight: "5px" }}>
                  {listComment.find((p) => p.id === item.responseTo).userName}
                </span>
              )}
              {item.content}
            </p>

            <Reaction
              comment={item}
              showReaction={showReaction}
              setShowReaction={setShowReaction}
							user={user}
            />
            {item?.reactions?.length > 0 && (
              <ShowReaction reactions={item.reactions} />
            )}
          </div>

          {user && (
            <div className="flex justify-start text-xs mt-1 mr-1 cursor-pointer">
              <p
                onClick={() => setShowReaction(!showReaction)}
                className="mx-2 capitalize"
                style={{
                  color:
                    reaction?.type === "like"
                      ? "#243FD3"
                      : reaction?.type === "love"
                      ? "#F33E58"
                      : "#EAB125",
                }}
              >
                {showReaction ? (
                  <span style={{ color: "#fff" }}>Cancel</span>
                ) : (
                  reaction?.type || <span style={{ color: "#fff" }}>Like</span>
                )}
              </p>
              <p 
								onClick={() => setShowReply(!showReply)}
								className='mx-2 capitalize'
							>
                {showReply ? "Cancel" : "Reply"}
              </p>
            </div>
          )}
        </div>
      </div>

      {showReply && (
        <InputReply
          user={user}
          commentParentId={item.id}
          movieId={movieId}
          setShowReply={setShowReply}
        />
      )}

      {countReply > 0 && (
        <p
          style={{
            color: "#3EA6FF",
            marginLeft: "45px",
            fontSize: "14px",
            marginTop: "4px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => setShowReplyItem(!showReplyItem)}
        >
          {showReplyItem ? "Turn off reply" : `View ${countReply} reply!`}
        </p>
      )}

      {showReplyItem && (
        <ReplyCommentList
          listComment={listComment}
          commentParentId={item.id}
          movieId={movieId}
          user={user}
        />
      )}
    </div>
  )
}

export default CommentItem