//------------ imports -------------------------------
import React, { useState, useEffect } from 'react';
import FilterSection from '../components/filter/FilterSection';
import GroupedTickets from '../components/collections/GroupedTickets';


// ----------- main function ------------------------------
const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
  const [sortOption, setSortOption] = useState(() => localStorage.getItem('sorting') || 'priority');

// ------------ fetching the data from API ---------------------
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

// ------------- getting the user's last preferences -------------- 
  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedSorting = localStorage.getItem('sorting');
    
    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSortOption(savedSorting);
  }, []);

// ------------- saving the user's last preferences --------------
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sortOption);
  }, [grouping, sortOption]);

  // ------------- rendering the board ---------------------------
  return (
    <div>
      {/* top navbar with display option */}
      <div className='topbar'>
      <FilterSection 
        setGrouping={setGrouping} 
        setSortOption={setSortOption} 
        grouping={grouping}
        sortOption={sortOption}
      />
      </div>

      {/* main board with filtered cards */}
      <GroupedTickets 
        tickets={tickets} 
        users={users} 
        grouping={grouping} 
        sortOption={sortOption}
      />
    </div>
    
  );
};

export default KanbanBoard;
