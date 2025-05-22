import {useState, useContext, } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { logInContext } from "../App";

export default function SearchPage (){
    const [input, setInput] = useState('') 
    const [movie, setMovie] = useState(null) 
    const navigate = useNavigate()
    const {logInUser} = useContext(logInContext)

    async function fetchMovieList(query){
        try{
          const res = await fetch(`https://www.omdbapi.com/?apikey=1293da37&s=${query}&type=movie`)
          const data = await res.json() 
             
          if(data.Response === 'True'){
                setMovie(data.Search)
               }else{
                alert('Movie not found')
                setMovie([])
               }
               setInput('');
            }catch(error){
                console.error('Fetch error:', error);
                alert('Something went wrong');      
                }
            }

        const addToWatchlist = async (movieId) =>{
              if (!logInUser) {
              alert('Please log in to add movies to your watchlist.');
              navigate('/login');
              return;
            }
            try{
              const res = await fetch('https://movie-watchlist-wwt5.onrender.com/watchlist',{
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId })
                });
            }catch(err){
                console.error(err);
                alert('Please log in to add movies to your watchlist.');
                navigate('/login')
            }      
         }
         
  return(
  <div className="search-page flex flex-1 flex-col items-center m-20">
    <div className="search flex items-center gap-[5px]">
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
        <Link className="btn" to={`/search/${movie.imdbID}`}><FaArrowRight/></Link>
        <button className="btn" onClick={() => addToWatchlist(movie.imdbID)}><MdBookmarkAdd /></button>
        </div>
    </div>
     ))}   
  </div>
  )
}