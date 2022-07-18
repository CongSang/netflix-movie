import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { API_KEY, BASE_URL } from '../../utils/constant'
import Title from '../../components/Title'
import EmbedVideoTV from '../../components/TV/EmbedVideoTV'
import SeasonItem from '../../components/TV/SeasonItem'
import TVInfo from '../../components/TV/TVInfo'
import Comment from '../../components/Comment/Comment'

const WatchTV = () => {
  const { esp, season, id } = useParams();
  const [seasonTv, setSeasonTv] = useState(1);
  const [espTv, setEspTv] = useState(1);
  const [seasonData, setSeasonData] = useState([]);
  const [seasonCurrent, setSeasonCurrent] = useState(Number(season));
  const [espCurrent, setEspCurrent] = useState();
  const [nameTv, setNameTv] = useState();

  useEffect(() => {
    setEspTv(esp);
    setSeasonTv(season);
  }, [esp, season]);

  useEffect(() => {
    setSeasonCurrent(Number(season));
  }, [season, esp]);

  useEffect(() => {
    const getInfoTv = (id) => {
      fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setSeasonData(data.seasons);
          setNameTv(data.name);
        });
    };

    getInfoTv(id);
  }, [id]);

  useEffect(() => {
    const getEspCurrent = (id, season, esp) => {
      fetch(
        `${BASE_URL}/tv/${id}/season/${season}/episode/${esp}?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEspCurrent(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getEspCurrent(id, season, esp);
  }, [esp, season, id]);

  return (
    <div className="w-1400 max-w-mx-8 mx-auto">
      <Title title={` Watch TV`} />

      <div className="flex flex-col lg:flex-row justify-between mt-24 mb-10 animate-fade-in flex-wrap">
        <div className="lg:w-70p w-full">
          <EmbedVideoTV id={id} espTv={espTv} seasonTv={seasonTv} />
          <TVInfo nameTv={nameTv} espCurrent={espCurrent} />
          <Comment movieId={id} />
        </div>
        <div className="lg:w-28p w-full">
          {seasonData.map((item) => {
            if (item.season_number > 0) {
              return (
                <SeasonItem
                  seasonCurrent={seasonCurrent}
                  setSeasonCurrent={setSeasonCurrent}
                  id={id}
                  key={item.id}
                  item={item}
                />
              );
            }
            return null;
          })}

        </div>
      </div>
    </div>
  )
}

export default WatchTV