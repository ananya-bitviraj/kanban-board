import React, { useEffect } from 'react';

const DropdownMenu = ({ children, closeDropdown }) => {
  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown-menu')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeDropdown]);

  return (
    <div className="dropdown-menu">
      {children}
    </div>
  );
};

export default DropdownMenu;
