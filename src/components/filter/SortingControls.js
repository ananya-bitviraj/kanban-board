import React from 'react';

const SortingControls = ({ setSortOption, sortOption }) => {
  return (
    <div className="dropdown-item">
      <label>Ordering</label>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingControls;

