import React, { useState } from "react";
import './App.css';
import Register from './Register';
import Login from './Login';


function App() {
  const [userId] = useState(null);
  const [showRegisterOrLogin, setShowRegisterOrLogin] = useState(true);

  const swapRegisterLogin = () => {
    setShowRegisterOrLogin(!showRegisterOrLogin);
  }

  return (
    <>
      <div>
        {showRegisterOrLogin ? <Login userId={null}/> : <Register />}
      </div>
      <label>{showRegisterOrLogin ? "Need an account? " : "Have an account? "}</label>
      <button onClick={swapRegisterLogin}>{showRegisterOrLogin ? "Register" : "Login"}</button>
    </>
  );
}

export default App;
