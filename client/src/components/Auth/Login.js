import React, {Component} from "react"
import server from "../../server"
import history from "../../history"

import "./Login.scss"

class Login extends Component{

    state = {
        error: false,
        username:null,
        password: null
    };

    onChangeHandler = e => {this.setState({[e.target.id]: e.target.value})};

    onClickLogin = e => {
        const {username, password} = this.state;
        const body = {username, password};
        server.post('/login', body)
            .then(res => {
                if (res.errorCode !== 0) {
                    this.setState({error: true})
                } else {
                    console.log(res)
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('displayName', res.data.displayName);
                    localStorage.setItem('token', res.data.tokens[res.data.tokens.length -1].token);
                    history.push('/chat')
                }
            }).catch(err => {
                console.log(err)
        })
    };

    onClickCreate = (e) => {
        history.push('/register')
    }

    render() {
        return (
            <div className="login_wrapper">
                <div className="box">
                        <div className="top">
                            <img src={require('../../assets/images/logo.svg')} alt="logo" className="logo"/>
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
                            {this.state.error && <div className="err-label">Wrong credentials, try again</div>}
                            <button
                                className="btn login"
                                onClick={this.onClickLogin}
                            >
                                Log in
                            </button>
                        </div>
                        <div className="register">
                            <div className="label"><span>Don't have an account yet ? </span></div>
                            <button
                                className="btn sign-up"
                                onClick={this.onClickCreate}
                            >
                                Create your account
                            </button>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Login
