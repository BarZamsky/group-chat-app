import React, {Component} from "react";
import PubSub from 'pubsub-js';
import {array} from "prop-types";
import {ListItem, ListItemText} from "@material-ui/core";
import {PersonOutlined} from "@material-ui/icons";
import Modal from "../../../../../../UI/Modal/Modal"
import AddMember from "./AddMember"
import ChannelList from "./List";
import server from "../../../../../../../server";

const colors = ["#a8e6cf","#dcedc1","#ffd3b6", "#ffaaa5", "#ff8b94", "#005073","#107dac",
    "#1ebbd7","#71c7ec","#673888","#ef4f91","#c79dd7"];

class Members extends Component {

    state = {
        showModal:false,
        users:[],
        selected:[]
    };

    componentWillMount(){
        this.pubsub_event = PubSub.subscribe('UPDATE_MEMBERS_TOTAL', () => {
            this.fetchUsers();
        });
    }

    componentDidMount() {this.fetchUsers()}

    componentWillUnmount() { PubSub.unsubscribe(this.pubsub_event); }

    fetchUsers = () => {
        server.get(`/users`, { headers:{'x-auth': localStorage.getItem("token")}})
            .then(res => {
                if (res.errorCode !== 0) {
                    console.log('error')
                } else {
                    const {data: users} = res;
                    this.setState({users})
                }
            });
    };

    onChange = (e, user) => {
        e.preventDefault();
        const {selected} = this.state;
        const {members} = this.props;
        const exists = selected.filter(u => u._id === user._id).length > 0;
        const isMember = members.filter(m => m._id === user._id).length > 0;
        if (!exists && !isMember) {
            let users = selected;
            users.push(user);
            this.setState({selected: users})
        }
    };

    removeFromList = (e, user) => {
        e.preventDefault();
        const {selected} = this.state;
        const filter = selected.filter(u => u._id !== user._id);
        this.setState({selected: filter})
    };

    onSelect = () => {
        const {selected} = this.state;
        const channelUsers = selected.map(s => s._id);
        const body = {
            users: channelUsers,
            channelName: localStorage.getItem("channel_name")
        };

        server.post('/channels/add', body, {
            headers:{'x-auth': localStorage.getItem("token")}
        }).then(res => {
            this.setState({
                showModal: false,
                selected: []
            }, () => {
                PubSub.publish('UPDATE_MEMBERS_TOTAL');
                PubSub.publish('UPDATE_MEMBERS_LIST');
            });
        })
    };

    render(){
        const {showModal, users, selected} = this.state;
        const {members} = this.props;

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
            <button
                key="button"
                className="add-member"
                onClick={() => this.setState({showModal: true})}
            >
                Add Member
            </button>
        );

        return (
            <>
                <ChannelList
                    title="Members"
                    body={body}/>
                {showModal &&
                <Modal
                    body={<AddMember
                        members={members}
                        users={users}
                        onChange={this.onChange}
                        selected={selected}
                        onSelect={this.onSelect}
                        removeFromList={this.removeFromList}
                    />}
                    onClose={() => {this.setState(state => ({showModal:false, selected: []}))}}
                    showModal={showModal}/>}
            </>
        )
    }
}

Members.propTypes = {
    members: array.isRequired
};

export default Members;
