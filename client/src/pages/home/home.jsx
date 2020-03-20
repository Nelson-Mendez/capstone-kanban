import React from "react";
// import axios from "axios";

import "./home.scss";

export default function Home () {

    return (
        <>
            <h1>Home page hyyyppeeee</h1>
            <a href="http://localhost:8080/auth">
            {/* ?redirect_uri=http://localhost:3000/user */}
                <h3>Log in with github!</h3>
            </a>

        </>
    )
}