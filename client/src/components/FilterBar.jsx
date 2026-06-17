import React from 'react';

const FilterBar = ({ filter, onFilterChange, onLogout }) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => onFilterChange('all')}
        >
          הכל
        </button>
        <button
          className={filter === 'starred' ? 'active' : ''}
          onClick={() => onFilterChange('starred')}
        >
          מסומנים
        </button>
      </div>
      <button className="logout-button" onClick={onLogout}>
        התנתק / שנה משתמש
      </button>
    </div>
  );
};

export default FilterBar;
