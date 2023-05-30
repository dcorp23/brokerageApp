import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import PortfolioCSS from "./componentCSS/Portfolio.module.css";

export const Portfolio = () => {
    const {loginStatus} = useContext(UserContext);
    const [portfolioArray, setPortfolioArray] = useState([]);
    const [portfolioStartingIndex, setPortfolioStartingIndex] = useState(0);

    let navigate = useNavigate();

    //how much of the array will be shown 
    const arrayWindowSize = 6; 

    const disabledLeft = (portfolioStartingIndex <= 0);
    const disabledRight = (portfolioStartingIndex + arrayWindowSize >= portfolioArray.length);

    //takes argument either +1 or -1 to move left or right
    const moveArrayIndex = (c) => {
        setPortfolioStartingIndex((c * arrayWindowSize) + portfolioStartingIndex);
    };

    useEffect(() => {
        axios.post("http://localhost:3000/active_positions", {
            userId : loginStatus
        }).then((response) => {
            if (response.data.length) {
                setPortfolioArray(response.data);
            }
        })
    }, []);

    return (
        <div className={PortfolioCSS.Portfolio}>
            <ul>
                {portfolioArray.slice(portfolioStartingIndex, portfolioStartingIndex + arrayWindowSize).map((object, key) => {
                    return <li key={key}>{object.ticker_symbol} {object.shares} Shares
                            <button onClick={() => {navigate("/Trade", {state: {ticker: object.ticker_symbol, buy:false}})}}>
                                Sell
                            </button>
                        </li>
                })}
            </ul>
            <div className={PortfolioCSS.PageButtons}>
                <button id={PortfolioCSS.PageLeft} disabled={disabledLeft} onClick={() => {moveArrayIndex(-1)}}>&lt;</button>
                <button id={PortfolioCSS.PageRight} disabled={disabledRight} onClick={() => {moveArrayIndex(1)}}>&gt;</button>
            </div>
        </div>
    )
}