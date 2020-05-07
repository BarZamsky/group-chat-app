import React from "react"
import Sidebar from "./Sidebar/Sidebar"
import Header from "./components/Header"
import Messages from "./components/Messages/Messages"
import Keyboard from "./components/Keyboard/Keyboard"

import "./Chat.scss"

const chat = (props) => {
    return (
        <>
            <Sidebar/>
            <div className="chat_wrapper">
                <Header/>
                <div className="chat-body">
                    <Messages/>
                    <Keyboard/>
                </div>
            </div>
        </>
    )
};

export default chat;
