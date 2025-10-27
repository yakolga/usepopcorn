export default function WatchedMovieList({watchedMovies, onDeleteMovie}) {
    return(
        <ul className="list">
            {watchedMovies.map((movie) => (
            <li key={movie.imdbID}>
                <img src={movie.poster} alt={`${movie.Title} poster`} />
                <h3>{movie.title}</h3>
                <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                </div>
                <button className="btn-delete" onClick={() => onDeleteMovie(movie.imdbID)}>✕</button>
            </li>
            ))}
        </ul>
    )
}