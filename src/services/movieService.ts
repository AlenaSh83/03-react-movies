import axios from 'axios';
import type { Movie } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

interface MovieSearchResponse {
  results: Movie[];
}

export const fetchMoviesByQuery = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieSearchResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data.results;
};


