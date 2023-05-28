import { useLocation } from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {Trade} from "../components/Trade";

export const TradePage = ({route}) => {
    const location = useLocation();

    return (
        <div className="TradePage">
            <Navbar />
            <p>{route}</p>
            <Trade ticker={location.state.ticker} buy={location.state.buy}/>
        </div>
    );
}

export default TradePage;