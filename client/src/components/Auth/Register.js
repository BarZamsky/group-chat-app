import React, {Component} from "react"
import Modal from "../UI/Modal/Modal"
import RegisterPopup from "./RegisterPopup"
import server from "../../server"
import history from "../../history"

import "./Login.scss"

class Register extends Component {

    state = {
        error: false,
        username:null,
        password: null,
        displayName: null,
        showModal: false
    };

    onChangeHandler = (e) => {this.setState({[e.target.id]: e.target.value})};

    onClosePopup = () => {history.push('/login')};

    onClickRegister = (e) => {
        const {username, password, displayName} = this.state;
        const body = {username, password, displayName};
        server.post('/register', body)
            .then(res => {
                if (res.errorCode !== 0) {
                    this.setState({error: true})
                } else {
                    localStorage.setItem('displayName', res.data.displayName);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('channels', res.data.channels);
                    this.setState({showModal: true})
                }
            })
    };

    render() {
        const { showModal } = this.state;
        return (
            <>
            <div className="login_wrapper">
                <div className="box">
                    <div className="top">
                        <img src={require('../../assets/images/logo.svg')} alt="logo" className="logo"/>
                        <div className="input-item">
                            <div className="label">Display Name</div>
                            <input
                                id="displayName"
                                autoComplete="off"
                                onChange={this.onChangeHandler}/>
                        </div>
                        <div className="input-item">
                            <div className="label">Email Address</div>
                            <input
                                id="username"
                                autoComplete="off"
                                onChange={this.onChangeHandler}/>
                        </div>
                        <div className="input-item">
                            <div className="label">Password</div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="off"
                                onChange={this.onChangeHandler}/>
                        </div>
                        {this.state.error && <div className="err-label">Username already exists</div>}
                        <button
                            className="btn login"
                            onClick={this.onClickRegister}
                        >
                            Create account
                        </button>
                    </div>
                </div>
            </div>
            <Modal
            onClose={this.onClosePopup}
            showModal={showModal}
            body={<RegisterPopup/>}
            />
            </>
        )
    }
}

export default Register
