import React, { useState } from "react";
import LoginCSS from "./componentCSS/Login.module.css";
import axios from "axios";

export const Register = () => {
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setConfirmPassword] = useState("");
    const [regResponse, setRegResponse] = useState("");
    

    const register = () => {
        if (regConfirmPassword != regPassword) {
            setRegResponse("Password Doesn't Match");
            return;
        }

        axios.post("http://localhost:3000/register", {
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
    <div className={LoginCSS.input_form}>
        <h1>Register</h1>
        <div className={LoginCSS.form_group}>
            <label>Username</label>
            <input type="text" onChange={(input) => {setRegUsername(input.target.value);}}></input>
        </div>
        <div className={LoginCSS.form_group}>
            <label>Password</label>
            <input type="password" onChange={(input) => {setRegPassword(input.target.value);}}></input>
        </div>
        <div className={LoginCSS.form_group}>
            <label>Confirm Password</label>
            <input type="password" onChange={(input) => {setConfirmPassword(input.target.value);}}></input>
        </div>
        <button onClick={register}>Register</button>
        <p>{regResponse}</p>
    </div>
    );
};

export default Register;