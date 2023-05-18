import { useState, useEffect } from "react";
import StocksList from "../components/StocksList"

function stockFilter(stock, searchQuery) {
    return (stock.symbol.toLowerCase().includes(searchQuery) || 
            stock.name.toLowerCase().includes(searchQuery))
}

function getFilteredStocks (searchQuery, stocks) {
    if (!searchQuery) {
        return [];
    }
    return stocks.filter(stock => stockFilter(stock, searchQuery.toLowerCase()));
}


export const SearchBar = (props) => {
    const [stocks, setStocks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setStocks(StocksList);
    }, []);

    const filteredStocks = getFilteredStocks(searchQuery, stocks).slice(0, 6);

    return(
    <div className="SearchBar">
        <label>Search for Stocks</label>
        <input type="text" onChange={(input) => {setSearchQuery(input.target.value)}}></input>
        <ul>
            {filteredStocks.map(stock => <button key={stock.symbol} onClick={() => props.setSymbol(stock.symbol)}>
                {stock.symbol} {stock.name}
            </button>)}
        </ul>
    </div>
    );
}

export default SearchBar;