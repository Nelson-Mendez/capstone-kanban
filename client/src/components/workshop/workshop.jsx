import React from 'react';
import './workshop.scss';

export default function Workshop (props) {
    const { contents, toggle, updateNote } = props;




    return(
        <div className="workshop__overlay" onSubmit={updateNote}>
            <form className="workshop">
                <h2 className="workshop__heading">Make changes to the ticket</h2>
            
                <input className="workshop__input" name="title" placeholder={contents.Title} required autoComplete="off"/>
                <input className="workshop__input" name="user" placeholder={contents.User || "whose doing it?"} autoComplete="off"/>
                <textarea className="workshop__input--big" name="description" placeholder={contents.Description || "description, max length 150 characters"} autoComplete="off" maxLength="150"/>

                <div className="workshop__buttons">
                <button className="workshop__buttons--save" type="submit">EDIT NOTE</button>
                <button className="workshop__buttons--cancel" type="button" onClick={toggle}>CANCEL</button>
                </div>
            </form>
        </div>
    )
}