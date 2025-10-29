
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import SearchEngine from "./components/SearchEngine";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";

import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const {movies, isLoading, error} = useMovies(query);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState([], 'watched');

  function updateSelectedMovie(id) {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  function handleDeleteMovie(id) {
    setWatchedMovies(watched => watched.filter(movie => movie.imdbID !== id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  function handleWatchedMovies(movie) {
    setWatchedMovies(watched => [...watched, movie]);
    handleCloseSelectedMovie();
  }

  return (
    <>
      <NavBar>
        <SearchEngine query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies} updateSelectedMovie={updateSelectedMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectedId ? <SelectedMovie selectedId={selectedId} onCloseMovie={handleCloseSelectedMovie} onAddWatched={handleWatchedMovies} watchedMovies={watchedMovies}/> : 
          <>
            <WatchedSummary watchedMovies={watchedMovies}/> 
            <WatchedMovieList watchedMovies={watchedMovies} onDeleteMovie={handleDeleteMovie}/>
          </>}
        </Box>
      </Main>
    </>
  );
}
