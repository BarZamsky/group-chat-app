import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import server from "../../../../../server"
import {Lock, PersonOutlined} from "@material-ui/icons";

import "../Header.scss"

const ChannelHeader =  ({manageView}) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        server.get(`/channels/${manageView.name}`, { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: channel} = res;
                    setChannel(channel);
                }
            });
    }, []);

    return (
        <div className="channel-header">
            <div className="data">
                <div className="name">{channel.private ? <Lock/> : '#'}  {channel.name}</div>
                <div className="channel-info">
                    <div className="members"><PersonOutlined/> {channel.users && channel.users.length}</div>
                    <div className="topic">{channel.topic ? channel.topic : 'Add a topic'}</div>
                </div>
            </div>
            <div className="details">
            </div>
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(ChannelHeader);
