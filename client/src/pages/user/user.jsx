import React from "react";
import axios from "axios";

import AddProject from '../../components/newProject/newProject'
import ProjectList from '../../components/projectList/projectList'
import JoinProject from '../../components/joinProject/joinProject'

import './user.scss';

export default class Projects extends React.Component {
    state = {
        projectList: [],
        userData: [],
        hasData: false,
        projectId: "",
    }

    getUserData () {
        axios.get(`http://localhost:8080/user/`)
        .then(res => {

            this.setState({
                userData: res.data,
                hasData: true,

            })

            
            const userId = Number(res.data.id);
            const displayName = res.data.displayName;
            
            this.sendUser(userId, displayName);
            this.getProjects(userId);

            
        })
        .catch(err => console.log("Error ", err));
    } 

    sendUser(USERID, DISPLAYNAME) {
        let userInfo = {
            userId: USERID,
            displayName: DISPLAYNAME,
        }

        axios.post('http://localhost:8080/database/user', userInfo)
        .then( response => console.log(response))
        .catch( error => console.log(error))
    }


    getProjects = (userId) => {
        axios.get(`http://localhost:8080/database/projects/${userId}`)
        .then(res => this.setState({ projectList: res.data.result }))
        .catch(error => console.log(error));
    }


    componentDidMount () {
        this.getUserData();
    }

    render () {

        const { id } = this.state.userData;

        return (
            <main className="profile"> 
                <h1 className="profile__title" >Welcome {this.state.userData.displayName}! </h1>
                <h3 className="profile__sub" >What are you going to do today?</h3>
                 
                {this.state.hasData && 
                    <div className="profile__options">
                        <ProjectList 
                        className="profile__section" 
                        allProjects={this.state.projectList}
                        />
                        <div className="profile__create-join">
                            <AddProject className="profile__section" userId={id} getProjects={this.getProjects}/>
                            <JoinProject userId={id} getProjects={this.getProjects} />
                        </div>
                    </div>
                }
                
            </main>
        )
    }
} 