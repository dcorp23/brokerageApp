import { useState, useEffect } from "react";
import { getStockCurrentPrice, getStockQuote } from "../../../backend/StockApi";


export const StockInfo = (props) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        if (props.symbol) {
            getStockCurrentPrice(props.symbol).then((result) => {
                setCurrentPrice(result.price);
            });
            getStockQuote(props.symbol).then((result) => {
                setQuote(result);
            });
        }
    }, [props.symbol])

    return (
        <div className="StockInfo">
            <h1>{props.symbol && props.symbol}</h1>
            <div>
                <h3>Current Price</h3>
                <p>{currentPrice ? currentPrice : "No Stock Selected"}</p>
            </div>
            <div>
                <h3>Past 30 Day info</h3>
                <p>High: {quote ? quote.high : "No Stock Selected"}</p>
                <p>Low: {quote ? quote.low : "No Stock Selected"}</p>
                <p>Percent Change: {quote ? quote.percent_chage : "No Stock Selected"}</p>
                <p>Average Volume: {quote ? quote.average_volume : "No Stock Selected"}</p>
            </div>
        </div>
    )
}

export default StockInfo