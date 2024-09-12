import React from 'react';

const GroupingControls = ({ setGrouping, grouping }) => {
  return (
    <div className="dropdown-item">
      <label>Grouping</label>
      <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingControls;
