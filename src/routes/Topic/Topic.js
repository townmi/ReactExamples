/**
 * 
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import Reply from '../../components/Reply';

import './topic.scss';

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicInfo: null
        }
        this.fetch();

    }
    fetch() {
        let self = this;
        axios.get('https://cnodejs.org/api/v1/topic/' + this.props.params.id, {
            params: {
                mdrender: true
            }
        })
        .then((response) => {
            self.setState({ topicInfo: response.data.data })
        })
        .catch((error) => {
        });
    }
    render() {
        let navHtml = "";
        let content = "";
        let replyHtml = ""
        const tanJson = {
            all: "全部",
            good: "精华",
            share: "分享",
            ask: "问答",
            job: "招聘"
        }
        const topicInfo = this.state.topicInfo;
        if (this.state.topicInfo) {
            navHtml = (
                <div className="nav-wrapper">
                    <Link to={{
                        pathname: '/',
                        state: { tab: topicInfo.tab }
                    }} className="breadcrumb">{tanJson[topicInfo.tab]}</Link>
                    <span className="breadcrumb">{topicInfo.title}</span>
                </div>
            )
            replyHtml = topicInfo.replies.map(function (cell, index) {
                return (<Reply key={index} info={cell} replyIndex={index}/>)
            });
            content = (
                <div className="body" dangerouslySetInnerHTML={{
                    __html: topicInfo.content
                }}></div>
            )
        }
        return (
            <div className="topic">
                <nav>
                    <div>
                        {navHtml}
                    </div>
                </nav>
                <div className="row">
                    <div className="col s12 m12">
                        {content}
                        <ul className="collection">
                            {replyHtml}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic;