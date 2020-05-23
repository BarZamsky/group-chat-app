import React, {Component} from "react"
import {connect} from "react-redux"
import AddNewChannel from "./AddNewChannel";
import Modal from "../../../../UI/Modal/Modal"
import {Collapse, List, ListItem, ListItemText} from '@material-ui/core';
import {Add, ExpandLess, ExpandMore, Lock} from '@material-ui/icons';
import {setChannelView} from "../../../../../actions/manageView";
import server from "../../../../../server"

import "./Channels.scss"
import PubSub from "pubsub-js";

class Channels extends Component {

    state = {
        open: false,
        showPopup: false,
        channels: []
    };

    componentWillMount(){
        this.pubsub_event = PubSub.subscribe('UPDATE_CHANNELS', () => {
            this.fetchChannels();
        });
    }

    componentDidMount() {this.fetchChannels()}

    componentWillUnmount() { PubSub.unsubscribe(this.pubsub_event); }

    fetchChannels = () => {
        server.get('/channels', { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: channels} = res;
                    this.setState({channels, open: true})
                }
            });
    };

    onClickChannelHandler = (channel) => {
        const data = {
            id: channel._id,
            name: channel.name
        };

        this.props.setChannelView(data);
        localStorage.setItem("id", channel._id);
        localStorage.setItem("name", channel.name);
        localStorage.setItem("type", "channel");
    };

    render() {
        const {open, showPopup, channels} = this.state;

        return (
            <>
                <div className="lists channels">
                    <ListItem button onClick={() => {this.setState({open: !this.state.open})}}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText><span className="title">Channels</span></ListItemText>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {channels &&  channels.length > 0 && channels.map((channel, index) => (
                                <ListItem key={index}
                                          button
                                          className="list-item"
                                          onClick={() => this.onClickChannelHandler(channel)}>
                                    <ListItemText>
                                        <span className="title">
                                            {channel.private ? <Lock/> : '# '}
                                            {channel.name}
                                        </span>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    <div
                        className="add-channel"
                        onClick={() => {this.setState({showPopup: true})}}
                    >
                        <Add className="icon"/> Add a channel
                    </div>
                </div>
                {showPopup &&
                <Modal
                    onClose={() => this.setState({showPopup: false})}
                    showModal={showPopup}
                    body={
                        <AddNewChannel
                            onClose={() => this.setState({showPopup: false})}/>
                    }
                />}
            </>
        )
    }
}

const mapDispatchToProps = () => dispatch => ({
    setChannelView: data => dispatch(setChannelView(data))
});

export default connect(null, mapDispatchToProps)(Channels)
