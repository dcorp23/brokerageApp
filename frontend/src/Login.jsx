import React, { useState } from "react";
import Axios from "axios";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = () => {
        Axios.post("http://localhost:3000/login", {
        username: loginUsername,
        password: loginPassword
        }).then((response) => {
        console.log(response);
        });
    };
  
    return (
    <div className="input_card">
        <h1>Login</h1>
        <label>Username</label>
        <input type="text" onChange={(input) => {setLoginUsername(input.target.value);}}></input>
        <label>Password</label>
        <input type="text" onChange={(input) => {setLoginPassword(input.target.value);}}></input>
        <button onClick={login}>Login</button>
    </div>
    );
}

export default Login;