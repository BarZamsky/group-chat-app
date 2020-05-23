import React, {Component} from "react";
import {connect} from "react-redux"
import server from "../../../../../../server"
import {Lock, PersonOutlined} from "@material-ui/icons";
import ChannelDetails from "./Details/ChannelDetails";

import "./ChannelHeader.scss"

class ChannelHeader extends Component {
    state = {
        channel: {}
    };

    componentDidMount() {
        const {channelName} = this.props;
        this.fetchChannel(channelName)
    }

    componentWillReceiveProps(props) {
        const { channelName } = props;
        this.fetchChannel(channelName);
    }

    fetchChannel(channelName) {
        server.get(`/channels/${channelName}`, { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: channel} = res;
                    this.setState({channel})
                }
            });
    }

    render() {
        const {channel} = this.state;
        return (
            channel &&
            <div className="channel-header">
                <div className="data">
                    <div className="name">{channel.private ? <Lock/> : '#'} {channel.name}</div>
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
    }
}

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(ChannelHeader);
