import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Watchlist from './components/Watchlist.jsx'
import Home from './components/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import MovieDetails from './MovieDetails.jsx'

function App() {
  return (
    <Routes>
     <Route path='/' element={<Layout />}>
     <Route index element={<Home />}/>
     <Route path='watchlist' element={<Watchlist />}/>
     <Route path='watchlist/:id' element={<MovieDetails />}/>
     </Route>
    </Routes>
  )
}

export default App
