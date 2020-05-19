import React, {useState, useEffect} from "react";
import {array} from "prop-types";
import {ListItem, ListItemText} from "@material-ui/core";
import {PersonOutlined} from "@material-ui/icons";
import ChannelList from "./List"
import Modal from "../../../../../../UI/Modal/Modal"
import AddMember from "./AddMember"
import server from "../../../../../../../server";

const colors = ["#a8e6cf","#dcedc1","#ffd3b6", "#ffaaa5", "#ff8b94", "#005073","#107dac",
    "#1ebbd7","#71c7ec","#673888","#ef4f91","#c79dd7"];

const Members = ({members}) => {
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersToAdd, setUsersToAdd] = useState([]);

    useEffect(() => {
        server.get(`/users`, { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: users} = res;
                    setUsers(users);
                }
            });
    }, []);

    const onChange = (e) => {
        let users = usersToAdd;
        users.push(Array.from(e.target.selectedOptions, (item) => item.value));
        setUsersToAdd(users);
    };

    const body = members &&  members.length > 0 && members.map((user, index) => {
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
        )});

    body.push(
        <button className="add-member" onClick={() => setShowModal(true)}>Add Member</button>
    );

    return (
        <>
        <ChannelList
            title="Members"
            body={body}/>
            {showModal && <Modal
                            body={<AddMember users={users} onChange={onChange} value={usersToAdd}/>}
                            onClose={() => setShowModal(!showModal)}
                            showModal={showModal}/>}
        </>
    )
};

Members.propTypes = {
    members: array.isRequired
};

export default Members;
