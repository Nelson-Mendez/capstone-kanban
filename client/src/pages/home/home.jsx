import React from "react";
import Axios from "axios";

import "./home.scss";
const api = 'http://localhost:8000';

export default function Home () {

    // const dothing = () => {
    //     console.log("you did it!")
    //     redirect("http://localhost:8000/auth")
    // }

    return (
        <div className="splash">

            <div className="splash__content">
                <h1 className="splash__title">Welcome to Simple Kanban!</h1>
                <h3>To continue,</h3>
                
                {/* <button onClick={dothing} > */}
                    <a href="http://localhost:8000/auth">
                    {/* <a href="/auth"> */}
                        <img className="splash__image" src={'https://coderwall-assets-0.s3.amazonaws.com/uploads/picture/file/4363/github.png'} alt="github.png"/>
                    </a>
                {/* </button> */}
            </div>

        </div>
    )
}