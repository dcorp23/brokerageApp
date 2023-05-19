import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const Navbar = () => {
    const {loginStatus} = useContext(UserContext);
    let navigate = useNavigate();

    const logout = () => {
    };

    return (
    <div className="Navbar">
        <p>This is the Navbar</p>
        <p>Welcome {loginStatus}</p>
        <br/>
        <button onClick={() => {
            navigate("/Portfolio");
        }}>Portfolio</button>
        <button onClick={() => {
            navigate("/Stocksearch");
        }}>Search Stocks</button>
        <button onClick={() => {
            navigate("/Trade");
        }}>Trade</button>
        <button onClick={logout}>Logout</button>
    </div>
    );
}

export default Navbar;