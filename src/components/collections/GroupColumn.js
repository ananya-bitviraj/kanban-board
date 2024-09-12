import React from 'react';

const GroupColumn = ({ title, children }) => {
  return (
    <div className="group-column">
      {title}
      {children}
    </div>
  );
};

export default GroupColumn;
