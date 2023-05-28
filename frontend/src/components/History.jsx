import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios"

export const History = () => {
    const {loginStatus} = useContext(UserContext);
    const [historyArray, sethistoryArray] = useState([]);
    const [historyStartingIndex, setHistoryStartingIndex] = useState(0);

    const disabledLeft = (historyStartingIndex <= 0);
    const disabledRight = (historyStartingIndex + 6 >= historyArray.length);

    //takes argument either +1 or -1 to move left or right
    const moveArrayIndex = (c) => {
        setHistoryStartingIndex((c * 6) + historyStartingIndex);
    };

    useEffect(() => {
        axios.post("http://localhost:3000/history", {
            userId : loginStatus
        }).then((response) => {
            if (response.data.length) {
                sethistoryArray(response.data);
            }
            else {
                console.log(response);
            }
        })
    }, []);

    return (
        <div className="History">
            <p>Mapping the array</p>
            <ul>
                {historyArray.slice(historyStartingIndex, historyStartingIndex + 6).map((object, key) => {
                    return <li key={key}>{object.ticker_symbol} {object.cost_basis} {object.shares} {object.date} {object.buy ? "Bought" : "Sold"}</li>
                })}
            </ul>
            <button disabled={disabledLeft} onClick={() => {moveArrayIndex(-1)}}>&lt;</button>
            <button disabled={disabledRight} onClick={() => {moveArrayIndex(1)}}>&gt;</button>
        </div>
    )
}

export default History;