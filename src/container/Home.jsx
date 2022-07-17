import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useStore } from '../store/stored'

import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import HomeContent from './HomeContent'
import Movies from './Movies'
import TvShows from './TvShows'
import Favorite from './Favorite'
import Search from './Search'
import Result from './Result'
import Spinner from '../components/Spinner'
import Detail from './Detail'
import WatchMovie from './Watch/WatchMovie'
import WatchTV from './Watch/WatchTV'
import ViewMore from './ViewMore'
import PrivateRoute from './PrivateRoute'

const Home = () => {
  const { currentUser } = useStore(state => state)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  if (typeof currentUser === 'undefined') return <Spinner />

  return (
    <div>
        <Header currentUser={currentUser} />

        <Routes>
          <Route path='/*' element={<HomeContent />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tv_shows' element={<TvShows />} />
          <Route 
            path='/favorites' 
            element={
              <PrivateRoute>
                <Favorite />
              </PrivateRoute>
            } 
          />
          <Route path='/search' element={<Search />} />
          <Route path='/results' element={<Result />} />
          <Route path='/details/:media_type/:id' element={<Detail currentUser={currentUser} />} />
          <Route path='/watch/movie/:id' element={<WatchMovie />} />
          <Route path='/watch/tv/:id/season/:season/esp/:esp' element={<WatchTV />} />
          <Route path='/:media_type/:type' element={<ViewMore />} />
        </Routes>

        <Footer />
    </div>
  )
}

export default Home