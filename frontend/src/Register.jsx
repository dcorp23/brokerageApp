import React, { useState } from "react";
import Axios from "axios";

export const Register = () => {
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regResponse, setRegResponse] = useState("");

    const register = () => {
        Axios.post("http://localhost:3000/register", {
            username: regUsername,
            password: regPassword
        }).then((response) => {
            if (response.data.message) {
                setRegResponse(response.data.message);
            }
            else {
                setRegResponse("You have been registered");
            }
        });
    };
  
    return (
    <div className="input_card">
        <h1>Register</h1>
        <label>Username</label>
        <input type="text" onChange={(input) => {setRegUsername(input.target.value);}}></input>
        <label>Password</label>
        <input type="password" onChange={(input) => {setRegPassword(input.target.value);}}></input>
        <button onClick={register}>Register</button>
        <p>{regResponse}</p>
    </div>
    );
};

export default Register;