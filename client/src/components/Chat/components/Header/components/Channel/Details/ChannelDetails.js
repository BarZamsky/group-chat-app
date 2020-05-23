import React, {Component} from "react";
import PubSub from "pubsub-js";
import Drawer from '@material-ui/core/Drawer';
import Members from "./Members";
import {InfoOutlined, Clear, Lock} from "@material-ui/icons";
import {object} from "prop-types";
import server from "../../../../../../../server";

import "./ChannelDetails.scss"

class ChannelDetails extends Component{

    state = {
        open: false,
        channel: this.props.channel,
        members: [],
        isFetching: false
    };

    componentWillMount(){
        this.pubsub_event = PubSub.subscribe('UPDATE_MEMBERS_LIST', () => {
            this.fetchMembers();
        });
    }

    componentDidMount() { this.fetchMembers() }

    componentWillUnmount() { PubSub.unsubscribe(this.pubsub_event); }

    componentWillReceiveProps(props) {
        const { channel } = props;
        this.setState({channel});
        this.fetchMembers();
    }

    fetchMembers = () => {
        const {channel} = this.state;
        this.setState({isFetching: true});
        const channelName = channel && channel.name ? channel.name : localStorage.getItem("name");
        server.get(`/channels/${channelName}/members` ,{
            headers:{'x-auth': localStorage.getItem("token")}
        }).then(response => {
            if (response.errorCode === 0)
                this.setState({members: response.data, isFetching: false})
        })
    };

    toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({open: !this.state.open})
    };

    render() {
        const {open, channel, isFetching, members} = this.state;

        return (
            !isFetching &&
            <>
                <button className="show-more" onClick={() => this.setState({open: !this.state.open})}>
                <InfoOutlined/> View details
                </button>
                {open && <Drawer anchor='right' open={open} onClose={this.toggleDrawer()}>
                    <div className="drawer-wrapper">
                        <div className="header">
                            <div className="text">
                                Channel details
                                <div className="name">{channel.private ? <Lock/> : '#'} {channel.name}</div>
                            </div>
                            <div className="close" onClick={() => this.setState({open: !this.state.open})}> {<Clear/>}</div>
                        </div>
                        {members && <Members members={members}/>}
                    </div>
                </Drawer>}
            </>
        )
    }
}

ChannelDetails.propTypes = {
    channel: object.isRequired
};

export default ChannelDetails;
