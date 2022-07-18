import React, { useMemo, useState } from "react"

import { postComment } from "../../data/database"
import { useStore } from "../../store/stored";
import Input from "./Input";
import CommentItem from "./CommentItem";
import useFireStore from "../../hooks/useFireStore";

const Comment = ({ movieId }) => {
  const currentUser = useStore((state) => state.currentUser);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostComment = (e) => {
    e.preventDefault()
    if (!currentUser) return
    if (comment.trim() === "") return
    setLoading(true)
    postComment({
      responseTo: null,
      movieId: movieId,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      avatar: currentUser.photoURL,
      content: comment,
      reactions: [],
      created_at: Date.now(),
    })
    setComment("")
    setLoading(false)
  };

  const conditional = useMemo(
    () => ({
      fieldName: "movieId",
      operator: "==",
      compareValue: movieId,
    }),
    [movieId]
  )

  const { document } = useFireStore("comments", conditional)

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-normal text-white mb-5">Comments {document.length}</h1>
      <form onSubmit={handlePostComment}>
        <Input
          user={currentUser}
          comment={comment}
          setComment={setComment}
          loading={loading}
        />

        <div className="mt-5 pt-2.5 rounded-md">
          {document.map((item) => {
            if (item.responseTo === null) {
              return (
                <CommentItem
                  movieId={movieId}
                  item={item}
                  key={item.id}
                  listComment={document}
									user={currentUser}
                />
              )
            }

            return null
          })}
        </div>
      </form>
    </div>
  )
}

export default Comment;