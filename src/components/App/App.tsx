import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

import { fetchMoviesByQuery } from '../../services/movieService';

import type { Movie } from '../../types/movie';


export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
    try {
    setIsLoading(true);
    setError(null);
    const data = await fetchMoviesByQuery(query);

   if (data.length === 0) {
   toast.error('No movies found. Try another query.');
   }

   setMovies(data);
} catch {  
  setError('Something went wrong. Please try again.');
} finally {
  setIsLoading(false);
}
    };

    getMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return; 
    setQuery(newQuery);
    setMovies([]);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}



