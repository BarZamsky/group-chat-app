import React from "react"
import { connect } from 'react-redux';

const messages = ({manageView}) => {
    return (
        <div className="messages-wrapper">
            messages container
        </div>
    )
};

const mapStateToProps = ({ manageView }) => ({
    manageView
});

export default connect(mapStateToProps)(messages)
