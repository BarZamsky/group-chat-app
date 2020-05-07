import React from "react"
import UserInfo from "./components/UserInfo/UserInfo"
import Channels from "./components/Chennels/Channels"
import DirectMessages from "./components/DirectMessages/DirectMessages"

import "./Sidebar.scss"

const sidebar = () => (
    <div className="sidebar_wrapper">
        <UserInfo/>
        <Channels/>
        <DirectMessages/>
    </div>
)

export default sidebar;
