import type { Movie } from '../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { title, overview, poster_path, release_date } = movie;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className={styles.content}>
          <h2>{title}</h2>
          <p><strong>Release Date:</strong> {release_date}</p>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
}
