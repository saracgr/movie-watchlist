import { useEffect, useState, useContext, createContext } from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";

export default function MovieDetails(){
    const [input, setInput] = useState('') 
    const [movie, setMovie] = useState(null) 
    const [watchlist, setWatchlist] = useState(() => {
      try {
        const stored = localStorage.getItem("watchlist");
        return stored ? JSON.parse(stored) : [];
      } catch (err) {
        console.error("Invalid watchlist data in localStorage:", err);
        localStorage.removeItem("watchlist"); 
        return [];
      }
    });

    async function fetchMovieList(input){
        try{
          const res = await fetch(`http://www.omdbapi.com/?apikey=1293da37&s=${input}&type=movie`)
          const data = await res.json() 
             
          if(data.Response === 'True'){
            console.log(data.Search)
                setMovie(data.Search)
               }else{
                alert('Movie not found')
               }
               setInput('');
            }catch(error){
                console.error('Fetch error:', error);
                alert('Something went wrong');      
                }
            }

        function addToWatchlist(movieId){
            setWatchlist(prevItems => 
              prevItems.includes(movieId) ? prevItems : [...prevItems,movieId]
            );         
         }
         
         useEffect(()=>{
        localStorage.setItem( 'watchlist',JSON.stringify((watchlist)))
         },[watchlist])
          
         
  return(
  <div className="search-page">
    <div className="search">
    <input
    placeholder="movie name" 
    id="movie" 
    value={input}  
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
    if (e.key === 'Enter') {
      fetchMovieList(input);
    }
  }}
    >
    </input>
    <button type="submit" onClick={() => fetchMovieList(input)}><FaSearch/></button>
    </div>
   
    {movie && movie.map((movie) => (
    <div key={movie.imdbID} className='movie-result'>
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
        <div className="result-btns">
        <Link className="btn" to={`/watchlist/${movie.imdbID}`}><FaArrowRight/></Link>
        <button className="btn" onClick={() => addToWatchlist(movie.imdbID)}><MdBookmarkAdd /></button>
        </div>
    </div>
     ))}   
  </div>
  )
}