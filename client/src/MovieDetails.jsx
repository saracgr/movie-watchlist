    import { useEffect, useState } from "react" 
    import { useParams, Link } from "react-router-dom"
    import { FaArrowLeft } from "react-icons/fa";

    export default function MovieDetails(){
        const [movie, setMovie] = useState(null) 
        let { id } = useParams();

        useEffect(() => {
            async function fetchMovieList(){
                setMovie(null)
                try{
                  const res = await fetch(`http://www.omdbapi.com/?apikey=1293da37&i=${id}`)
                  const data = await res.json() 
                     
                  if(data.Response === 'True'){
                    console.log(data)
                        setMovie(data)
                       }else{
                        setMovie(null)
                        alert('Movie not found')
                       }
                    }catch(error){
                        console.error('Fetch error:', error);
                        alert('Something went wrong');      
                        
                    }
                }
               fetchMovieList()
        },[id])            
                        
      return(
      <div className="search-page">
        {movie && (
        <div className='movie-details'>
            <div className="poster-wrapper">
            <img className="poster" src={movie.Poster} 
             onError={(e) => { 
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
            }}
            alt="Movie Poster"/>
            </div>
            <div className="movie-details-info">
                <h2>{movie.Title} ({movie.Year})</h2>
                <p>{movie.Plot}</p>
                <p><span>Genre:</span> {movie.Genre}</p>
            </div>
            <Link className="btn" to={-1}><FaArrowLeft/></Link>
        </div>
         )}   
      </div>
      )
    }
