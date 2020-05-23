import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import PubSub from 'pubsub-js';
import CircularProgress from '@material-ui/core/CircularProgress';
import server from "../../../../../server"
import {setDirectMessageView} from "../../../../../actions/manageView";

const ConversationPopup = ({onClose, setDirectMessageView}) => {
    const [selected, setSelected] = useState({});
    const [match, setMatch] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        server.get('/users', { headers:{'x-auth': localStorage.getItem("token")}})
            .then(response => {
                if (response.errorCode === 0)
                    setUsers(response.data)
            })
    }, []);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const val = e.target.value.toLowerCase();
        setLoading(true);
        if (val) {
            const results = users
                .filter(user => (
                    user.username.toLowerCase().startsWith(val) ||
                    user.displayName.toLowerCase().includes(val))
                );

            setMatch(results);
        } else {
            setMatch([])
        }
        setLoading(false)
    };

    const onSelectUser = (user) => {
        const data = {
            id: user._id,
            name: user.displayName
        };

        server.post('/users/message', {userId: user._id}, {
            headers:{'x-auth': localStorage.getItem("token")}
        }).then(res => {
            if (res.errorCode === 0) {
                setDirectMessageView(data);
                localStorage.setItem("name", user.displayName);
                localStorage.setItem("id", user._id);
                localStorage.setItem("type", "direct_message");
                PubSub.publish('UPDATE_DIRECT_MESSAGES');
                onClose();
            }
        });
    };

    return (
        <div className="new-message-popup">
            <div className="title">Direct Messages</div>
            <div className="sub-title">Search people by Email address or Username to start a new conversation</div>
            <input
                placeholder="Search by Email/Username"
                autoComplete="off"
                onChange={(e) => onChangeHandler(e)}/>
                <div className="search-results">
                    {loading?
                        <div className="loader"> <CircularProgress/> </div> :
                        match.length > 0 && (
                            <div className="users-list">
                                {match.map((user, index) => (
                                    <div key={index} className="user" onClick={() => onSelectUser(user)}>
                                        <div className="info">
                                            <div className="icon">
                                                <img src={require('../../../../../assets/images/user-icon.png')} alt="user"/>
                                            </div>
                                            <div className="data">
                                                <div className="name">{user.displayName}</div>
                                                <div className="email">{user.username}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) }
                </div>
        </div>
    )
};

const mapDispatchToProps = () => dispatch => ({
    setDirectMessageView: data => dispatch(setDirectMessageView(data))
});

export default connect(null, mapDispatchToProps)(ConversationPopup);
