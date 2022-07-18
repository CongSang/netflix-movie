import React from "react"
import CommentItem from "./CommentItem"

const ReplyCommentList = ({ listComment, commentParentId, movieId, user }) => {
  return (
    <div className="mt-5 ml-10">
      {listComment.map((p) => {
        if (p.responseTo === commentParentId) {
          return (
            <CommentItem
              key={p.id}
              item={p}
              movieId={movieId}
              listComment={listComment}
              user={user}
            />
          );
        }

        return null
      })}
    </div>
  )
}

export default ReplyCommentList