import React, {useState} from "react"
import "./DirectMessages.scss"
import {Collapse, List, ListItem, ListItemText} from "@material-ui/core";
import {Add, ExpandLess, ExpandMore} from "@material-ui/icons";

const DirectMessages = (props) =>  {
    const [open, setOpen] = useState(false);
    const handleClick = () => {setOpen(!open)};

    return (
        <div className="lists direct-messages">
            <ListItem button onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
                <ListItemText><span className="title">Direct Messages</span></ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/*{channels.map((channel, index) => (*/}
                    {/*    <ListItem key={index} button className="list-item">*/}
                    {/*        <ListItemText><span className="title"># {channel}</span></ListItemText>*/}
                    {/*    </ListItem>*/}
                    {/*))}*/}
                </List>
            </Collapse>
        </div>
    )
};

export default DirectMessages
