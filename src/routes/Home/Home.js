/**
 * 
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import Load from '../../components/Load';
import Page from '../../components/Page';

import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "all",
            page: 1,
            limit: 10,
            dataFetchDown: false,
            topicList: [],
            lastPage: false
        }
        if (this.props.location.state && this.props.location.state.tab) {
            this.state.tab = this.props.location.state.tab;
        }
        let self = this;
        self.__fetch();
    }

    fetch(cell) {
        let self = this;

        if (Object.prototype.toString.call(cell) === "[object String]") {
            cell === "next" ? self.page++ : self.page--;
        } else if (Object.prototype.toString.call(cell) === "[object Number]") {
            self.page = cell;
        } else if (Object.prototype.toString.call(cell) === "[object Object]") {

            if (cell.tab === self.state.tab) {
                return false;
            }
            return self.setState((prevState) => {
                prevState.tab = cell.tab;
                prevState.page = 1;
                prevState.dataFetchDown = false;
            }, () => {
                self.__fetch();
            });
        }
        self.setState((prevState) => {
            prevState.dataFetchDown = false;
        }, () => {
            self.__fetch();
        });
    }
    setPage(currentPage) {
        this.setState((prevState) => {
            prevState.dataFetchDown = false;
            prevState.page = currentPage
        }, () => {
            this.__fetch();
        });
    }
    __fetch() {
        let self = this;
        return this.getList()
            .then((lastData) => {
                if (lastData.status === "success" && !!lastData.data.length) {
                    self.setState((prevState) => {
                        prevState.topicList = lastData.data;
                        prevState.dataFetchDown = true;
                        prevState.lastPage = lastData.data.length < prevState.limit ? true : false;
                    })
                } else {
                    return self.__fetch();
                }
            });
    }
    getList() {
        let self = this;

        return new Promise((resolve, reject) => {
            axios.get('https://cnodejs.org/api/v1/topics', {
                params: {
                    tab: self.state.tab,
                    page: self.state.page,
                    limit: self.state.limit
                }
            })
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
        let self = this;
        const routers = [
            { title: "全部", tab: "all" },
            { title: "精华", tab: "good" },
            { title: "分享", tab: "share" },
            { title: "问答", tab: "ask" },
            { title: "招聘", tab: "job" }
        ];

        let tabsHtml = "";

        tabsHtml = routers.map(function (cell, index) {
            const tabClassName = self.state.tab === cell.tab ? "link active" : "link";
            return (
                <li key={index}><a href="javascript:;" className={tabClassName} onClick={self.fetch.bind(self, cell)}>{cell.title}</a></li>
            )
        });

        let listHtml = "";
        const tabJson = {
            all: "全部",
            good: "精华",
            share: "分享",
            ask: "问答",
            job: "招聘"
        };

        if (this.state.topicList.length) {
            listHtml = this.state.topicList.map(function (cell, index) {
                const tabClassName = cell.good || cell.top ? "good" : "tab";
                let tabTitle = tabJson[cell.tab];
                if (cell.good) {
                    tabTitle = "精华";
                } else if (cell.top) {
                    tabTitle = "置顶";
                }
                return (
                    <li key={index}>
                        <div className="collapsible-header">
                            <Link to={{
                                pathname: '/user/' + cell.author.loginname
                            }}>
                                <i className="material-icons"><img src={cell.author.avatar_url} /></i>
                            </Link>
                            <span className={tabClassName}>{tabTitle}</span>
                            <Link to={{
                                pathname: '/topic/' + cell.id
                            }}>
                                <span className="title">{cell.title}</span>
                            </Link>
                            <span className="badge">{cell.reply_count} / {cell.visit_count}</span>
                        </div>
                    </li>
                )
            })
        }

        if (this.state.dataFetchDown) {
            return (
                <div>
                    <nav>
                        <div className="nav-wrapper">
                            <ul className="left">
                                {tabsHtml}
                            </ul>
                        </div>
                    </nav>
                    <ul className="collapsible" data-collapsible="accordion">
                        {listHtml}
                    </ul>
                    <Page pageInfo={{
                        currentPage: this.state.page,
                        limit: this.state.limit,
                        lastPage: this.state.lastPage
                    }} setPage={this.setPage.bind(this)} />
                </div>
            )
        } else {
            return (
                <Load />
            )
        }

    }
}

export default Home;