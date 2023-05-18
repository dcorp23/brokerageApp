import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { StockSearchPage } from "./pages/StockSearchPage";
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
            <Route path="/User" element={<UserPage />}/>
            <Route path="/Stocksearch" element={<StockSearchPage />}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
