import { useState } from 'react'
import { createContext } from 'react'
import Layout from './components/Layout.jsx'
import Watchlist from './components/Watchlist.jsx'
import Home from './components/Home.jsx'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import './index.css'
import MovieDetails from './MovieDetails.jsx'
import UserWatchlist from './components/UserWatchlist.jsx'
export const themeContext = createContext()

function App() {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <themeContext.Provider value={{theme, toggleTheme}}>
      <div className={theme}>
    <Routes>
     <Route path='/' element={<Layout />}>
     <Route index element={<Home />}/>
     <Route path='watchlist' element={<Watchlist />}/>
     <Route path='watchlist/:id' element={<MovieDetails />}/>
     <Route path='watchlist/userList' element={<UserWatchlist />}/>
     </Route>
    </Routes>
    </div>
    </themeContext.Provider>
  )
}

export default App
