import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import server from "../../../../../../server"
import {Lock, PersonOutlined} from "@material-ui/icons";
import ChannelDetails from "./Details/ChannelDetails";

import "./ChannelHeader.scss"

const ChannelHeader =  ({manageView}) => {
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        let channelName;
        if (manageView.name !== null)
            channelName = manageView.name;
        else
            channelName = localStorage.getItem("channel_name");
        server.get(`/channels/${channelName}`, { headers:{'x-auth': localStorage.getItem("token")}})
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
        channel &&
        <div className="channel-header">
            <div className="data">
                <div className="name">{channel.private ? <Lock/> : '#'}  {channel.name}</div>
                <div className="channel-info">
                    <div className="members"><PersonOutlined/> {channel.users && channel.users.length}</div>
                    <div className="topic">{channel.topic ? channel.topic : 'Add a topic'}</div>
                </div>
            </div>
            <div className="details">
                <ChannelDetails channel={channel}/>
            </div>
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(ChannelHeader);
