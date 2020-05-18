import React from "react"
import {connect} from "react-redux"
import Sidebar from "./Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Messages from "./components/Messages/Messages"
import Keyboard from "./components/Keyboard/Keyboard"

import "./Chat.scss"

const chat = ({manageView}) => {
    return (
        <>
            <Sidebar/>
            <div className="chat_wrapper">
                {localStorage.getItem("channel_id") !== null &&
                <>
                <Header/>
                <div className="chat-body">
                    <Messages/>
                    <Keyboard/>
                </div>
                </> }
            </div>
        </>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(chat);
