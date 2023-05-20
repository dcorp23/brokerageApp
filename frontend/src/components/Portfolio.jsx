import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios"

export const Portfolio = () => {
    const {loginStatus} = useContext(UserContext);
    const [portfolioArray, setPortfolioArray] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3000/portfolio", {
            userId : loginStatus
        }).then((response) => {
            if (response.data.length) {
                setPortfolioArray(response.data);
            }
            else {
                console.log(response);
            }
        })
    }, []);

    return (
        <div className="Portfolio">
            <p>Mapping the array</p>
            <ul>
                {portfolioArray.map((object, key) => {
                    return <li key={key}>{object.ticker_symbol} {object.cost_basis} {object.shares} {object.date}</li>
                })}
            </ul>
        </div>
    )
}