import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrop } from 'react-dnd';
import bin from '../../assets/images/bin.png';
import "./wastebin.scss";

function WasteBin (props) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.NOTE,
        drop: (item) => props.dropNoteBin(item.ticketId),
      })

     return (
        <div ref={drop} >
            <img className="bin" src={bin} alt="" />
            <div className="bin__text" >
                <p>drop note here</p>
                <p>to delete it!</p>
            </div>
        </div>
    ) 
}

export default WasteBin