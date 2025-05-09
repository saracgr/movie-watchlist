import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export default function MovieDetails(){
    const [input, setInput] = useState(' ') 
    const [movie, setMovie] = useState(null) 
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
          
         
  return(
  <div className="search-page">
    <div className="search">
    <label htmlFor='movie'>NAME</label>
    <input 
    id="movie" 
    value={input}  
    onChange={(e) => setInput(e.target.value)}>
    </input>
    <button type="submit" onClick={() => fetchMovieList(input)}><FaSearch/></button>
    </div>
   
    {movie && movie.map((movie) => (
    <div key={movie.imdbID} className='movie-result'>
        <div className="movie">
        <img className="poster" src={movie.Poster} alt="Movie Poster"/>
        <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>({movie.Year})</p>
        </div>
        </div>
        <Link className="details-btn" to={`/watchlist/${movie.imdbID}`}><FaArrowRight/></Link>
    </div>
     ))}   
  </div>
  )
}