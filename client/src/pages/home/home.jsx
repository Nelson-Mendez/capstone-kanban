import React from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

import "./home.scss";

export default function Home () {

    return (
        <>
            <h1>Home page hyyyppeeee</h1>
            <Link to="/login" className="link">
                <h3>Click here to login via GitHub!</h3>
            </Link>

        </>
    )
}