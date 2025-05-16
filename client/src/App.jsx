import { useState } from 'react'
import { createContext } from 'react'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SearchPage  from './components/SearchPage.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
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
     <Route path='signup' element={<Signup/>}/>
    <Route path='login' element={<Login/>}/>
     <Route path='search' element={<SearchPage />}/>
     <Route path='search/:movieId' element={<MovieDetails />}/>
     <Route path='watchlist/:username' element={<UserWatchlist />}/>
     </Route>
    </Routes>
    </div>
    </themeContext.Provider>
  )
}

export default App
