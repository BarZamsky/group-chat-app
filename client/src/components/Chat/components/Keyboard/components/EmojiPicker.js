import React, {Component, createRef} from "react"
import {Picker} from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'

class EmojiPicker extends Component {
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

    handleClickOutside = (e) => {this.setState({ open: false });};

    selectIcon = () => {
        console.log('bar')
    };

    render () {
        const {open} = this.state;
        const {onSelectEmoji} = this.props;

        return (
            <div ref={this.ref}>
                <img
                    src={require('../../../../../assets/images/emoji_icon.png')}
                    alt="emoji"
                    className="icon"
                    onClick={() => this.setState(state => ({ open: !state.open }))}/>
                {open && <Picker
                            ref={this.ref}
                            set='apple'
                            title="Pick your emoji…"
                            style={{ position: 'absolute', bottom: '50px', right: '10px', userSelect:'none' }}
                            onClick={(e) => onSelectEmoji(e)}/> }
            </div>
        )
    }
}

export default EmojiPicker;
