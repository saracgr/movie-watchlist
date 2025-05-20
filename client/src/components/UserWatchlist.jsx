import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { CiBookmarkRemove } from "react-icons/ci";
import { LuFolderHeart } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function UserWatchlist(){
    const [movies, setMovies] = useState([])
    
useEffect(() => {
      const fetchWatchlist = async () => {
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
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        alert("Could not load your watchlist.");
        return [];
      }
    };
      fetchWatchlist()
  },[])

   async function removeMovie(id){
        try{
          const res = await fetch(`https://movie-watchlist-wwt5.onrender.com/watchlist`, {
            method: 'DELETE',
            credentials: 'include'
          });
          if(!res.ok) throw new Error('Delete has failed')
          setMovies(movies => movies.filter(m => m.imdbID !== id))
        }catch(err){
          console.error('Error removing:', err)
          alert('Failed to remove movie.');
        }
  }

return(
<div className='userlist-page'>
  <h1>your watchlist <LuFolderHeart/></h1>
  {movies.length === 0 ? (
      <h1>No movies in your watchlist :/</h1>
  ) : (
  movies.map(movie => (
      <div key={movie.imdbID} className='movie-result'>
          <div className="movie">
              <div className="poster-wrapper">
                <img className="poster" 
                src={movie.Poster}
                 onError={(e) => { 
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
                }}
                alt="Movie Poster"/>
              </div>
              <div className="movie-info">
                  <h3>{movie.Title} ({movie.Year})</h3>
              </div>
          </div>
          <div className='result-btns'>
            <button className='btn' onClick={() => removeMovie(movie.imdbID)}><CiBookmarkRemove/></button>
            <Link className="btn" to={`/search/${movie.imdbID}`}><FaArrowRight/></Link>
          </div>
      </div>
)))}
</div>
)
}