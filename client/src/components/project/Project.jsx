import React from "react";
import './project.scss'
import { Link } from 'react-router-dom'
import TextEllipsis from 'text-ellipsis';

var randomColor = require('randomcolor');


export default function Project (props) {

    
    let createImage = () => {
        const num = Math.ceil(Math.random()*6);
        let table = [];

        for (let i=0; i<num; i++) {
            const noteColor = randomColor({luminosity: 'light'})
            table.push(<div className="foo" key={i} style={{backgroundColor: noteColor}}></div>)
        }

        return table
    }

    return(
        <Link to={`/project/${props.content.ProjectId}`} className="choices__one">
            <div className="projectThing">
                <p className="projectThing__text"> {TextEllipsis(props.content.ProjectName, 13)} </p>
                <div className="bar">
                    {createImage()}
                </div>
            </div>
        </Link>
    )
}
