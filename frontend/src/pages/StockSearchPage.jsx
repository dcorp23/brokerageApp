import {Navbar} from "../components/Navbar";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import StockInfo from "../components/StockInfo";

export const StockSearchPage = () => {
    const [currentStockSymbol, setCurrentStockSymbol] = useState(null);

    return (
        <div className="StockSearchPage">
            <Navbar />
            <p>This is the Stock Search page</p>
            <SearchBar setSymbol={setCurrentStockSymbol}/>
            <StockInfo symbol={currentStockSymbol}/>
        </div>
    );
}

export default StockSearchPage;