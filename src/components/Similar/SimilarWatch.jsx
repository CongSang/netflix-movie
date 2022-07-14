import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
 
import { API_KEY, BASE_URL } from '../../utils/constant';
import ImgFade from '../ImgFade'

const SimilarWatch = () => {
	const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSimilar = (id) => {
      fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setData(data.results))
        .catch((err) => {
          console.log(err);
        });
    };

    getSimilar(id);
  }, [id]);

  return (
    <div className="h-screen scrollbar-hide overflow-y-auto rounded-sm">
      <div className="mt-2">
        {data.map((item) => (
          <Link key={item.id} to={`/details/movie/${item.id}`}>
            <div className="flex flex-row mt-2">
              <ImgFade
                lazy_src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                alt={item.title}
                className="w-120 aspect-16/9 object-cover rounded-sm"
              />
							<div className="px-3">
								<p className="text-white text-base font-semibold line-clamp-2">{item.title}</p>
								<p className="text-white text-xs pt-1 line-clamp-1 text-[#e74c3c]">{item.overview}</p>
							</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SimilarWatch