import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NavbarCSS from "./componentCSS/Navbar.module.css"
import axios from "axios";

export const Navbar = () => {
    const {loginStatus, setLoginStatus} = useContext(UserContext);
    const [username, setUsername] = useState("");
    let navigate = useNavigate();

    const logout = () => {
        axios.get("http://localhost:3000/logout").then((response) => {
            console.log(response);
          })
        setLoginStatus(0);
        navigate("/");
    };

    useEffect(() => {
        axios.post("http://localhost:3000/get_user", {
            userId: loginStatus
        }).then((response) => {
            setUsername(response.data[0].username);
        });
    }, []);

    return (
    <div className={NavbarCSS.Navbar}>
        <h2>Welcome {username}</h2>
        <button onClick={() => {
            navigate("/Portfolio");
        }}>Portfolio</button>
        <button onClick={() => {
            navigate("/Stocksearch");
        }}>Search Stocks</button>
        <button onClick={() => {
            navigate("/Trade", {state: {ticker:"", buy:true}});
        }}>Trade</button>
        <button onClick={logout}>Logout</button>
    </div>
    );
}

export default Navbar;