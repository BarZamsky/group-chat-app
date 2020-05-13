import React from "react"
import {connect} from "react-redux"
import ChannelHeader from "./components/ChannelHeader";

const header = ({manageView}) => {
    return (
        <div className="chat-header">
            {manageView.id !== null && manageView.type === 'channel' && <ChannelHeader/>}
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(header);

