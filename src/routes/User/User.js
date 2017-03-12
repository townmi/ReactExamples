/**
 * 
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import ListCell from '../../components/ListCell';

import './user.scss';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
        let self = this;
        this.getUserMember()
        .then((response) => {
            self.setState({ userInfo: response.data });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    getUserMember() {
        let self = this;
        return new Promise((resolve, reject) => {
            axios.get('https://cnodejs.org/api/v1/user/' + self.props.params.username)
            .then((response) => {
                resolve({
                    status: "success",
                    data: response.data.data
                });
            })
            .catch((error) => {
                resolve({
                    status: "fail",
                    data: error
                });
            });
        });
    }
    render() {
        let replyHtml = "";
        let topicHtml = "";
        let avatorHtml = "";
        let githubUrl = "";
        const userInfo = this.state.userInfo;
        if(this.state.userInfo) {
            const replies = userInfo.recent_replies;
            const topics = userInfo.recent_topics;
            replyHtml = replies && replies.map(function (cell, index) {
                return (
                    <ListCell key={index} listInfo={cell} />
                )
            });
            topicHtml = topics && topics.map(function (cell, index) {
                return (
                    <ListCell key={index} listInfo={cell} />
                )
            })
            avatorHtml = (
                <img src={userInfo.avatar_url}/>
            )
            githubUrl = "https://github.com/"+userInfo.githubUsername;
        }
        return (
            <div className="member">
                <br/>
                <div className="row">
                    <div className="col s10 m9">
                        <ul className="collapsible" data-collapsible="accordion">
                            <li className="block_title">
                                <div className="collapsible-header">
                                    最近创建的话题
                                </div>
                            </li>
                            {replyHtml}
                            <li className="more">
                                <div className="collapsible-header">
                                    <a>查看更多 &nbsp;<em className="fa fa-angle-right" aria-hidden="true"></em></a>
                                </div>
                            </li>
                        </ul>
                        <br/>
                        <ul className="collapsible" data-collapsible="accordion">
                            <li className="block_title">
                                <div className="collapsible-header">
                                    最近创建的话题
                                </div>
                            </li>
                            {topicHtml}
                            <li className="more">
                                <div className="collapsible-header">
                                    <a>查看更多 &nbsp;<em className="fa fa-angle-right" aria-hidden="true"></em></a>
                                </div>
                            </li>
                        </ul>
                        <br/>
                    </div>

                    <div className="col s2 m3">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">名片</span>
                                <p className="body">
                                    {avatorHtml}
                                </p>
                            </div>
                            <div className="card-action">
                                <a href={githubUrl}>
                                    <i className="fa fa-github" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;