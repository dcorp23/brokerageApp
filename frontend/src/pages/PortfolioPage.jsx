import {Navbar} from "../components/Navbar";
import { Portfolio } from "../components/Portfolio";

export const PortfolioPage = () => {
    return (
    <div className="PortfolioPage">
        <Navbar />
        <p>This is the Portfolio page</p>
        <Portfolio />
    </div>
    );
}

export default PortfolioPage;