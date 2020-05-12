import React, {useState, useEffect} from "react"
import AddNewChannel from "./AddNewChannel";
import Modal from "../../../../UI/Modal/Modal"
import {Collapse,List,ListItemIcon,ListItemText,ListItem}  from '@material-ui/core';
import {ExpandLess,ExpandMore, Add }from '@material-ui/icons';
import server from "../../../../../server"

import "./Channels.scss"

const Channels = (props) => {
    const [open, setOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        server.get('/channels', { headers:{'x-auth': localStorage.getItem("token")}})
            .then((res) => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {channels} = res.data;
                    setChannels(channels);
                }
            });
    }, []);

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
                        <ListItem key={index} button className="list-item">
                            <ListItemText><span className="title"># {channel}</span></ListItemText>
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

export default Channels
