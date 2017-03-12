

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class Reply extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        
        const replyInfo = this.props.info;
        const content = (
            <p className="body" dangerouslySetInnerHTML={{
                __html: replyInfo.content
            }}></p>
        )

        return (
            <li className="collection-item avatar">
                <i className="mdi-file-folder circle">
                    <img src={replyInfo.author.avatar_url} />
                </i>
                <div className="title">
                    <span>{replyInfo.author.loginname}</span>
                    <span> { (replyInfo.replyIndex+1)+'楼' } </span>
                </div>
                {content}
                <a href="#!" className="secondary-content"><i className="mdi-action-grade"></i></a>
            </li>
        )
    }
}

export default Reply;