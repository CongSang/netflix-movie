import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from "@tippyjs/react/headless"

import { BASE_URL, API_KEY } from '../utils/constant'
import Title from '../components/Title'
import SimilarWatch from '../components/Similar/SimilarWatch'

const Search = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)

  const onChangeInput = (e) => {
    setSearchTerm(e.target.value)

    if (!searchTerm.trim()) return setResult([])

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        setLoading(true);
        fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchTerm}`)
          .then((res) => res.json())
          .then((data) => {
            setResult(data.results)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          });
      }
    }, 500);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return

    navigate(`/results?q=${searchTerm}`)
  }

  return (
    <form onSubmit={onSubmitForm} className="flex justify-center items-start h-80vh mt-36 animate-fade-in duration-200 ease-out">
      <Title title="Search movies and TV shows" />

      <Tippy
        interactive
        placement="bottom-start"
        render={(attrs) => (
          <div className="scrollbar-hide overflow-y-auto w-500 max-w-vw h-320 overflow-hidden bg-[#222] rounded-md">
            <SimilarWatch
              loading={loading}
              data={result}
            />
          </div>
        )}
        visible={result.length > 0}
      >
        <div className="flex max-w-vw">
          <input
            onChange={onChangeInput}
            value={searchTerm}
            placeholder="Search...."
            className="p-3 text-white text-lg rounded-l-lg border-0 outline-none w-500 max-w-vw bg-[#222]"
            type="text"
          />
          <input 
            className="bg-secondaryColor-100 px-4 py-3 rounded-r-lg border-0 outline-none text-white font-medium cursor-pointer" 
            type="submit" 
            value="Search" />
        </div>
      </Tippy>
    </form>
  )
}

export default Search