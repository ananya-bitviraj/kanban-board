import React, { useState } from 'react';
import GroupingControls from './GroupingControls';
import SortingControls from './SortingControls';
import DropdownMenu from './DropdownMenu';

const FilterSection = ({ setGrouping, setSortOption, grouping, sortOption }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="filter-section">
      <button className="display-button" onClick={toggleDropdown}>
       <img src={`${process.env.PUBLIC_URL}/icons/Display.svg`} alt='filter-logo' /> Display <img src={`${process.env.PUBLIC_URL}/icons/down.svg`} alt='down-arrow' />
      </button>
      {dropdownVisible && (
        <DropdownMenu closeDropdown={() => setDropdownVisible(false)}>
          <GroupingControls setGrouping={setGrouping} grouping={grouping} />
          <SortingControls setSortOption={setSortOption} sortOption={sortOption} />
        </DropdownMenu>
      )}
    </div>
  );
};

export default FilterSection;
