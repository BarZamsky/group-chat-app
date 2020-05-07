import React, {useState} from "react"
import {Collapse,List,ListItemIcon,ListItemText,ListItem}  from '@material-ui/core';
import {ExpandLess,ExpandMore, Add }from '@material-ui/icons';

import "./Channels.scss"

const Channels = (props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {setOpen(!open)};

    const channels = JSON.parse(localStorage.getItem("channels"));
    return (
        <div className="lists channels">
            <ListItem button onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
                <ListItemText><span className="title">Channels</span></ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {channels.map((channel, index) => (
                        <ListItem key={index} button className="list-item">
                            <ListItemText><span className="title"># {channel}</span></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <div className="add-channel"><Add className="icon"/> Add new channel</div>
        </div>
    )
};

export default Channels;
