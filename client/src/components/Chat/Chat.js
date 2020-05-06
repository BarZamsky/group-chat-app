import React from "react"
import Sidebar from "./Sidebar/Sidebar"

import "./Chat.scss"

const chat = (props) => {
    return (
        <div className="chat_wrapper">
            <Sidebar/>
            Chat component
        </div>
    )
};

export default chat;
