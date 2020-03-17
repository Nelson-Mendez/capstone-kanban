import React from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";


export default class Login extends React.Component {

    componentDidMount () {
        console.log("login page component has mounted!")
        Axios
        .get ("http://localhost:8080/auth/login")
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            throw err;
        })
    }

    render() {
        return (
            <>
                <h1>Login page!</h1>
                <h3>Stuff should show up here in the near future</h3>
                <Link to="/user" >
                    <h3>eventually when this page loads and you're authenticated
                        it will maybe redirect you right away to the projects page
                    </h3>
                </Link>
            </>
        )
    }
}