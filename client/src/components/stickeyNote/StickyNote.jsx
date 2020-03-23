import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrag } from 'react-dnd';

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

        <li ref={drag}  style={{backgroundColor: contents.Color, opacity: isDragging ? 0.25 : 1, }}>
            <h2>{contents.Title}</h2>
            <h3>{contents.User}</h3>
            <p>{contents.Description}</p>
        </li>
    )     
}

export default Note