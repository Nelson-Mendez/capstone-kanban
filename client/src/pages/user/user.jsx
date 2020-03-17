import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './user.scss';

export default class Projects extends React.Component {
    state = {
        projectList: [],
        isLoaded: false,
        projectId: "",
    }

    componentDidMount () {
        console.log("projectList component did mount.");

        axios.get("http://localhost:8080/projects")
        .then(res => {
            console.log(res)
            this.setState({
                projectList: res.data,
                isLoaded: true
            })
        })
        .catch(err => {
            console.log("Error ", err);
        });
    }

    render () {
        return (
            <> 
            <h1>This is the project page where a list of projects 
                you are a part of will show up </h1>

                <div className="choices">
                    <h3 className="choices__one">click here to create a new project</h3>
                    <Link to={`/project/${this.state.projectId}`} className="choices__one"> <h3>click here to access one of your own projects</h3></Link>
                    <h3 className="choices__one">click here to join another project</h3>
                </div>
                
            {this.state.isLoaded ? <h3>is loaded is true</h3> : <h3> is loaded is false</h3>}
            </>
        )
    }
} 