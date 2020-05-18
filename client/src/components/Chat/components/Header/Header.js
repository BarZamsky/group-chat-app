import React from "react"
import {connect} from "react-redux"
import ChannelHeader from "./components/Channel/ChannelHeader";

const header = ({manageView}) => {
    let type = manageView.type ? manageView.type : localStorage.getItem("channel_id") ? 'channel' : 'private';
    let id = localStorage.getItem("channel_id")
    return (
        <div className="chat-header">
            {id !== null && type === 'channel' && <ChannelHeader/>}
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(header);

