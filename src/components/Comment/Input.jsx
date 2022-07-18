import React from "react"
import { Link, useLocation } from "react-router-dom"

import nonAvatar from "../../assets/non-avatar.png"

const Input = ({ user, comment, setComment, loading }) => {
  const location = useLocation();

  return (
    <div className="flex items-center">
      <img
        className="w-8 h-8 rounded-full"
        alt="avatar"
        src={user ? user?.photoURL : nonAvatar}
      />

      <div className="flex items-center bg-transparent outline-none flex-1 h-45 ml-2.5">
        {user ? (
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type={"text"}
            placeholder="What are you thinking"
            className="flex-1 py-2.5 px-4 h-full bg-[#222] border-0 rounded-lg outline-none text-white font-sm w-full max-w-full"
          />
        ) : (
          <div className="w-full py-2.5 px-4 rounded-lg outline-none text-white border border-[#222] bg-[#222]">
            <h3 className="text-sm font-light text-white">
              You need{" "}
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                className='text-[#3498db]'
              >
                login
              </Link>{" "}
              to comment
            </h3>
          </div>
        )}
        {user ? (
          <button
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
            className="bg-secondaryColor-100 px-5 py-2.5 ml-2 text-white rounded-lg"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Input