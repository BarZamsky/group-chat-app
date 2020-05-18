import React from "react";
import {array} from "prop-types";
import {ListItem, ListItemText} from "@material-ui/core";
import {PersonOutlined} from "@material-ui/icons";
import ChannelList from "./List"

const colors = ["#a8e6cf","#dcedc1","#ffd3b6", "#ffaaa5", "#ff8b94", "#005073","#107dac",
    "#1ebbd7","#71c7ec","#673888","#ef4f91","#c79dd7"];

const Members = ({members}) => {
    return (
        <ChannelList
            title="Members"
            body={members &&  members.length > 0 && members.map((user, index) => {
                const nameShort = user.displayName.split(' ')[0].substring(0,1).toUpperCase() + user.displayName.split(' ')[1].substring(0,1).toUpperCase();

                return (
                    <ListItem key={index}
                              className="members-list">
                        <ListItemText>
                            <div className="user-data">
                                <div
                                    style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}
                                    className="icon">
                                    <PersonOutlined/>
                                </div>
                                {user.displayName}
                                <div className={`online ${user.online}`}/>
                            </div>
                        </ListItemText>
                    </ListItem>
                )}
            )}/>

    )
};

Members.propTypes = {
    members: array.isRequired
};

export default Members;
