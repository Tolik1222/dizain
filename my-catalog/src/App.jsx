// src/App.jsx
import { useState, useEffect } from 'react';
import { fetchMovies } from './services/api';
import Header from './components/Header';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('Batman');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(searchQuery);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, [searchQuery]);

  const handleAdd = (newMovie) => {
    setItems(prev => [newMovie, ...prev]);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.imdbID !== id));
  };

  return (
    <div className="container">
      <Header onSearch={setSearchQuery} />
      <AddItemForm onAdd={handleAdd} />
      
      <main>
        {isLoading && <p>Завантаження...</p>}
        {error && <p className="error">Помилка: {error}</p>}
        
        {!isLoading && !error && items.length === 0 && <p>Нічого не знайдено</p>}
        
        {!isLoading && !error && items.length > 0 && (
          <ItemList items={items} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default App;