import React from "react";
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <div className="first-line">
                <span>{ticket.id}</span>
                <div className="userIcon">
                    {ticket.userDetails.name[0]}
                    <div className={ticket.userDetails.available ? "filled-circle-yellow" : "filled-circle"}></div>
                </div>
            </div>
            <p className="title">{ticket.title}</p>
            <div className="tags">
                <img src="/icons/3 dot menu.svg" />
                {ticket.tag.map((t) => (
                    <div className="tag" key={t}>
                        <div className="filled-circle"></div>
                        <span>{t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketCard;
