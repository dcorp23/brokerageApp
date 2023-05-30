import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import PortfolioCSS from "./componentCSS/Portfolio.module.css";


//takes date time object
//YYYY-MM-DD Time HH:MM:SS
//translates to array
//0: MM/DD/YYYY
//1: HH:MM:SS
function formatDate(dateTimeString) {
    var dateTimeSplit = dateTimeString.split("T");
    var dateArray = dateTimeSplit[0].split("-");
    var dateString = parseInt(dateArray[1].slice(-2)) + "/" + 
                    parseInt(dateArray[2]) + "/" + 
                    dateArray[0];

    var timeArray = dateTimeSplit[1].split(":");
    var timeString = parseInt(timeArray[0]) + ":" + 
                    timeArray[1] + ":" + 
                    timeArray[2].slice(0,2);

    return [dateString, timeString];
}

export const History = () => {
    const {loginStatus} = useContext(UserContext);
    const [historyArray, sethistoryArray] = useState([]);
    const [historyStartingIndex, setHistoryStartingIndex] = useState(0);

    //how much of the array will be shown 
    const arrayWindowSize = 10; 

    const disabledLeft = (historyStartingIndex <= 0);
    const disabledRight = (historyStartingIndex + arrayWindowSize >= historyArray.length);

    //takes argument either +1 or -1 to move left or right
    const moveArrayIndex = (c) => {
        setHistoryStartingIndex((c * arrayWindowSize) + historyStartingIndex);
    };

    useEffect(() => {
        axios.post("http://localhost:3000/history", {
            userId : loginStatus
        }).then((response) => {
            if (response.data.length) {
                sethistoryArray(response.data.reverse());
            }
        })
    }, []);

    return (
        <div className={PortfolioCSS.Portfolio}>
            <ul>
                {historyArray.slice(historyStartingIndex, historyStartingIndex + arrayWindowSize).map((object, key) => {
                    var formattedDateTime = formatDate(object.date);
                    return <li key={key}>{object.buy ? "Bought" : "Sold"} {object.shares} shares of {object.ticker_symbol} at ${object.cost_basis} {formattedDateTime[0]} {formattedDateTime[1]}</li>
                })}
            </ul>
            <div className={PortfolioCSS.PageButtons}>
                <button id={PortfolioCSS.PageLeft} disabled={disabledLeft} onClick={() => {moveArrayIndex(-1)}}>&lt;</button>
                <button id={PortfolioCSS.PageRight} disabled={disabledRight} onClick={() => {moveArrayIndex(1)}}>&gt;</button>
            </div>
        </div>
    )
}

export default History;