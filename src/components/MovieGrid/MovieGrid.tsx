import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie'; 



interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void; 
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) { 
  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
        <li 
          key={movie.id} 
          className={styles.card}
          onClick={() => onSelect(movie)} 
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://placehold.co/500x750?text=No+Image'
            }
            alt={movie.title}
            className={styles.image}
          />
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.year}>
            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
          </p>
        </li>
      ))}
    </ul>
  );
}

