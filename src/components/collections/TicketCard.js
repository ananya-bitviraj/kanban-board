import React from 'react';
import { FaCircle } from 'react-icons/fa';

const TicketCard = ({ ticket, showUserAvatar, avatar, priorityIcon, isPriorityGroup,isStatusGroup, statusIcon }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-info">
        <span>{ticket?.id}</span>
        {showUserAvatar && avatar && (
          <img src={avatar} alt="User Avatar" className="user-avatar-card" />
        )}

      </div>
        <div className="ticket-details">
        { !isStatusGroup && (<img src={statusIcon} alt={`avatar`} className="user-avatar-header" />)}
          <h3 className='ticket-title'>{ticket.title}</h3>
        </div>

        <div className='ticket-tags'>
        { !isPriorityGroup &&  (<img src={priorityIcon} alt='p-icon' />)}
          <div className='feature'>
            <FaCircle className='feature-icon' />
            <span>Feature Request</span>
          </div>
        </div>
      
    </div>
  );
};

export default TicketCard;
