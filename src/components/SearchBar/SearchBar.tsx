import { type FormEvent } from 'react'; 
import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void; 
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawQuery = formData.get('query');

    const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';

    if (query === '') {
      toast.error('Please enter a movie name.');
      return;
    }

    onSubmit(query); 
    form.reset(); 
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query" 
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}

