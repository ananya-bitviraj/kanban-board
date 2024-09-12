import React from 'react';
import GroupColumn from './GroupColumn';
import TicketCard from './TicketCard';

// status icons according to category
const statusIcons = {
  "Todo": "/icons/To-do.svg",
  "Backlog": "/icons/Backlog.svg",
  "In progress": "/icons/in-progress.svg",
  "Done": "/icons/Done.svg",
  "Canceled": "/icons/Cancelled.svg"
};

// priority icons and title according to category
const priorityTitle = {
  "0" : {
    icons: "/icons/No-priority.svg",
    title: "No Priority",
  },
  "1" : {
    icons: "/icons/Low.svg",
    title: "Low",
  },
  "2" : {
    icons: "/icons/Medium.svg",
    title: "Medium",
  },
  "3" : {
    icons: "/icons/High.svg",
    title: "High",
  },
  "4" : {
    icons: "/icons/Urgent.svg",
    title: "Urgent",
  },
}

// name of all the categories in Status (including the one's not in API)
const allStatuses = ["Todo", "Backlog", "In progress", "Done", "Canceled"];

// Helper function to get the user's avatar from the public folder
const getUserAvatar = (userId) => {
  return `/images/users/${userId}.jpg`; 
};

// Component to render the grouped tickets
const GroupedTickets = ({ tickets, users, grouping, sortOption }) => {
  const getGroupedTickets = () => {
    let groupedTickets = {};

    // Group by Status
    if (grouping === 'status') {
      groupedTickets = tickets.reduce((groups, ticket) => {
        groups[ticket.status] = [...(groups[ticket.status] || []), ticket];
        return groups;
      }, {});

      // Ensure all statuses are present
      allStatuses.forEach(status => {
        if (!groupedTickets[status]) {
          groupedTickets[status] = [];
        }
      });
    }

    // Group by User
    else if (grouping === 'user') {
      groupedTickets = tickets.reduce((groups, ticket) => {
        const user = users.find(u => u.id === ticket.userId);
        if (user) {
          const { name, id } = user;  // Get user's name and id (we'll use the id to generate the avatar path)
          const avatar = getUserAvatar(id); // Use the helper function to get the avatar path
          groups[name] = groups[name] || { tickets: [], avatar };  // Store tickets and avatar
          groups[name].tickets.push(ticket);
        } else {
          groups["Unknown"] = [...(groups["Unknown"] || []), ticket];
        }
        return groups;
      }, {});
    }

    // Group by Priority
    else if (grouping === 'priority') {
      groupedTickets = tickets.reduce((groups, ticket) => {
        groups[ticket.priority] = [...(groups[ticket.priority] || []), ticket];
        return groups;
      }, {});
    }

    return groupedTickets;
  };


  // Sort tickets in each group based on the selected sort option
  const sortTickets = (ticketGroup) => {
    if (sortOption === 'priority') {
      return ticketGroup.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'title') {
      return ticketGroup.sort((a, b) => a.title.localeCompare(b.title));
    }
    return ticketGroup;
  };

  const groupedTickets = getGroupedTickets();


  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const groupData = groupedTickets[group];
        return (

          // rendering the title according to diffrent grouping options
          <GroupColumn
            key={group}
            title={
              grouping === 'status' ? (   // for status categoty (icon + title)
                <div className='title-container'>
                  <div className='group-title'>
                  <img src={groupData.avatar} alt={`${group} avatar`} className="user-avatar-header" />
                    {group} <span className='count'>{groupData.length} </span>
                  </div>
                  <div className='title-menu-icons'>
                    <img src='/icons/add.svg' alt='add-icon' />
                    <img src='/icons/3dot.svg' alt='dot-icon' />
                  </div>
                </div>
              ) : grouping === 'user' ? ( // for user categoty  (profile pic + title)
                <div className='title-container'>
                  <div className='group-title'>
                  <img src={groupData.avatar} alt={`${group} avatar`} className="user-avatar-header" />
                  {group} <span className='count'> {groupData.tickets.length} </span>
                </div>
                <div className='title-menu-icons'>
                    <img src='/icons/add.svg' alt='add-icon' />
                    <img src='/icons/3dot.svg' alt='dot-icon' />
                  </div>
                </div>
              ) : (              // for priority category   (icon + title according to the number of priority)
                <div className='title-container'>
                  <div className='group-title'>
                    <img src={priorityTitle[group].icons} alt={`${group} icon`} className="status-icon" />
                    {priorityTitle[group].title} <span className='count'>{groupData.length} </span>
                  </div>
                  <div className='title-menu-icons'>
                    <img src='/icons/add.svg' alt='add-icon' />
                    <img src='/icons/3dot.svg' alt='dot-icon' />
                  </div>
                </div>
              )
            }
          >

             {/* rendering the tickets in each group sorted according to the selected sort option */}
            {sortTickets(grouping === 'user' ? groupData.tickets : groupData).map((ticket) => {
              // Get user for each ticket
              const user = users.find(u => u.id === ticket.userId);
              const avatar = user ? getUserAvatar(user.id) : null;
              const priorityLevel = ticket.priority;
              const priorityIcon = priorityTitle[priorityLevel].icons;
              const status = ticket.status;
              const statusIcon = statusIcons[status]; 

              return (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket}
                  showUserAvatar={grouping !== 'user'} 
                  priorityIcon = {priorityIcon}
                  isPriorityGroup = {grouping === 'priority'}
                  isStatusGroup = {grouping === 'status'}
                  statusIcon={statusIcon}
                  avatar={avatar}
                />
              );
            })}
          </GroupColumn>
        );
      })}
    </div>
  );
};

export default GroupedTickets;
