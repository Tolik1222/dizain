import React from 'react';

function Header({ onSearch }) {
  return (
    <header className="header">
      <h1>Movie Catalog</h1>
      <input 
        type="text" 
        placeholder="Пошук фільмів..." 
        onChange={(e) => onSearch(e.target.value)} 
      />
    </header>
  );
}

export default Header;