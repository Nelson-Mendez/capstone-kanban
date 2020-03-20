import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './user.scss';

export default class Projects extends React.Component {
    state = {
        projectList: [],
        userData: [],
        isLoaded: false,
        projectId: "",
    }

    getUserData () {
        axios.get(`http://localhost:8080/user/`)
        .then(res => {
            console.log(res.data)
            this.setState({
                userData: res.data,
            })
            return axios.get()
        })
        .catch(err => {
            console.log("Error ", err);
        });
    } 

    authUser () {
        axios.post(`https://github.com/login/oauth/access_token=${this.params}`)
    }

    componentDidMount () {
        console.log("projectList component did mount.");
        this.getUserData();


    }

    render () {
        return (
            <> 
                <h1>Welcome {this.state.userData.displayName}! What are you finna do? </h1>

                <div className="choices">
                    <h3 className="choices__one">click here to create a new project</h3>
                    <Link to={`/project/${this.state.projectId}`} className="choices__one"> <h3>click here to access one of your own projects</h3></Link>
                    <h3 className="choices__one">click here to join another project</h3>
                </div>
                
            </>
        )
    }
} 