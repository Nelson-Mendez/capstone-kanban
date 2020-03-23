import React from 'react';
import "./newproject.scss";
import axios from 'axios';

export default class newProject extends React.Component {
    
    state = {
        display: false,
        foo: this.props.userId,
    }


    toggleForm = () => {
        this.setState({ display: !this.state.display });
    }

    handleSubmit(e) {
        e.preventDefault();

        let id = Math.floor(Math.random() * 100000000);

        let newProject = {
            projectId: id,
            projectName: e.target.name.value
        };

        axios.post('http://localhost:8080/database/projects/new', newProject)
        .then( res => console.log(res))
        .catch( err => console.log(err));

        this.joinUserProject(id);

        e.target.reset();
    }

    joinUserProject (projectId) {

        const userProject = {
            UserId: Number(this.props.userId),
            ProjectId: projectId,
        }

        axios.post('http://localhost:8080/database/projects/join', userProject)
        .then( res => console.log(res))
        .catch( err => console.log(err));
    }

    render (){

        return (
            <div className="newProject">

                {!this.state.display && (
                    <div className="newProject__create">
                        <button className="newProject__button" onClick={this.toggleForm}>Create New Project!</button>
                    </div>
                )}

                {this.state.display && (                    
                    <form className="newProject__form" onSubmit={this.handleSubmit.bind(this)}>

                        <label htmlFor="name"><b>Name your project!</b></label>
                        <input type="text" placeholder="Enter a project name here!" name="name" required />

                        <button type="submit" className="newProject__submitBtn">Create!</button>
                        <button type="button" className="newProject__cancelBtn" onClick={this.toggleForm}>Close</button>
                    </form>
                )}
            </div>
        )
    }   
}
