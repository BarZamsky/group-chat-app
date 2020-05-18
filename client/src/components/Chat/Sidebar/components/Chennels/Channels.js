import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import AddNewChannel from "./AddNewChannel";
import Modal from "../../../../UI/Modal/Modal"
import {Collapse,List,ListItemText,ListItem}  from '@material-ui/core';
import {ExpandLess,ExpandMore, Add, Lock }from '@material-ui/icons';
import {setChannelView} from "../../../../../actions/manageView";
import server from "../../../../../server"

import "./Channels.scss"

const Channels = ({setChannelView}) => {
    const [open, setOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        server.get('/channels', { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: channels} = res;
                    setChannels(channels);
                }
            });
    }, []);

    const onClickChannelHandler = (channel) => {
        const data = {
            id: channel._id,
            name: channel.name
        };

        setChannelView(data);
        localStorage.setItem("channel_id", channel._id);
        localStorage.setItem("channel_name", channel.name);
    };

    return (
        <>
        <div className="lists channels">
            <ListItem button onClick={() => {setOpen(!open)}}>
                {open ? <ExpandLess /> : <ExpandMore />}
                <ListItemText><span className="title">Channels</span></ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {channels &&  channels.length > 0 && channels.map((channel, index) => (
                        <ListItem key={index}
                                  button
                                  className="list-item"
                                  onClick={() => onClickChannelHandler(channel)}>
                            <ListItemText>
                                <span className="title">
                                    {channel.private ? <Lock/> : '#'}
                                    {channel.name}
                                </span>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <div
                className="add-channel"
                onClick={() => {setShowPopup(true)}}
            >
                <Add className="icon"/> Add a channel
            </div>
        </div>
        {showPopup &&
            <Modal
                onClose={() => setShowPopup(false)}
                showModal={showPopup}
                body={
                    <AddNewChannel
                        onClose={() => setShowPopup(false)}/>
                }
            />}
        </>
    )
};

const mapDispatchToProps = () => dispatch => ({
    setChannelView: data => dispatch(setChannelView(data))
});

export default connect(null, mapDispatchToProps)(Channels)
