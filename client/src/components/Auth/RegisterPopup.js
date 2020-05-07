import React from "react"

const popup = () => (
    <div className="account-created">
        <img src={require('../../assets/images/logo.svg')} className="logo" alt="logo"/>
        <div className="label">
            Your account was successfully created!
        </div>
        <div className="label">
            Redirecting to Login page...
        </div>
    </div>
);

export default popup;
