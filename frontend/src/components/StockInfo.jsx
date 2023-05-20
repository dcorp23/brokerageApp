import { useState, useEffect } from "react";
import axios from "axios";


export const StockInfo = (props) => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [quote, setQuote] = useState(null);

    const updateStockPick = () => {
        axios.post("http://localhost:3000/stock_api/price", {
            symbol: props.symbol,
        }).then((response) => {
            console.log(response);
            setCurrentPrice(response.data.price);
        });

        axios.post("http://localhost:3000/stock_api/quote", {
            symbol: props.symbol,
        }).then((response) => {
            console.log(response);
            setQuote(response.data);
        });
    }

    useEffect(() => {
        updateStockPick();
    }, [props.symbol])

    console.log(currentPrice);

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
                <p>Percent Change: {quote ? quote.percent_change : "No Stock Selected"}</p>
                <p>Average Volume: {quote ? quote.average_volume : "No Stock Selected"}</p>
            </div>
        </div>
    )
}

export default StockInfo