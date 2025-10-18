import ListItem from "./ListItem"

export default function MovieList({movies, updateSelectedMovie}) {
    return(
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <ListItem key={movie.imdbID} movie={movie} updateSelectedMovie={updateSelectedMovie}/>
            ))}
        </ul>
    )
}