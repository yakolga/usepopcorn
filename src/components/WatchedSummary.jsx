import { average } from "../service/average";

export default function WatchedSummary({watchedMovies}) {
    const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
    const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
    const avgRuntime = average(watchedMovies.map((movie) => movie.runtime));

    return(
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
            <p>
                <span>#️⃣</span>
                <span>{watchedMovies.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
            </div>
        </div>
    )
}