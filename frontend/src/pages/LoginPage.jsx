import React, { useState } from "react";
import Register from '../components/Register';
import Login from '../components/Login';
import LoginCSS from "../components/componentCSS/Login.module.css";

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
            <div className={LoginCSS.switch_page}>
                <label>{showRegisterOrLogin ? "Need an account? " : "Have an account? "}</label>
                <button onClick={swapRegisterLogin}>{showRegisterOrLogin ? "Register" : "Login"}</button>
            </div>
        </>
    );
}

export default LoginPage;