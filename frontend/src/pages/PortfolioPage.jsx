import { useContext, useEffect, useState } from "react";
import {Navbar} from "../components/Navbar";
import { Portfolio } from "../components/Portfolio";
import { History } from "../components/History";
import { UserContext } from "../App";
import axios from "axios";

export const PortfolioPage = () => {
    const [showActivePositions, setShowActivePositions] = useState(true);
    const [userCash, setUserCash] = useState(0);
    const {loginStatus} = useContext(UserContext);

    useEffect(() => {
        axios.post("http://localhost:3000/get_cash", {
            userId: loginStatus
        }).then((response) => {
            setUserCash(response.data[0].cash);
        });
    })

    return (
    <div className="PortfolioPage">
        <Navbar />
        <p>This is the Portfolio page</p>
        <p>Cash in account: {userCash}</p>
        <button onClick={() => {setShowActivePositions(!showActivePositions)}}>
            Show {showActivePositions ? "Trade History" : "Active Positions" }
        </button>
        {showActivePositions ? <Portfolio /> : <History />}
    </div>
    );
}

export default PortfolioPage;