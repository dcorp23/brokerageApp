import {Navbar} from "../components/Navbar";
import {Trade} from "../components/Trade";

export const TradePage = () => {
    return (
        <div className="TradePage">
            <Navbar />
            <p>This is the Trade page</p>
            <Trade />
        </div>
    );
}

export default TradePage;