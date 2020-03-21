import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './user.scss';
import AddProject from '../../components/newProject/newProject'

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
            // return axios.post('http://localhost:8080/database/user/', {
            //     id: this.state.userData.id,
            //     displayName: this.state.userData.displayName
            // })
            // .then( response => console.log(response))
            // .catch(error => console.log("Error", error))
        })
        .catch(err => {
            console.log("Error ", err);
        });
    } 

    joinUserProject(projectId) {

        const foo = {
            UserId: this.state.userData.id,
            ProjectId: projectId
        }
        
        axios.post('http://localhost:8080/database/projects/join', foo)
        .then( res => console.log(res))
        .catch( err => console.log(err));

    }

    authUser () {
        axios.post(`https://github.com/login/oauth/access_token=${this.params}`)
    }

    componentDidMount () {
        console.log("User page component did mount.");
        this.getUserData();

    }

    render () {


        return (
            <> 
                <h1>Welcome {this.state.userData.displayName}! What are you going to do today? </h1>

                <div className="choices">
                    <AddProject newfnc={this.joinUserProject()}/>
                    <Link to={`/project/${this.state.projectId}`} className="choices__one"> <h3>click here to access one of your own projects</h3></Link>
                    <h3 className="choices__one">click here to join another project</h3>
                </div>
                
            </>
        )
    }
} 