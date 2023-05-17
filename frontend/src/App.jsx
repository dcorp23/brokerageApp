import React, { useState } from "react";
import Axios from "axios";
import './App.css';
import Register from './Register';
import Login from './Login';
import DeleteUser from './DeleteUser';

function App() {
  return (
    <>
      <Register />
      <Login />
      <DeleteUser />
    </>
  );
}

export default App;
