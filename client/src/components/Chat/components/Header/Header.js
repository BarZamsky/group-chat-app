import React from "react"
import {connect} from "react-redux"
import ChannelHeader from "./components/Channel/ChannelHeader";

const header = ({manageView}) => {
    let type = manageView.type ? manageView.type : localStorage.getItem("type");
    let id = localStorage.getItem("id");

    let name = manageView.name ? manageView.name : localStorage.getItem("name");
    return (
        <div className="chat-header">
            {id !== null && type === 'channel' && <ChannelHeader channelName={name}/>}
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(header);

