import React, { useState } from "react";
import Register from '../components/Register';
import Login from '../components/Login';

export const LoginPage= () => {
    const [showRegisterOrLogin, setShowRegisterOrLogin] = useState(true);

    const swapRegisterLogin = () => {
        setShowRegisterOrLogin(!showRegisterOrLogin);
      }

    return (
        <>
            <div>
                {showRegisterOrLogin ? <Login /> : <Register />}
            </div>
            <label>{showRegisterOrLogin ? "Need an account? " : "Have an account? "}</label>
            <button onClick={swapRegisterLogin}>{showRegisterOrLogin ? "Register" : "Login"}</button>
        </>
    );
}

export default LoginPage;