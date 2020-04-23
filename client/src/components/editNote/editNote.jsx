import React from 'react';
import { ItemTypes } from '../../partials/constants';
import { useDrop } from 'react-dnd';
import bin from '../../assets/images/workbench.png';
import "./editnote.scss";

function Edit (props) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.NOTE,
        drop: (item) => props.dropNoteEdit(item),
    })

    return (
        <div ref={drop}>
            <img className="edit" src={bin} alt="" />
        </div>
    ) 
}

export default Edit