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

    handleClickOutside = (e) => {
        const { open } = this.state;
        const contains = this.ref.current ? this.ref.current.contains(e.target) : false;
        if (!contains && open) {
            this.setState({ open: false });
        }
    };

    render () {
        const {open} = this.state;

        return (
            <div ref={this.ref}>
                <img
                    src={require('../../../../../assets/images/emoji_icon.png')}
                    alt="emoji"
                    className="icon"
                    onClick={() => this.setState(state => ({ open: !state.open }))}/>
                {open && <Picker
                            set='apple'
                            title="Pick your emoji…"
                            color="#800080"
                            style={{ position: 'absolute', bottom: '50px', right: '10px', userSelect:'none' }}
                            onClick={emoji => this.props.onSelectEmoji(emoji.native)} />}
            </div>
        )
    }
}

export default EmojiPicker;
