import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrop } from 'react-dnd'
import "./projectboard.scss";

function Board (props) {


  const [{ isOver}, drop] = useDrop({
    accept: ItemTypes.NOTE,
    drop: (item) => props.dropNote(props.contents.title, item.ticketId),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    })
  })
  
  return (
    <div ref={drop} className="board"> 
      <h1 className="board__title">{props.contents.title}</h1>

      {props.children}

      {isOver && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.1,
          backgroundColor: 'yellow',
        }} />
      )}
    </div>
  )
}

export default Board