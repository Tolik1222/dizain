import React from 'react';

function ItemCard({ Title, Poster, Year, imdbID, onDelete }) {
  return (
    <div className="item-card">
      <img src={Poster !== "N/A" ? Poster : 'https://via.placeholder.com/150'} alt={Title} />
      <h3>{Title}</h3>
      <p>Рік: {Year}</p>
      <button onClick={() => onDelete(imdbID)}>Видалити</button>
    </div>
  );
}

export default ItemCard;