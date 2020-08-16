import Popup from "reactjs-popup";
import React from "react";
import { BrowserRouter as Link } from "react-router-dom";


const Popup = () => {
    return (
        <Popup trigger={<tr></tr>} position="bottom center" modal closeOnDocumentClick>
            <CreateEvent name={host}> </CreateEvent>
        </Popup>
    );
};

export default Popup;