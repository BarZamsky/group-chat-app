import React from "react"
import {connect} from "react-redux"
import Sidebar from "./Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Messages from "./components/Messages/Messages"
import Keyboard from "./components/Keyboard/Keyboard"

import "./Chat.scss"

const chat = ({manageView}) => {
    const show = (manageView.type === 'channel' || localStorage.getItem("type") === 'channel') && localStorage.getItem("id") !== null;

    return (
        <>
            <Sidebar/>
            <div className="chat_wrapper">
                {show &&
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
