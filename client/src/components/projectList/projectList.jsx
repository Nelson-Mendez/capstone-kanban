import React from "react";
import Project from '../project/Project';
import './projectList.scss'

export default function ProjectList (props) {

    const { allProjects } = props;

    return (
        <div className="projectList">
            {!!allProjects.length && <>
                <h2 className="projectList__header">Select a project to work on!</h2>
                <div className="projectList__projects">
                    {allProjects.map(projects => {
                        return <Project key={projects.ProjectId} content={projects} />                    
                    })}
                </div>
            </>}

            {!allProjects.length && <>
                <h2>Looks like you don't have any projects going on!</h2>
                <h3>Click one of the options below to get started</h3> 
            </>}
        </div>
    );   
}