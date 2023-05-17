import React, { useState } from "react";
import Axios from "axios";

export const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState("");

    

    const login = (UserId) => {
        Axios.post("http://localhost:3000/login", {
            username: loginUsername,
            password: loginPassword
        }).then((response) => {
            if (response.data[0]) {
                UserId = response.data[0].id;
                setLoginResponse(UserId);
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