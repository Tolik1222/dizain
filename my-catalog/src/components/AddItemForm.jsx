import React, { useState } from 'react';

function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    
    const newMovie = {
      Title: title,
      Year: "2024",
      imdbID: Date.now().toString(),
      Poster: "N/A"
    };
    
    onAdd(newMovie);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Назва нового фільму" 
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default AddItemForm;