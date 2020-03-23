import React from 'react';
import "./joinproject.scss";
import axios from 'axios';

var randomColor = require('randomcolor');


export default class newProject extends React.Component {

    state = {
        display: false,
        foo: this.props.userId,
    }
    createImage = () => {
        const num = Math.ceil(Math.random()*14);
        let table = [];

        for (let i=0; i<num; i++) {
            const noteColor = randomColor({luminosity: 'light'})
            table.push(<div className="joinProject__foo" key={i} style={{backgroundColor: noteColor}}></div>)
        }

        return table
    }


    formOff = () => {
        this.setState({ display: false });
    }

    formOn = () => {
        this.setState({ display: true });
    }

    handleSubmit = (e) => {
        e.preventDefault();
       
        let joinProject = {
            UserId: Number(this.props.userId),
            ProjectId: Number(e.target.id.value),
        };

        axios.post('http://localhost:8080/database/projects/join', joinProject)
        .then( res => {
            console.log(res)
            this.props.getProjects(this.props.userId);
        })
        .catch( err => console.log(err));

        this.formOff();

        e.target.reset();
    }

    render (){

        return (
            <div className="joinProject" >

                {!this.state.display && ( <div className="joinProject__wrap" onClick={this.formOn}>
                    <button className="joinProject__button" >Join a project!</button>
                    <div className="bar">{this.createImage()}</div>
                </div>)}

                {this.state.display && (                    
                    <form className="joinProject__form" onSubmit={this.handleSubmit}>

                        <h3 className="joinProject__header--form" >Enter The Project Id Here!</h3>
                        <input type="text" placeholder="Project Id!" className="joinProject__input"
                        autoComplete="off" name="id" required />

                        <div>
                            <button type="submit" className="joinProject__btn">Join!</button>
                            <button type="button" className="joinProject__btn" onClick={this.formOff}>Close</button>
                            <p>The Project Id is in the URL of the project itself!</p>
                        </div>
                    </form>
                )}
            </div>
        )
    }   
}
