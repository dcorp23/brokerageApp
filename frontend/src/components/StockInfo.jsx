import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StockInfoCSS from "./componentCSS/StockInfo.module.css";


export const StockInfo = (props) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [quote, setQuote] = useState(null);

    const navigate = useNavigate();

    const updateStockPick = () => {
        axios.post("http://localhost:3000/stock_api/price", {
            symbol: props.symbol,
        }).then((response) => {
            setCurrentPrice(response.data.price);
        });

        axios.post("http://localhost:3000/stock_api/quote", {
            symbol: props.symbol,
        }).then((response) => {
            setQuote(response.data);
        });
    }

    useEffect(() => {
        if (props.symbol) {
            updateStockPick();
        }
    }, [props.symbol])

    console.log(currentPrice);

    return (
        <div className={StockInfoCSS.StockInfo}>
            <h1>{props.symbol ? props.symbol : "No Stock Selected"}</h1>
            <div>
                <h3>Current Price</h3>
                <p>{currentPrice ? "$ " + currentPrice : "No Stock Selected"}</p>
            </div>
            <div>
                <h3>Past 30 Day info</h3>
                <p>High: {quote ? "$ " + quote.high : "No Stock Selected"}</p>
                <p>Low: {quote ? "$ " + quote.low : "No Stock Selected"}</p>
                <p>Percent Change: {quote ? quote.percent_change + " %": "No Stock Selected"}</p>
                <p>Average Volume: {quote ? quote.average_volume : "No Stock Selected"}</p>
            </div>
            <button disabled={!(props.symbol)} onClick={() => {
                        navigate("/Trade", {state: {ticker: props.symbol, buy:true}})
                    }}>
                    {props.symbol ? "Buy " + props.symbol : "Select a Stock"}
            </button>
        </div>
    )
}

export default StockInfo