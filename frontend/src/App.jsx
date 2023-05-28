import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { StockSearchPage } from "./pages/StockSearchPage";
import { TradePage } from "./pages/TradePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import axios from "axios";
import './App.css';

export const UserContext = createContext({});

function App() {
  const [loginStatus, setLoginStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000/login").then((response) => {
      if (response.data.loggedIn) {
        setLoginStatus(response.data.user[0].id);
      }
      setLoading(false);
    })
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{loginStatus, setLoginStatus}}>
        <Router>
          { loading ? <p>Loading</p> : 
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/Portfolio" element={<PortfolioPage />}/>
              <Route path="/Stocksearch" element={<StockSearchPage />}/>
              <Route path="/Trade" element={<TradePage />}/>
            </Route>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        }
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
