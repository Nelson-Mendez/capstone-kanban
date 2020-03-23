import React from "react";
// import axios from "axios";

import "./home.scss";

export default function Home () {

    return (
        <div className="splash">

            <div className="splash__content">
                <h1 className="splash__title">Welcome to Simple Kanban!</h1>
                <h3>To continue on,</h3>

                <a href="http://localhost:8080/auth">
                    <img className="splash__image" src={'https://coderwall-assets-0.s3.amazonaws.com/uploads/picture/file/4363/github.png'} alt="github.png"/>
                </a>
            </div>

        </div>
    )
}