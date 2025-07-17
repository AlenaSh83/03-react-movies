import axios from 'axios';
import type { Movie } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieSearchResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMoviesByQuery = async (
  query: string,
  page: number
): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      page,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
};



