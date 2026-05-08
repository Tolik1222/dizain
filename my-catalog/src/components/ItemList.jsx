import React from 'react';
import ItemCard from './ItemCard';

function ItemList({ items, onDelete }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard 
          key={item.imdbID} 
          {...item} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default ItemList;