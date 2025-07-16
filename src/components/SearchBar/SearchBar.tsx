import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  
  const handleFormAction = (formData: FormData) => {
    const query = formData.get('query') as string;
    
    if (!query || query.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    
    onSubmit(query.trim());
  };

  return (
    <form className={styles.form} action={handleFormAction}>
      <input
        className={styles.input}
        type="text"
        name="query"
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
