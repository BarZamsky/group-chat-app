import React, {Component} from "react"
import EmojiPicker from "./components/EmojiPicker"

import "./Keyboard.scss"

class Keyboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    onSelectEmoji = (e) => {
        console.log('here')
        const {message} = this.state;
        const newMessage = message + e.native;
        this.setState({message: newMessage})
    };

    render() {
        const {message} = this.state;
        return (
            <>
                <div className="keyboard-wrapper">
                    <input
                        type="text"
                        placeholder="Message Bar"
                        value={message}
                        className="text-area"
                        onChange={(e) => this.setState({message: e.target.value})}/>
                    <div className="keyboard-options">
                        <div className="text-options">
                        </div>
                        <div className="extra-options">
                            <EmojiPicker
                                onSelectEmoji={this.onSelectEmoji}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default Keyboard
