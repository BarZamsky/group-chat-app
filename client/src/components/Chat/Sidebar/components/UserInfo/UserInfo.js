import React from "react"

const info = () => {
    return (
        <div className="user_info">
            <div className="name">{localStorage.getItem("displayName")}</div>
        </div>
    )
};

export default info;
