import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios"

export const History = () => {
    const {loginStatus} = useContext(UserContext);
    const [historyArray, sethistoryArray] = useState([]);

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
                {historyArray.map((object, key) => {
                    return <li key={key}>{object.ticker_symbol} {object.cost_basis} {object.shares} {object.date} {object.buy ? "Bought" : "Sold"}</li>
                })}
            </ul>
        </div>
    )
}

export default History;