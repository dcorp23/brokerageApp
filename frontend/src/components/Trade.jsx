import axios from "axios";
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../App";
import StocksList from "../components/StocksList";
import TradeCSS from "./componentCSS/Trade.module.css";

export const Trade = (props) => {
    const [tickerSymbol, setTickerSymbol] = useState(props.ticker);
    const [buy, setBuy] = useState(props.buy);
    const [shares, setShares] = useState(true);
    const [amount, setAmount] = useState(0);
    const [tradeResponse, setTradeResponse] = useState("");
    const [stocks, setStocks] = useState([]);
    const [userCash, setUserCash] = useState(0);
    const {loginStatus} = useContext(UserContext);

    
    const sendBuyRequest = () => {
        if (amount <= 0) {
            setTradeResponse("Invalid amount");
            return;
        }
        var goodSymbol = false;
        //check if the ticker symbol is correct
        stocks.every(stock => {
            if (stock.symbol == tickerSymbol.toUpperCase()) {
                goodSymbol = true;
                axios.post("http://localhost:3000/stock_api/price", {
                    symbol: tickerSymbol
                }).then((response) => {
                    let stockPrice = parseFloat(response.data.price);

                    axios.post("http://localhost:3000/buy", {
                        tickerSymbol: tickerSymbol, 
                        shares: shares, 
                        amount: amount, 
                        userId: loginStatus, 
                        userCash: userCash, 
                        stockPrice: stockPrice
                    }).then((response) => {
                        setTradeResponse(response.data.message);
                    });
                });
                return false;
            };
            return true;
        });
        if (!goodSymbol) {
            setTradeResponse("Ticker Symbol Not Found");
        }
    };

    const sendSellRequest = () => {
        if (amount <= 0) {
            setTradeResponse("Invalid amount");
            return;
        }
        var goodSymbol = false;
        //check if the ticker symbol is correct
        stocks.every(stock => {
            if (stock.symbol == tickerSymbol.toUpperCase()) {
                goodSymbol = true;
                axios.post("http://localhost:3000/stock_api/price", {
                    symbol: tickerSymbol
                }).then((response) => {
                    let stockPrice = parseFloat(response.data.price);

                    axios.post("http://localhost:3000/sell", {
                        tickerSymbol: tickerSymbol, 
                        shares: shares, 
                        amount: amount, 
                        userId: loginStatus, 
                        stockPrice: stockPrice
                    }).then((response) => {
                        setTradeResponse(response.data.message);
                    });
                });
                return false;
            }
            return true;
        });
        if (!goodSymbol) {
            setTradeResponse("Ticker Symbol Not Found");
        }
    }

    useEffect(() => {
        //get stockList and usersCash
        setStocks(StocksList);
        axios.post("http://localhost:3000/get_user", {
            userId: loginStatus
        }).then((response) => {
            setUserCash(response.data[0].cash);
        });
    }, []);

    return <div className={TradeCSS.Trade}>
        <label>Ticker Symbol</label>
        <input type="text" value={tickerSymbol} onChange={(input) => {setTickerSymbol(input.target.value.toUpperCase())}}></input>
        <label>Stock or Cash</label>
        <select value={shares ? "Shares" : "Cash"} onChange={(event) => setShares(event.target.value === "Shares" ? true : false)}>
            <option value="Shares">Shares</option>
            <option value="Cash">Cash Value</option>
        </select>
        <label>Buy or Sell</label>
        <select value={buy ? "Buy" : "Sell"} onChange={(event) => setBuy(event.target.value === "Buy" ? true : false)}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
        </select>
        <label>Amount</label>
        <input type="number" onChange={(input) => {setAmount(input.target.value)}}></input>
        <br/>
        <button onClick={buy ? sendBuyRequest : sendSellRequest}>Trade</button>
        <br/>
        <p>{tradeResponse}</p>
    </div>
}

export default Trade;