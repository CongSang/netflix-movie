import React, { useEffect } from 'react'

const Title = ({ title }) => {
	useEffect(() => {
		if (title === "undefined") {
      document.title = "Netflix";
    } else {
      document.title = title;
    }
	})

  return (
    <></>
  )
}

export default Title