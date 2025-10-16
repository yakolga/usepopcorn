import ListItem from "./ListItem"

export default function MovieList({movies}) {
    return(
        <ul className="list">
            {movies?.map((movie) => (
                <ListItem key={movie.imdbID} movie={movie}/>
            ))}
        </ul>
    )
}