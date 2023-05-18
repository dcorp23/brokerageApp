import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { StockSearchPage } from "./pages/StockSearchPage";
import { TradePage } from "./pages/TradePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import './App.css';

export const UserContext = createContext(null);

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <UserContext.Provider value={{userId, setUserId, username, setUsername}}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/Portfolio" element={<PortfolioPage />}/>
            <Route path="/Stocksearch" element={<StockSearchPage />}/>
            <Route path="/Trade" element={<TradePage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
