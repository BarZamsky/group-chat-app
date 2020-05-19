import React from "react"
import {array, func, arrayOf, shape} from "prop-types";
import UsersSelect from "./UsersSelect"

const addMember = ({
   users, onChange, selected, onSelect,removeFromList
}) => (
    <div className="add-users">
        <div className="title">Add Members</div>
        <div className="sub-title"># {localStorage.getItem("channel_name")}</div>
        <div className="users-drop-down">
            <UsersSelect
                users={users}
                onChange={onChange}
                selected={selected}
                removeFromList={removeFromList}/>
        </div>
        <button className="add-btn" onClick={onSelect}>Add</button>
    </div>
);

addMember.propTypes = {
    users: array.isRequired,
    onChange: func.isRequired,
    onSelect: func.isRequired,
    removeFromList: func.isRequired,
    selected: arrayOf(shape).isRequired
};

export default addMember;
