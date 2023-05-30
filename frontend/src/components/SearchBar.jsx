import { useState, useEffect } from "react";
import StocksList from "../components/StocksList"
import SearchbarCSS from "./componentCSS/Searchbar.module.css";


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
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        setStocks(StocksList);
    }, []);

    const filteredStocks = getFilteredStocks(searchQuery, stocks).slice(0, 6);

    return(
    <div className={SearchbarCSS.Searchbar}>
        <input type="text" onChange={(input) => {setSearchQuery(input.target.value)}} placeholder="Search For Stocks..."
                onFocus={() => {setSearchFocused(true)}} onBlur={() => {setSearchFocused(false)}}></input>
        <ul hidden={!searchFocused}>
            {filteredStocks.map(stock => <button key={stock.symbol} onMouseDown={() => {props.setSymbol(stock.symbol);}}>
                {stock.symbol} : {stock.name}
            </button>)}
        </ul>
    </div>
    );
}

export default SearchBar;