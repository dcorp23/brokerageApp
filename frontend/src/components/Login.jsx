import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState("");
    const {loginStatus, setLoginStatus} = useContext(UserContext);
    let navigate = useNavigate();

    const login = () => {
        Axios.post("http://localhost:3000/login", {
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
  
    return (
    <div className="input_card">
        <h1>Login</h1>
        <label>Username</label>
        <input type="text" onChange={(input) => {setLoginUsername(input.target.value);}}></input>
        <label>Password</label>
        <input type="password" onChange={(input) => {setLoginPassword(input.target.value);}}></input>
        <button onClick={login}>Login</button>
        <p>{loginResponse}</p>
    </div>
    );
}

export default Login;