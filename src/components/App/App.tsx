import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

import { fetchMoviesByQuery } from '../../services/movieService';

import type { Movie } from '../../types/movie';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: moviesData,
    isLoading,
    error,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMoviesByQuery(query, page),
    enabled: !!query,
    placeholderData: previousData => previousData,
  });

  
  useEffect(() => {
    if (isSuccess && moviesData && moviesData.results.length === 0) {
      toast.error('No movies found. Try another query.');
    }
  }, [isSuccess, moviesData]);

  
  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again.');
    }
  }, [isError]);

  const movies = moviesData?.results || [];
  const totalPages = moviesData?.total_pages || 0;

  const handleSubmit = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message || 'Something went wrong. Please try again.'} />}
      
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={handleSelect}
        />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
        />
      )}
      
      <Toaster />
    </div>
  );
}



