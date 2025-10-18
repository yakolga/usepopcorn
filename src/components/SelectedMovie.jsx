import { useEffect, useState } from "react"
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function SelectedMovie({selectedId, onCloseMovie}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const {Title: title, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movie;
 
    useEffect(
        function() {
            async function getSelectedMovieDetails() {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=9803f263&i=${selectedId}`);
                if (!res.ok) throw new Error("Something went wrong with fetching movies");      
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            }

            getSelectedMovieDetails();
    }, [selectedId]);

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`Poster of the ${title} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbRating} IMDb rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating maxRating={10} size={20}/>
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
            
        </div>
    )
}