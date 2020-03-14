import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrag } from 'react-dnd';

import './stickynote.scss';

function Note (props) {


    
    const { contents } = props;

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.NOTE },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    })

    return(

        <li ref={drag}  style={{backgroundColor: contents.color, opacity: isDragging ? 0.25 : 1, }}>
                <h2>{contents.title}</h2>
                <h3>{contents.user}</h3>
                <p>{contents.description}</p>
        </li>
    )     
}

export default Note