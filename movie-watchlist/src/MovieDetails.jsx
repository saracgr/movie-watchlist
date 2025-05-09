    import { useEffect, useState } from "react" 
    import { useParams } from "react-router-dom"

    export default function MovieDetails(){
        const [movie, setMovie] = useState(null) 
        let { id } = useParams();
        console.log(id)

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
            <img className="poster" src={movie.Poster} alt="Movie Poster"/>
            <div className="movie-details-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <p>{movie.Plot}</p>
                <p>Genre: {movie.Genre}</p>
            </div>
        </div>
         )}   
      </div>
      )
    }
