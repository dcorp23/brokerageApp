import { useState } from "react";
import {Navbar} from "../components/Navbar";
import { Portfolio } from "../components/Portfolio";
import { History } from "../components/History";

export const PortfolioPage = () => {
    const [showActivePositions, setShowActivePositions] = useState(true);

    return (
    <div className="PortfolioPage">
        <Navbar />
        <p>This is the Portfolio page</p>
        <button onClick={() => {setShowActivePositions(!showActivePositions)}}>
            Show {showActivePositions ? "Trade History" : "Active Positions" }
        </button>
        {showActivePositions ? <Portfolio /> : <History />}
    </div>
    );
}

export default PortfolioPage;