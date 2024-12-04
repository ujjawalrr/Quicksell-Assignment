import React from "react";
import TicketCard from "../TicketCard/TicketCard";
import "./KanbanColumn.css";

const KanbanColumn = ({ title, tickets, users, priorities, iconMap, groupBy }) => {
    // const userDetails = users.find((u) => u.id === title) || null;
    // const user = userDetails?.name || "Unassigned";
    return (
        <div className="kanban-column">
            <div className="column-title">
                <div>

                    {groupBy == 'user' ?
                        <>
                            <div className="userIcon">
                                {users.find((u) => u.id === title).name[0]}
                                <div className={users.find((u) => u.id === title).available ? "filled-circle-yellow" : "filled-circle"}></div>
                            </div>
                            <h2 className="title">{users.find((u) => u.id === title).name}</h2>
                        </>
                        :
                        <>
                            <img src={iconMap[title]} />
                            <h2 className="title">{title}</h2>
                        </>
                    }
                    <span>{tickets.length}</span>
                </div>
                <div>
                    <img src="/icons/add.svg" />
                    <img src="/icons/3 dot menu.svg" />
                </div>
            </div>
            <div className="cards">
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
