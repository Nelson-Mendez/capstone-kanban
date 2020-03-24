import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrag } from 'react-dnd';
import textEllipsis from 'text-ellipsis';

import './stickynote.scss';

function Note (props) {  

    const { contents } = props;

    const [{ isDragging }, drag] = useDrag({
      item: { ticketId: contents.TicketId, type: ItemTypes.NOTE },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    })

    return(

        <div className="stickyNote" ref={drag}  style={{backgroundColor: contents.Color, opacity: isDragging ? 0.25 : 1, }}>
            <h2 className="stickyNote__title">{textEllipsis(contents.Title, 8)}</h2>
            <h2 className="stickyNote__large">{contents.Title}</h2>
            <h3 className="stickyNote__user">{textEllipsis(contents.User, 10)}</h3>
            <h3 className="stickyNote__large">{contents.User}</h3>
            <p className="stickyNote__details">{textEllipsis(contents.Description, 48)}</p>
            <p className="stickyNote__large">{contents.Description}</p>
        </div>

    )     
}

export default Note