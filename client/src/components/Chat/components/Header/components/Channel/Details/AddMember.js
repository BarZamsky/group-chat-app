import React from "react"
import {array} from "prop-types";
import UsersSelect from "./UsersSelect"

const addMember = ({users, onChange, value, onSelect}) => (
    <div className="add-users">
        <div className="title">Add Members</div>
        <div className="sub-title"># {localStorage.getItem("channel_name")}</div>
        <div className="users-drop-down">
            <UsersSelect users={users} onChange={onChange} value={value}/>
        </div>
        <button className="add-btn">Add</button>
    </div>
);

addMember.propTypes = {
    users: array.isRequired
};

export default addMember;
