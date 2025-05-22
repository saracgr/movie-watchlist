import { useState, useEffect, useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { CiBookmarkRemove } from "react-icons/ci";
import { LuFolderHeart } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { logInContext } from '../App';

export default function UserWatchlist(){
    const [movies, setMovies] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const { logInUser } = useContext(logInContext)

useEffect(() => {
      const fetchWatchlist = async () => {
          if(!logInUser){
          return
        }
        setIsLoading(true)
      try {
        const res = await fetch('https://movie-watchlist-wwt5.onrender.com/watchlist', {
          credentials: 'include',
        });
        const watchlist = await res.json()
        const responses = await Promise.all(
          watchlist.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=1293da37&i=${id}`)
            .then(res => res.json())
          )
        );
        const validMovies = responses.filter(movie => movie.Response === 'True');
        setMovies(validMovies)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        alert("Could not load your watchlist.");
        return [];
      }
    };
      fetchWatchlist()
  },[logInUser])

   async function removeMovie(id){
        try{
          const res = await fetch(`https://movie-watchlist-wwt5.onrender.com/watchlist`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({movieId: id})
          });
          
          if(!res.ok) throw new Error('Delete has failed')

          setMovies(prevMovies => prevMovies.filter(movie => movie.imdbID !== id));        
          }catch(err){
          console.error('Error removing:', err)
          alert('Failed to remove movie.');
        }
  }

return(
<div className='userlist-page w-full px-4 py-10 flex flex-col justify-center m-15'>
  {logInUser && logInUser.username ? (
    <h1 className='text-center'>{logInUser.username}'s watchlist<LuFolderHeart className='text-center'/></h1>
  ) : (
  <h1 className='text-center'>Log in first to start saving </h1>  
  )}

  {!isloading && movies.length === 0 && logInUser && 
    <h1>No movies in your watchlist :/</h1>
  }
  {isloading ? (
  <h1>Movie watchlist loading...</h1>
  ):( 
movies && movies.map((movie) => (
  <div key={movie.imdbID} className='movie-result w-full max-w-4xl flex flex-col md:flex-row items-start gap-6 rounded-lg p-6'>
    <div className="movie flex items-center gap-10 flex-1">
      <div className="poster-wrapper">
        <img className="poster" 
          src={movie.Poster}
          onError={(e) => { 
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
          }}
          alt="Movie Poster"
        />
      </div>
      <div className="movie-info flex-1 break-words">
        <h3>{movie.Title} ({movie.Year})</h3>
      </div>
    </div>
    <div className='result-btns flex gap-4 justify-end'>
      <Link className="btn" to={`/search/${movie.imdbID}`}><FaArrowRight/></Link>
      <button className="btn" onClick={() => removeMovie(movie.imdbID)}><CiBookmarkRemove /></button>
    </div>
  </div>
)))}
</div>
)
}