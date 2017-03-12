/**
 * 
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class ListCell extends Component {
    constructor (props) {
        super(props)
    }
    dateToLest (dateString = "") {
        const disMin = Math.floor((new Date() - new Date(dateString))/1000/60);
        let tip = "刚刚";
        if (Math.floor(disMin/60/24/365) > 0) {
            tip = Math.floor(disMin/60/24/365) + "年前";
        } else if (Math.floor(disMin/60/24/30) > 0) {
            tip = Math.floor(disMin/60/24/30) + "月前";
        } else if (Math.floor(disMin/60/24) > 0) {
            tip = Math.floor(disMin/60/24) + "天前";
        } else if (Math.floor(disMin/60) > 0) {
            tip = Math.floor(disMin/60) + "小时前";
        } else if (disMin > 1) {
            tip = disMin + "分钟前";
        }
        return tip;
    }
    render () {
        const cell = this.props.listInfo;
        const tabJson = {
            all: "全部",
            good: "精华",
            share: "分享",
            ask: "问答",
            job: "招聘"
        };
        const tabClassName =  cell.good || cell.top ? "good" : "tab";
        let tabTitle = tabJson[cell.tab];

        let countHtml = "";
        let tabHtml = "";
        if(cell.good) {
            tabTitle = "精华";
        } else if(cell.top) {
            tabTitle = "置顶";
        }
        if(cell.reply_count && cell.visit_count) {
            countHtml = (<span className="badge">{cell.reply_count} / {cell.visit_count}</span>);
        } else if(cell.last_reply_at) {
            countHtml = (<span className="badge">{this.dateToLest(cell.last_reply_at)}</span>);
        }

        if(cell.good && cell.top) {
            tabHtml = (<span className={tabClassName}>{tabTitle}</span>);
        }

        return (
            <li>
                <div className="collapsible-header">
                    <Link to={{
                        pathname: '/user/'+cell.author.loginname
                    }}>
                        <i className="material-icons"><img src={cell.author.avatar_url}/></i>
                    </Link>
                    {tabHtml}
                    <Link to={{
                        pathname: '/topic/'+cell.id
                    }} className="title">
                        <span>{cell.title}</span>
                    </Link>
                    {countHtml}
                </div>
            </li>
        )
    }
}

export default ListCell;