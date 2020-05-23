import React, {Component} from "react"
import "./DirectMessages.scss"
import {Collapse, List, ListItem, ListItemText} from "@material-ui/core";
import {Add, ExpandLess, ExpandMore} from "@material-ui/icons";
import StartConversation from "./StartConversation";
import Modal from "../../../../UI/Modal/Modal"
import server from "../../../../../server";

class DirectMessages extends Component {

    state = {
        open: false,
        showPopup: false,
        messages: []
    };

    componentDidMount() {this.fetchMessages()}

    fetchMessages() {
        server.get('/messages/direct', {
            headers:{'x-auth': localStorage.getItem("token")}
        }).then(res => {
            if (res.errorCode === 0) {
                this.setState({messages: res.data});
            }
        })
    };

    render() {
        const {open, showPopup, messages} = this.state;

        return (
            <>
            <div className="lists direct-messages">
                <ListItem button onClick={() => this.setState({open: !this.state.open})}>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                    <ListItemText><span className="title">Direct Messages</span></ListItemText>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {messages.map((message, index) => (
                            <ListItem key={index} button className="list-item">
                                    <div className={`online ${message.online}`}/>
                                    <span className="title">{message.displayName}</span>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <div
                    className="start-message"
                    onClick={() => {
                        this.setState({showPopup: true})
                    }}
                >
                    <Add className="icon"/>Start a conversation
                </div>
            </div>
            {showPopup &&
            <Modal
                onClose={() => this.setState({showPopup: false})}
                showModal={showPopup}
                body={
                    <StartConversation
                        onClose={() => this.setState({showPopup: false})}/>
                }
            />}
        </>
        )
    }
}

export default DirectMessages
