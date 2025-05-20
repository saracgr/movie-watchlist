import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SearchPage from './components/SearchPage.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import './index.css'
import MovieDetails from './MovieDetails.jsx'
import UserWatchlist from './components/UserWatchlist.jsx'

export const themeContext = createContext()
export const logInContext = createContext()

function App() {
  const [logInUser, setLogInUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });  

  useEffect(() => {
    if (logInUser) {
      localStorage.setItem('user', JSON.stringify(logInUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [logInUser]);
  
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setLogInUser(JSON.parse(storedUser));
  }
}, []);

  return (

    <themeContext.Provider value={{theme, toggleTheme}}>
     <logInContext.Provider value={{logInUser, setLogInUser}}>
      <div className={theme}>
    <Routes>
     <Route path='/' element={<Layout />}>
     <Route index element={<Home />}/>
     
     <Route path='signup' element={<Signup/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='search' element={<SearchPage />}/>
     <Route path='search/:movieId' element={<MovieDetails />}/>
     <Route path='watchlist' element={<UserWatchlist />}/>
     </Route>
    </Routes>
    </div>
     </logInContext.Provider>
    </themeContext.Provider>
  )
}

export default App
