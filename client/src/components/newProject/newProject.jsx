import React from 'react';
import "./newproject.scss";
import axios from 'axios';

export default class newProject extends React.Component {
    
    state = {
        display: false,
    }

    formOff = () => {
        this.setState({ display: false });
    }

    formOn = () => {
        this.setState({ display: true });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let id = Math.floor(Math.random() * 100000000);

        let newProject = {
            projectId: id,
            projectName: e.target.name.value
        };

        axios.post('/database/projects/new', newProject)
        .then( res => {
            console.log(res)
            this.joinUserProject(id);
        })
        .catch( err => console.log(err));

        
        this.formOff()

        e.target.reset();
    }

    joinUserProject (projectId) {

        const userProject = {
            UserId: Number(this.props.userId),
            ProjectId: projectId,
        }

        axios.post('/database/projects/join', userProject)
        .then( (res) => {
            console.log(res);
            this.props.getProjects(this.props.userId)
        })
        .catch( err => console.log(err));

    }

    render (){

        return (
            <div className="newProject">

                {!this.state.display && ( <div className="newProject__wrap" onClick={this.formOn}>
                    <h3 className="newProject__header">Create a new Board!</h3>
                </div>)}

                {this.state.display && (                    
                    <form className="newProject__form" onSubmit={this.handleSubmit}>

                        <h3 className="newProject__header--form">Name your project!</h3>
                        <input type="text" className="newProject__input" autoComplete="off" placeholder="Enter a project name here!" name="name" required />

                        <button type="submit" className="newProject__btn">Create</button>
                        <button type="button" className="newProject__btn" onClick={this.formOff}>Close</button>
                    </form>
                )}
            </div>
        )
    }   
}
