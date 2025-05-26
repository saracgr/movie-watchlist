    import { useEffect, useState, useContext } from "react" 
    import { useParams, Link, useNavigate } from "react-router-dom"
    import { FaArrowLeft } from "react-icons/fa";
    import { BeatLoader } from "react-spinners";
    import { MdBookmarkAdd } from "react-icons/md";
    import { logInContext } from '../App';

    export default function MovieDetails(){
        const [movie, setMovie] = useState(null)
        const [isLoading, setIsLoading] = useState(false)
        let { movieId } = useParams();
        const {logInUser} = useContext(logInContext)
        const navigate = useNavigate();

        useEffect(() => {
            async function fetchMovieList(){
                setMovie(null)
                setIsLoading(true)
                try{
                  const res = await fetch(`https://www.omdbapi.com/?apikey=1293da37&i=${movieId}`)
                  const data = await res.json() 
                     
                  if(data.Response === 'True'){
                    console.log(data)
                        setMovie(data)
                        setIsLoading(false)
                       }else{
                        setMovie(null)
                        alert('Movie not found')
                        setIsLoading(false)
                       }
                    }catch(error){
                        console.error('Fetch error:', error);
                        alert('Something went wrong');   
                        setIsLoading(false)                      
                    }
                }
               fetchMovieList()
        },[movieId])
        
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
      <div className="search-page w-full px-4 py-10 flex justify-center">
        {isLoading && <BeatLoader className='mt-10' />}
        {movie && (
        <div className='movie-details w-full max-w-4xl flex flex-col md:flex-row items-center gap-6 rounded-lg shadow-md p-6'>
            <div className="poster-wrapper">
            <img className="poster" src={movie.Poster} 
             onError={(e) => { 
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
            }}
            alt="Movie Poster"/>
            </div>
            <div className="movie-details-info">
                <h2 className="font-bold">{movie.Title} ({movie.Year})</h2>
                <p>{movie.Plot}</p>
                <p className="mt-4"><span>Genre:</span> {movie.Genre}</p>
            </div>
            <div className="flex gap-4 mt-6">
            <button className="btn" onClick={() => navigate(-1)}><FaArrowLeft/></button>
            <button className="btn" onClick={() => addToWatchlist(movie.imdbID)}><MdBookmarkAdd /></button>
            </div>
        </div>
         )}
      </div>
      )
    }
