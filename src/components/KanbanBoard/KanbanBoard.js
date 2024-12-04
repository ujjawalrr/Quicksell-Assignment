import './KanbanBoard.css';
import React, { useEffect, useRef, useState } from "react";
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const KanbanBoard = ({ tickets, users }) => {
  const menuRef = useRef(null);
  
  const DEFAULT_GROUP_BY = "status";
  const DEFAULT_SORT_BY = "priority";

  const [groupBy, setGroupBy] = useLocalStorage("groupBy", DEFAULT_GROUP_BY);
  const [sortBy, setSortBy] = useLocalStorage("sortBy", DEFAULT_SORT_BY);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconMap = {
    "Todo": "/icons/To-do.svg",
    "In progress": "/icons/in-progress.svg",
    "Backlog": "/icons/Backlog.svg",
    "Done": "/icons/Done.svg",
    "Cancelled": "/icons/Cancelled.svg",
    "No priority": "/icons/No-priority.svg",
    "Urgent": "/icons/SVG - Urgent Priority colour.svg",
    "Urgent2": "/icons/SVG - Urgent Priority grey.svg",
    "High": "/icons/Img - High Priority.svg",
    "Medium": "/icons/Img - Medium Priority.svg",
    "Low": "/icons/Img - Low Priority.svg",
  }
  const priorities = [
    {
      value: 0,
      priorityTitle: "No priority"
    },
    {
      value: 1,
      priorityTitle: "Low"
    },
    {
      value: 2,
      priorityTitle: "Medium"
    },
    {
      value: 3,
      priorityTitle: "High"
    },
    {
      value: 4,
      priorityTitle: "Urgent"
    },
  ]
  const groupTickets = () => {
    if (groupBy === "status") {
      return tickets.reduce((groups, ticket) => {
        const userDetails = users.find((u) => u.id === ticket.userId) || null;
        const ticketWithUser = { ...ticket, userDetails };
        (groups[ticket.status] = groups[ticket.status] || []).push(ticketWithUser);
        return groups;
      }, {});
    } else if (groupBy === "user") {
      return tickets.reduce((groups, ticket) => {
        const userDetails = users.find((u) => u.id === ticket.userId) || null;
        const user = userDetails?.name || "Unassigned";
        const ticketWithUser = { ...ticket, userDetails };
        (groups[ticket.userId] = groups[ticket.userId] || []).push(ticketWithUser);
        return groups;
      }, {});
    } else if (groupBy === "priority") {
      return tickets.reduce((groups, ticket) => {
        const userDetails = users.find((u) => u.id === ticket.userId) || null;
        const priority = priorities.find((p) => p.value === ticket.priority)?.priorityTitle || ticket.priority;
        const ticketWithUser = { ...ticket, userDetails };
        (groups[priority] = groups[priority] || []).push(ticketWithUser);
        return groups;
      }, {});
    }
    return {};
  };

  const sortTickets = (tickets) => {
    if (sortBy === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <div>
      <div className='navbar'>
        <div>
          <button className='display-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src='/icons/Display.svg' />
            <span>Display</span>
            <img src='/icons/down.svg' />
          </button>
        </div>
        <div ref={menuRef} className={`controls ${isMenuOpen ? 'show' : ''}`}>
          <div>
            <label>Grouping</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label>Ordering</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <KanbanColumn
            key={group}
            title={group}
            tickets={sortTickets(tickets)}
            users={users}
            priorities={priorities}
            iconMap={iconMap}
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
