import { useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { title, overview, backdrop_path, release_date, vote_average } = movie;

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Блокування прокрутки
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.backdrop} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        
        {}
        {backdrop_path && (
          <img
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={title}
          />
        )}
        
        <div className={styles.content}>
          <h2>{title}</h2>
          <p><strong>Release Date:</strong> {release_date}</p>
          <p><strong>Rating:</strong> {vote_average?.toFixed(1)}/10</p>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}