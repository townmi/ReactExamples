/**
 * 
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link, hashHistory } from 'react-router';
import Auth from '../../services/authToken';

import './login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            active: "",
            submitValidate: false,
            submitSwitch: false
        }
    }
    static contextTypes = {
        authStatus: React.PropTypes.bool,
        authInfo: React.PropTypes.object
    }

    checkToken(event) {
        this.setState({ token: event.target.value });

        if (!event.target.value) {
            this.active = "";
            this.submitValidate = false;
            this.setState({
                active: "",
                submitValidate: false
            });
        } else {
            if (/[^a-z0-9\-]+/g.test(event.target.value)) {
                this.setState({
                    active: "active invalid",
                    submitValidate: false
                });
            } else {
                this.setState({
                    active: "active",
                    submitValidate: true
                });
            }
        }
    }
    submit(event) {
        event.preventDefault();
        let self = this;
        if (!!this.state.submitSwitch || !this.state.submitValidate) {
            return;
        }
        this.setState({
            submitSwitch: true
        }, () => {
            axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken=' + this.state.token)
                .then(function (response) {

                    self.setState({
                        submitSwitch: false
                    });
                    if (response.data.success) {
                        const userInfo = {
                            'name': response.data.loginname,
                            'avatar': response.data.avatar_url,
                            'id': response.data.id,
                            'accesstoken': self.state.token.trim()
                        }
                        Auth.setLocalToken(userInfo);
                        // hashHistory.push("/");
                        // 后期修改下，使用修复 Nav state 的修复 
                        window.location.reload();
                    } else {
                        alert(response.data.error_msg)
                    }

                })
                .catch(function (error) {
                    self.setState({
                        submitSwitch: false
                    });
                });
        });
    }
    render() {

        return (
            <div className="login">
                <div className="row">
                    <div className="col s3">&nbsp;</div>
                    <form className="col s6" onSubmit={this.submit.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="last_name" type="text" value={this.state.token} className={this.state.active} onChange={this.checkToken.bind(this)} />
                                <label htmlFor="last_name" className={this.state.active}>Token from Cnode.org</label>
                                <button className="waves-effect waves-light btn-large" type="submit" name="action">登录
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;