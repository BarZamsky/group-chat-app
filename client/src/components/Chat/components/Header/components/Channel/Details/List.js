import React, {Component, createRef} from "react";
import {Collapse, List, ListItem, ListItemText} from "@material-ui/core";
import {ArrowForwardIosOutlined} from "@material-ui/icons";
import {array, string} from "prop-types";

class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.ref = createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        return () => document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        const { open } = this.state;
        const contains = this.ref.current ? this.ref.current.contains(e.target) : false;
        if (!contains && open) {
            this.setState({ open: false });
        }
    };

    render() {
        const {title, body} = this.props;
        const {open} = this.state;
        return (
            <div className="details-list" ref={this.ref}>
                <ListItem
                    button
                    onClick={() => this.setState(state => ({ open: !state.open }))}
                    selected={open}>
                    <ListItemText><span className="title">{title}</span></ListItemText>
                    {open ? <ArrowForwardIosOutlined style={{transform: 'rotate(90deg)'}} /> : <ArrowForwardIosOutlined />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {body}
                    </List>
                </Collapse>
            </div>
        )
    }
}

ChannelList.propTypes = {
    title: string.isRequired,
    body: array.isRequired
};

export default ChannelList;
