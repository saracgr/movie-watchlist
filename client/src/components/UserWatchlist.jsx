import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { CiBookmarkRemove } from "react-icons/ci";
import { LuFolderHeart } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function UserWatchlist(){
    const [movies, setMovies] = useState([])
    const [watchlist, setWatchlist] = useState(() => {
      try {
        const stored = localStorage.getItem("watchlist");
        return stored ? JSON.parse(stored) : [];
      } catch (err) {
        console.error("Invalid watchlist data in localStorage:", err);
        localStorage.removeItem("watchlist"); // optional cleanup
        return [];
      }
    });

useEffect(() => {
     if(watchlist.length === 0){
        setMovies([])
        return;
     }
           const fetchMovies = async () => {            
                try{
                const responses = await Promise.all(watchlist.map(id => 
                     fetch(`http://www.omdbapi.com/?apikey=1293da37&i=${id}`)
                     .then(res => res.json()) 
                  ))
                  const validMovies = responses.filter(movie => movie.Response === 'True')
                  setMovies(validMovies)
                }            

                catch(error){
                  console.error('Fetch error:', error);
                  alert('Something went wrong');              
                }
           };
           fetchMovies()
        },[watchlist])

    function removeMovie(id){
        setWatchlist((prevItems) => {
         const updated = prevItems.filter((movieId) => movieId !== id)
          localStorage.setItem('watchlist', JSON.stringify(updated))
          return updated
        })
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
            <Link className="btn" to={`/watchlist/${movie.imdbID}`}><FaArrowRight/></Link>
          </div>
      </div>
)))}
</div>
)
}