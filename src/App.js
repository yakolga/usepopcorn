
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

import { useState, useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [watchedMovies, setWatchedMovies] = useState(function() {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue) || [];
  });

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

  useEffect(function() {
    localStorage.setItem('watched', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  useEffect(function() {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`http://www.omdbapi.com/?apikey=9803f263&s=${query}`, {signal: controller.signal});

        if (!res.ok) throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.log(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }


    handleCloseSelectedMovie();
    fetchMovies();

    return function() {
      controller.abort();
    }
  }, [query]);

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
