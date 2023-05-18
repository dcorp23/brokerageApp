import React, { useState } from "react";
import Axios from "axios";

export const DeleteUser = () => {
    const [deleteUserId, setDeleteUserId] = useState(0);

    const delete_user = () => {
        Axios.post("http://localhost:3000/delete_user", {
          userId: deleteUserId
        }).then((response) => {
          console.log(response);
        });
      }
  
    return (
        <div className="input_card">
            <input type="number" onChange={(input) => {setDeleteUserId(input.target.value);}}></input>
            <button onClick={delete_user}>Delete User</button>
        </div>
    );
}

export default DeleteUser;