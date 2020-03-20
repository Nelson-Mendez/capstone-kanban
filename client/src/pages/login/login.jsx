import React from 'react';
import Axios from 'axios';


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
                <a href="https://github.com/login/oauth/authorize?client_id=bf4285944652d709211c">Log in with github!</a>
            </>
        )
    }
}