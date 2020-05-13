import React, {useEffect, useState} from "react"
import Switch from '@material-ui/core/Switch';
import server from "../../../../../server"
import {withStyles} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

const PurpleSwitch = withStyles({
    switchBase: {
        color: purple[300],
        '&$checked': {
            color: purple[500],
        },
        '&$checked + $track': {
            backgroundColor: purple[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

/*TODO:
   1. get all users
   2. multi dropdown
   3. create channel
   4. close popup
   5. call socket and update channels list
* */
const AddNewChannel = ({onClose}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [privateChannel, setPrivateChannel] = useState(false);

    const createChannel = () => {
        const body = {
            name,
            description,
            topic,
            private: privateChannel
        };

        server.post('/channels', body,{
            headers:{'x-auth': localStorage.getItem("token")}
        }).then(res => {
            if (res.errorCode !== 0) {
                console.log('error')
            } else {
                onClose()
            }
        })
    };

    return (
        <div className="add-new-channel">
            <div className="title">Create a channel</div>
            <div className="label">Channels are conversations you have with your teammates.
                Each channel is dedicated to a specific topic or project.</div>
            <div className="inputs">
                <div className="input-item">
                    <div className="label">Name</div>
                    <input
                        placeholder="e.g rnd-department"
                        autoComplete="off"
                        onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="input-item">
                    <div className="label">Description (optional)</div>
                    <input
                        autoComplete="off"
                        onChange={(e) => {setDescription(e.target.value)}}/>
                </div>
                <div className="input-item">
                    <div className="label">Topic (optional)</div>
                    <input
                        autoComplete="off"
                        onChange={(e) => {setTopic(e.target.value)}}/>
                </div>
            </div>
            <div className="private-channel">
                <div className="label">Make private</div>
                <div className="switch">
                    <div className="text">
                        When channel is private, members can join only by requests and it can only be viewed by other users.
                    </div>
                    <PurpleSwitch
                        checked={privateChannel}
                        onChange={() => setPrivateChannel(!privateChannel)}
                        name="makePrivate" />
                </div>
            </div>
            <div className="footer">
                <div></div>
                <button
                    disabled={name.length<2}
                    className={`create-btn disabled-${name.length < 2}`}
                    onClick={createChannel}> Create
                </button>
            </div>
        </div>
    )
};

export default AddNewChannel

