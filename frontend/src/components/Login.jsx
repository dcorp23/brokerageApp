import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginCSS from "./componentCSS/Login.module.css";

import { UserContext } from "../App";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState("");
    const {loginStatus, setLoginStatus} = useContext(UserContext);
    let navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:3000/login", {
            username: loginUsername,
            password: loginPassword
        }).then((response) => {
            if (response.data[0]) {
                setLoginResponse(response.data[0].id);
                setLoginStatus(response.data[0].id);
                navigate("/Portfolio");
            }
            else {
                setLoginResponse(response.data.message);
            }
        });
    };

    useEffect(() => {
        if (loginStatus) {
            navigate("/Portfolio");
        }
    }, []);
  
    return (
    <div className={LoginCSS.input_form}>
        <h1>Login</h1>
        <div className={LoginCSS.form_group}>
            <label>Username</label>
            <input type="text" onChange={(input) => {setLoginUsername(input.target.value);}}></input>
        </div>
        <div className={LoginCSS.form_group}>
            <label>Password</label>
            <input type="password" onChange={(input) => {setLoginPassword(input.target.value);}}></input>
        </div>
        <button onClick={login}>Login</button>
        <p>{loginResponse}</p>
    </div>
    );
}

export default Login;