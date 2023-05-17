import React, { useState } from "react";
import Axios from "axios";
import './App.css';

function App() {
  const [deleteUserId, setDeleteUserId] = useState(0);
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    Axios.post("http://localhost:3000/register", {
      username: regUsername,
      password: regPassword
    }).then((response) => {
      console.log(response);
    });
  }

  const delete_user = () => {
    Axios.post("http://localhost:3000/delete_user", {
      userId: deleteUserId
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <div className="input_card">
        <h1>Register</h1>
        <label>Username</label>
        <input type="text" onChange={(input) => {setRegUsername(input.target.value);}}></input>
        <label>Password</label>
        <input type="text" onChange={(input) => {setRegPassword(input.target.value);}}></input>
        <button onClick={register}>Register</button>
      </div>
      <div className="input_card">
        <h1>Sign In</h1>
        <label>Username</label>
        <input type="text"></input>
        <label>Password</label>
        <input type="text"></input>
        <button>Sign In</button>
      </div>
      <div>
        <></>
      </div>
      <div className="input_card">
        <input type="number" onChange={(input) => {setDeleteUserId(input.target.value);}}></input>
        <button onClick={delete_user}>Delete User</button>
      </div>
    </>
  );
}

export default App
