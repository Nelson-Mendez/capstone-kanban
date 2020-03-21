import React from 'react';
import "./newproject.scss";
import axios from 'axios';

export default class newProject extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        display: false,
        foo: this.props.userId,
        }
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

        this.props.newfnc(id)
        
        e.target.reset();
    }

    componentDidMount() {
        console.log("newProject component did mount")
        console.log(this.props.userId)
        this.setState ({
            foo: this.props.userId
        })
        console.log(this.state)
    }

    render (){

        return (
            <div className="newProject">

                {!this.state.display && (
                    <button class="newProject__button" onClick={this.toggleForm}>Create New Project</button>
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
